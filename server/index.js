const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const db = require('../database/index.js')
const port = 3003;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api-reviews', (req, res) => {
  console.log("received request: ", req.body);
  db.getReviewsByProductId(req.body, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.end(JSON.stringify(results));
    }
  })
});

app.get('/api-product-data', (req, res) => {
  db.getProductDataById(req.body, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.end(JSON.stringify(results));
    }
  })
})

app.listen(port, () => {
  console.log(`Review server listening on port $(port), ${new Date()}`);
});