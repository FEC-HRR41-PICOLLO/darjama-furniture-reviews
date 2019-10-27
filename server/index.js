const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('../database/index.js');
const compression = require('compression');

const port = 3003;

app.use(compression());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'), {});
});

app.get('/api-reviews', (req, res) => {
  // console.log("received request: ", req.query);
  db.getReviewsByProductId(req.query, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.status(200);
      res.end(JSON.stringify(results));
    }
  });
});

app.get('/api-product-data', (req, res) => {
  db.getProductDataById(req.query, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.status(200);
      res.end(JSON.stringify(results));
    }
  });
});

app.post('/api-increment', (req, res) => {
  // console.log(req.body);
  db.incrementReviewCounts(req.body, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.status(200);
      res.end(JSON.stringify(results));
    }
  });
});


app.listen(port, () => {
  console.log(`Review server listening on port ${port}, ${new Date()}`);
});

module.exports.app = app;
