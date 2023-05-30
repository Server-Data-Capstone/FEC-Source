-- /Users/ericlee/Downloads/characteristics.csv
-- TO START psql AND DB
-- psql sdcreviews
-- TO COPY OFF SCHEMA
-- psql -d testdb -a -f ./schema.sql
-- \i /Users/ericlee/HackReactor/Reviews-Backend/server/database/schema.sql;

DROP DATABASE IF EXISTS sdcreviews;
CREATE DATABASE sdcreviews;

\c sdcreviews;


DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INT,
  rating SMALLINT CHECK (rating > 0 AND rating < 6),
  date BIGINT,
  summary TEXT,
  body TEXT,
  recommend BOOLEAN,
  reported BOOLEAN DEFAULT false,
  reviewer_name TEXT,
  reviewer_email TEXT,
  response TEXT DEFAULT '',
  helpfulness INT DEFAULT 0
);


DROP TABLE IF EXISTS characteristics CASCADE;

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INT,
  name TEXT
);


DROP TABLE IF EXISTS characteristics_reviews CASCADE;

CREATE TABLE characteristics_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id INT REFERENCES characteristics(id) NOT NULL,
  review_id INT REFERENCES reviews(id) NOT NULL,
  value SMALLINT CHECK (value > 0 AND value < 6)
);


DROP TABLE IF EXISTS reviews_photos CASCADE;

CREATE TABLE reviews_photos (
  id SERIAL PRIMARY KEY,
  review_id INT REFERENCES reviews(id) NOT NULL,
  url TEXT
);

COPY reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
FROM '/Users/ericlee/HackReactor/Reviews-Backend/server/ETL/csv/reviews.csv'
DELIMITER ','
CSV HEADER;

COPY characteristics(id, product_id, name)
FROM '/Users/ericlee/HackReactor/Reviews-Backend/server/ETL/csv/characteristics.csv'
DELIMITER ','
CSV HEADER;

COPY characteristics_reviews(id, characteristic_id, review_id, value)
FROM '/Users/ericlee/HackReactor/Reviews-Backend/server/ETL/csv/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

COPY reviews_photos(id, review_id, url)
FROM '/Users/ericlee/HackReactor/Reviews-Backend/server/ETL/csv/reviews_photos.csv'
DELIMITER ','
CSV HEADER;


-- MAYBE OUT OF SYNC FIXES

SELECT setval(pg_get_serial_sequence('reviews', 'id'), MAX(id)) FROM reviews;
SELECT setval(pg_get_serial_sequence('characteristics', 'id'), MAX(id)) FROM characteristics;
SELECT setval(pg_get_serial_sequence('characteristics_reviews', 'id'), MAX(id)) FROM characteristics_reviews;
SELECT setval(pg_get_serial_sequence('reviews_photos', 'id'), MAX(id)) FROM reviews_photos;


-- SELECT pg_catalog.setval(pg_get_serial_sequence('reviews', 'id'), (SELECT MAX(id) FROM reviews)+1);
-- SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('"reviews"', 'id')), (SELECT (MAX("id") + 1) FROM "reviews"), FALSE);


-- SELECT NEXTVAL(PG_GET_SERIAL_SEQUENCE('"reviews"', 'id'));
-- SELECT CURRVAL(PG_GET_SERIAL_SEQUENCE('"reviews"', 'id')) AS "Current Value", MAX("id") AS "Max Value" FROM "reviews";


-- composite index
CREATE INDEX review_comp_index ON reviews (product_id, rating, recommend);
CREATE INDEX char_comp_index ON characteristics (product_id, name);
CREATE INDEX char_rev_comp_index ON characteristics_reviews (characteristic_id, value);
CREATE INDEX reviews_photos_comp_index ON reviews_photos (review_id);