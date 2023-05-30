const pool = require('../index.js');

module.exports = (review_id) => {
  const query = {
    text: `UPDATE reviews
    SET reported = true
    WHERE id=$1`,
    values: [review_id]
  };

  return pool.connect()
    .then((client) => {
      return client.query(query)
        .then((response) => {
          client.release()
          console.log('SUCCESS REPORT')
          return response.rows
        })
        .catch((err) => {
          client.release()
          console.log('Mark Reported error', err)
          return err
        })
    })
}