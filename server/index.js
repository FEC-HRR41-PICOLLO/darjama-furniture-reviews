const Express = require('express');
let app = express();
const bodyParser = require('body-parser');
const db = require('../database/index.js')

app.use(bodyParser.json());
app.use(express.static(public));

app.get('/api-reviews', (req, res) => {
  db.getReviewsByProductId(req.body, (err, results) => {
    if (err) {
      console.log err;
    } else {
      res.end(results);
    }
  })
})

app.get('/api-product-data', (req, res) => {
  db.getProductDataById(req.body, (err, results) => {
    if (err) {
      console.log err;
    } else {
      res.end(results);
    }
  })
})

app.listen(3003, function(){
  console.log(`Review server listening on port $(port), ${new Date()}`);
})