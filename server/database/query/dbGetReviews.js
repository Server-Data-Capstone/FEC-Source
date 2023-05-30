const pool = require('../index.js');
module.exports = ({product_id, page, count, sort}) => {

  let loader = (count * page - count);
  let sortOrder = '';

  if(sort === 'newest') {sortOrder = 'date DESC'}
  if(sort === 'helpful') {sortOrder = 'helpfulness DESC'}
  if(sort === 'relevant') {sortOrder = 'helpfulness DESC, date DESC'}

  const query = {
    text: `SELECT id AS review_id, rating, summary, recommend, response, body, TO_TIMESTAMP(date/1000) AS date, reviewer_name, helpfulness,
    (SELECT COALESCE(json_agg(to_json(photo_rows)), '[]')
        FROM (SELECT rp.id, rp.url
              FROM reviews r
              INNER JOIN reviews_photos rp
              ON r.id = rp.review_id
              WHERE rp.review_id = reviews.id
            ) photo_rows
    ) AS photos
    FROM reviews
    WHERE product_id=$1 AND reported=false
    ORDER BY ${sortOrder}
    LIMIT $2
    OFFSET $3`,
    values: [product_id, count, loader]
  };

  return pool.connect()
    .then((client) => {
      return client.query(query)
        .then((response) => {
          client.release()
          return response.rows
          // return {
          //   product: product_id,
          //   page: loader,
          //   count: Number(count),
          //   results: response.rows
          //   }
        })
        .catch((err) => {
          client.release()
          console.log('Get Reviews error', err)
          return err
        })
    })

}

