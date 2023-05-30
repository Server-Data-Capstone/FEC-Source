require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const router = require('./routes/reviews.js');
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/reviews', router);


//FROM FEC
app.use(express.static(path.join(__dirname, '../client/dist')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server available at http://localhost:${PORT}`);
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT);
// console.log(`Server listening at http://localhost:${PORT}`);


// function readAndParse() {
//   let counter = 0;
//   const readStream = fs.createReadStream('ETL_Test/reviews.csv', 'utf-8');
//   let rl = readline.createInterface({input: readStream})
//   rl.on('line', (line) => {
//       const id = line.split(',')[0];
//       const product_id = line.split(',')[1];
//       const rating = line.split(',')[2];
//       const date = line.split(',')[3];
//       const summary = line.split(',')[4];
//       const body = line.split(',')[5];
//       const recommend = line.split(',')[6];
//       const reported = line.split(',')[7];
//       const reviewer_name = line.split(',')[8];
//       const reviewer_email = line.split(',')[9];
//       const response = line.split(',')[10];
//       const helpfullness = line.split(',')[11];

//       if (rating >= 1 && product_id >= 0) {
//           counter++
//       }
//   });
//   rl.on('error', (error) => console.log(error.message));
//   rl.on('close', () => {
//       console.log(`About ${counter} areas have geographic units of over 200 units in 2020`)
//       console.log('Data parsing completed');
//   })
// }
// readAndParse();
// const format = (data) => {
//   return ({
//     id: data[0],
//     product_id: data[1],
//     rating: data[2],
//     date: data[3],
//     summary: data[4],
//     body: data[5],
//     recommend: data[6],
//     reported: data[7],
//     reviewer_name: data[8],
//     reviewer_email: data[9],
//     response: data[10],
//     helpfulness: data[11]
//   });
// }

// function outputParsedData() {
//   const readStream = fs.createReadStream('ETL_Test/reviews.csv')
//   const writeStream = fs.createWriteStream('ETL_Test/reviews_output.csv')

//   readStream.pipe(writeStream);
//   writeStream.on('finish', () => console.log('Copying completed'))
//   console.log('read', writeStream)
// }
// outputParsedData();

//ignore  , between " "
// /,(?=(?:(?:[^"]*"){2})*[^"]*$)/



// reader = fs.createReadStream('ETL_Test/reviews.csv');

// reader.on('data', function (chunk) {
//   let jsondata = chunk.toJSON()

//     console.log('test', JSON.parse(jsondata.data));
// });


// var fs = require('fs');
// var path = require('path');


// var filePath = path.join(__dirname, 'ETL_Test/reviews.csv');
// // Read CSV
// var f = fs.readFileSync(filePath, {encoding: 'utf-8'},
//     function(err){console.log(`initial error ${err}`);});
// // console.log('DATA', f)
// // Split on row
// f = f.split("\n");

// // Get first row for column headers
// headers = f.shift().split(",");
// console.log(headers)

// var json = [];
// f.forEach(function(d){
//     // Loop through each row
//     tmp = {}
//     row = d.split(",")
//     for(var i = 0; i < headers.length; i++){
//         tmp[headers[i]] = row[i];
//     }
//     // Add object to list
//     json.push(tmp);
// });

// let jsonData = JSON.stringify(json)
// console.log(jsonData)



// var outPath = path.join(__dirname, 'ETL_Test/reviews_output.csv');
// // console.log('this is', json)
// // Convert object to string, write json to file
// fs.writeFileSync(outPath, JSON.stringify(json), 'utf8',
//     function(err){console.log(`last ${err}`);
// })
