//k6 run /Users/ericlee/HackReactor/Reviews-Backend/server/load_k6/k6_local.js
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  discardResponseBodies: true,
  httpDebug: 'full',
  stages: [
    {duration: '1s', target: 1100},
    {duration: '28s', target: 1100},
    {duration: '1s', target: 1100}
  ]
};

export default function () {
  // getReviews()
  // getMeta()
  // putHelpful()
  // putReport()
  postReview()
}
//API endpoints
const getReviews = () => {
  const new_id = Math.floor((Math.random() * 110000) + 900000);
  let res = http.get(`http://localhost:3000/reviews?product_id=${new_id}`, {
    tags: {name: 'GetReviewsID'},
  });
  check(res, {
    'status was 200, Revs': (r) => {
      return r.status == 200
    }

  });
  sleep(1)
};
const getMeta = () => {
  const new_id = Math.floor((Math.random() * 110000) + 900000);
  let res = http.get(`http://localhost:3000/reviews?product_id=${new_id}`, {
    tags: {name: 'getMetaID'},
  });
  check(res, {
    'status was 200, Meta': (r) => r.status == 200
  });
  sleep(1)
};
const putHelpful = () => {
  const new_id = Math.floor((Math.random() * 110000) + 5674952);
  let res = http.put(`http://localhost:3000/reviews/${new_id}/helpful`, {
    tags: {name: 'putHelpful'},
  });
  check(res, {
    'status was 202, Helpful': (r) => r.status == 202
  });
  sleep(1)
};
const putReport = () => {
  const new_id = Math.floor((Math.random() * 110000) + 5674952);
  let res = http.put(`http://localhost:3000/reviews/${new_id}/report`, {
    tags: {name: 'putReport'},
  });
  check(res, {
    'status was 202, Report': (r) => r.status == 202
  });
  sleep(1)
};
const postReview = () => {

  const new_id = Math.floor((Math.random() * 110000) + 900000);
  let body = {
    product_id: new_id,
    rating: 5,
    date: Date.now(),
    summary: 'this is a test string for the sake of k6 testing via staging of the test. Will type until a bit over 50 characters',
    body: 'Bob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builderBob the builder',
    recommend: 'true',
    reviewer_name: 'bob',
    reviewer_email: 'bob@gmail.com'

  }
  let res = http.post(`http://localhost:3000/reviews?product_id=${new_id}`, body, {
    tags: {name: 'postReview'}
  })
  check(res, {
      'status was 201, Post': (r) => r.status == 201
  });
  sleep(1)
}