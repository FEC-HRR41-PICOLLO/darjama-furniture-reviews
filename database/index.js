var mysql = require('mysql');
var casual = require('casual');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'ikea_reviews'
});

connection.connect();

var getProductDataById = function(req, callback) {
  connection.query("SELECT * FROM product_data WHERE id = ?", req.product_id, (error, results, fields) => {
    if (error) {
      return error;
    }
    callback(null, results);
  })
}

var getReviewsByProductId = function(req, callback) {
  connection.query("SELECT * FROM reviews WHERE product_id = ?", req.product_id, (error, results, fields) => {
    if (error) {
      console.log(error);
    }
    console.log('mysql results: ', results);
    callback(null, results);
  })
}

module.exports.getProductDataById = getProductDataById;
module.exports.getReviewsByProductId = getReviewsByProductId;