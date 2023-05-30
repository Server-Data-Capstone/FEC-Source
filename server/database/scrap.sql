-- get reviews
explain analyze SELECT id AS review_id, rating, summary, recommend, response, body, TO_TIMESTAMP(date/1000) AS date, reviewer_name, helpfulness,
    (SELECT COALESCE(json_agg(to_json(photo_rows)), '[]')
        FROM (SELECT rp.id, rp.url
              FROM reviews r
              INNER JOIN reviews_photos rp
              ON r.id = rp.review_id
              WHERE rp.review_id = reviews.id
            ) photo_rows
    ) AS photos
    FROM reviews
    WHERE product_id=989988 AND reported=false
    ORDER BY helpfulness DESC
    LIMIT 5
    OFFSET 20;

-- getmeta
explain analyze SELECT id, rating, recommend FROM reviews
    WHERE product_id=883499;

explain analyze SELECT id, name FROM characteristics
    WHERE product_id=883499;

explain analyze SELECT AVG(value) FROM characteristics_reviews
      WHERE characteristic_id=898999;

--mark helpful
explain analyze UPDATE reviews
    SET helpfulness = helpfulness + 1
    WHERE id=4990000;

-- mark report
explain analyze UPDATE reviews
    SET reported = true
    WHERE id=4090900;

--post review
explain analyze WITH newRev as (
      INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email)
      VALUES(987654, 4, EXTRACT(EPOCH FROM now())*1000, 'dhfldkfjhasldfkjashdfl', 'asdhfldjfh akdjfh lkdjf lkadjs fhlkdsj flajkdfhalsdkjfh alsdkfjhsd lajksdfh laskjdfh ldskjfh alsdkfjas ldkjfh l', 'true', 'boby', 'boboy@gmail.com')
      RETURNING id
    ) SELECT newRev.id FROM newRev;