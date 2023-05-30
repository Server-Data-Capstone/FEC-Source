const pool = require('../index.js');

module.exports = (review_id) => {
  const query = {
    text: `UPDATE reviews
    SET helpfulness = helpfulness + 1
    WHERE review_id=$1`,
    values: [review_id]
  };

  return pool.connect()
    .then((client) => {
      return client.query(query)
        .then((response) => {
          client.release()
          console.log('SUCCESS HELPFUL')
          return response.rows
        })
        .catch((err) => {
          client.release()
          console.log('Mark Helpful error', err)
          return err
        })
    })
}