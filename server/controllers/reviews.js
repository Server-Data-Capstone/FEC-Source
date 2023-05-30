const axios = require('axios');
const dbGetReviews = require('../database/query/dbGetReviews')
const dbGetMeta = require('../database/query/dbGetMeta')
const dbMarkHelpful = require('../database/query/dbMarkHelpful')
const dbMarkReported = require('../database/query/dbMarkReported')
const dbPostReview = require('../database/query/dbGetReviews')

module.exports = {
  getReviews: (req, res) => {
    const product_id = req.query.product_id;
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    const sort = req.query.sort || 'relevant'

    dbGetReviews({product_id, page, count, sort})
      .then((data) => {
        res.status(200).send(data)
      })
      .catch((err) => {
        console.log(`ERROR CONTROLLERS GETREVIEWS`, err)
        res.sendStatus(500)
      })
  },
  getMeta: (req, res) => {
    dbGetMeta(req.query.product_id)
      .then((data) => {
        res.status(200).send(data)
      })
      .catch((err) => {
        console.log('ERROR CONTROLLERS GETMETA', err)
        res.sendStatus(500)
      })
  },
  putHelpful: (req, res) => {
    dbMarkHelpful(req.params.review_id)
      .then((data) => {
        res.status(202).send(data)
      })
      .catch((err) => {
        console.log('ERROR CONTROLLERS PUTHELPFUL', err)
        res.sendStatus(500)
      })
  },
  putReport: (req, res) => {
    dbMarkReported(req.params.review_id)
      .then((data) => {
        res.status(202).send(data)
      })
      .catch((err) => {
        console.log('ERROR CONTROLLERS PUTREPORT', err)
        res.sendStatus(500)
      })
  },
  postReview: (req, res) => {
    const revData = {product_id: req.body.product_id, ...req.body}
    dbPostReview(revData)
      .then((data) => {
        res.status(201).send('Posted')
      })
      .catch((err) => {
        console.log('ERROR CONTROLLERS POST', err)
        res.sendStatus(500)
      })
  }
}