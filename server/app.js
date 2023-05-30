require('dotenv').config();
const app = require('./index');

const PORT = process.env.EXPRESS_PORT || 3000;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);