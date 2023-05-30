const pool = require('../index');

module.exports = (review) => {
  const { product_id, rating, summary, body, recommend, email, photos, characteristics } = review
  const reviewer_name = review.name
  const values = [product_id, rating, summary, body, recommend, reviewer_name, email]

  //TODO add to photos as well
  let query = {
    text: `WITH newRev as (
      INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email)
      VALUES($1, $2, EXTRACT(EPOCH FROM now())*1000, $3, $4, $5, $6, $7)
      RETURNING id
    ) SELECT newRev.id FROM newRev`,
    values: values
  }

  return pool
    .connect()
    .then(client => {
      return client
        .query(query)
        .then(async (response) => {
          await photos.forEach((photo) => {
            query = {
              text: `INSERT INTO newRev(review_id, url)
              VALUES($1, $2)`,
              values: [response.rows[0].id, photo]
            }
            client.query(query)
          });
          client.release()
          console.log('POST SUCCESS')
          return response.rows
        })
        .catch((err) => {
          client.release()
          console.log('Post Reviews error', err)
          return err
        })
    })
}