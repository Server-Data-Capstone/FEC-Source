import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Product from './productDetails/Product';
import QAModule from './qa/QAModule';
import RelatedProductsList from './related-products/related/RelatedProductsList';
import ClosetList from './related-products/outfit/ClosetList';
import RatingsAndReviews from './ratings-and-reviews/RatingsAndReviews';
import StarTemplate from './shared/StarTemplate';

// note: if App parent re-renders child components will render too
export default function App() {
  const [product, setProduct] = useState({id: 1});
  const [metaData, setMetaData] = useState(null);

  // useEffect(() => {
  //   axios.get('/products/1')
  //     .then(({ data }) => {
  //       console.log('data shape', data)
  //       setProduct(data);
  //       return data;
  //     })
  //     .catch((err) => console.error('There was a problem retrieving product data: ', err));
  // }, []);

  useEffect(() => {
    if (product) {
      axios.get('/reviews/meta', {
        params: {
          product_id: 1,
        },
      })
        .then(({ data }) => setMetaData(data))
        .catch((err) => console.error('There was a problem retrieving product metadata', err));
    }
  }, [product]);

  const updateProduct = (newProd) => setProduct(newProd);

  return (
    <div id="App">
      <div className="topnav">
        <div className="compName">Moda</div>
      </div>
      <StarTemplate />
      {/* <Product product={product} setProduct={setProduct} metaData={metaData} /> */}
      {/* <RelatedProductsList product={product} updateProduct={updateProduct} /> */}
      {/* <ClosetList product={product} /> */}
      {/* <QAModule product={product} /> */}
      <RatingsAndReviews product={product} metaData={metaData} />
    </div>
  );
}
