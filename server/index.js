const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('../database/index.js');

const port = 3003;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'), {});
});

app.get('/api-reviews/:productid', (req, res) => {
  db.getReviewsByProductId(req.params.productid, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.status(200);
      res.end(JSON.stringify(results));
    }
  });
});

// create
app.post('/api-reviews', (req, res) => {
  const obj = {};
  obj.product_id = req.body.product_id;
  obj.title = req.body.title;
  obj.text = req.body.text;
  obj.date = new Date(new Date() - 0).toISOString().slice(0, 10);
  obj.author = req.body.author;
  obj.overall_rating = req.body.overall_rating;
  obj.value_rating = req.body.value_rating;
  obj.quality_rating = req.body.quality_rating;
  obj.appearance_rating = req.body.appearance_rating;
  obj.ease_of_assembly_rating = req.body.ease_of_assembly_rating;
  obj.works_as_expected_rating = req.body.works_as_expected_rating;
  obj.recommended = req.body.recommended;
  obj.helpful_count = req.body.helpful_count;
  obj.not_helpful_count = req.body.not_helpful_count;

  db.postReviewsByProductId(obj, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.status(200);
      res.end(JSON.stringify(results));
    }
  });
});
app.delete('/api-reviews/:id', (req, res) => {
  db.deleteReviewsById(req.params.id, (err, results) => {
    if (err) {
      throw err;
    }
    res.writeHead(200);
    res.end(JSON.stringify(results));
  });
});
app.get('*.js', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
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

// update
app.put('/api-increment', (req, res) => {
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
