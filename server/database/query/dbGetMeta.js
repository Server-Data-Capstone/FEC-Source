const pool = require('../index.js');

module.exports = async(product_id) => {

  queryReviews = {
    text: `SELECT id, rating, recommend FROM reviews
    WHERE product_id=$1`,
    values: [product_id]
  }

  queryCharacteristics = {
    text: `SELECT id, name FROM characteristics
    WHERE product_id=$1`,
    values: [product_id]
  }

  const client = await pool.connect()

  let r = await client.query(queryReviews)
  r = r.rows
  let c = await client.query(queryCharacteristics)
  c = c.rows

  const ratings = {};
  const recommended = { 0: 0, 1: 0 };
  const characteristics = {};

//ratings and rec loop
  for (let i = 0; i < r.length; i++) {

    ratings[r[i].rating] = ratings[r[i].rating] + 1 || 1;

    if (r[i].recommend) {
      recommended['1'] += 1
    } else {
      recommended['0'] += 1
    }
  };
//characteristics loop
  for (let i = 0; i < c.length; i++) {
    let char_id = c[i].id;
    let char_name = c[i].name;

    queryCharacteristicsReviews = {
      text: `SELECT AVG(value) FROM characteristics_reviews
      WHERE characteristic_id=$1`,
      values: [char_id]
    };
    let average = await client.query(queryCharacteristicsReviews);

    if (average.rows[0].avg !== null) {
      average = average.rows[0].avg.slice(0, 6);
      characteristics[char_name] = { id: char_id, value: average };
    } else {
      characteristics[char_name] = { id: char_id, value: null };
    }
  };

  client.release();
  return { product_id, ratings, recommended, characteristics }
}

