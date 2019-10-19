var mysql = require('mysql');
var casual = require('casual');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'ikea_reviews'
});

connection.connect();

var rando = function(start, stop) {
  return start  + Math.round(Math.random() * (stop - start));
};

var productIdListMaker = function (qty) {
  var list = [];
  for (var i = 0; i < qty; i ++) {
    list.push(rando(100,999).toString() + "." +rando(100,999).toString() + "." + rando(10,99).toString(),)
  }
  return list;
};

var productIdList = productIdListMaker(100);

var isRecommended = function() {
  var test = rando(0,2);
  if (test === 2) {
    return null
  } else {
    return test;
  }
};

var ReviewRecordMaker = function() {
  var obj = {};
  obj.product_id = "922.603.34";
  obj.title = casual.title;
  obj.text = casual.sentences(rando(2,5));
  obj.date = new Date(new Date() - rando(0,70000000000)).toISOString().slice(0,10);
  obj.author =	casual.first_name;
  obj.overall_rating =	rando(1,5);
  obj.value_rating =	rando(1,5);
  obj.quality_rating =	rando(1,5);
  obj.appearance_rating =	rando(1,5);
  obj.ease_of_assembly_rating = 	rando(1,5);
  obj.works_as_expected_rating =	rando(1,5);
  obj.recommended = isRecommended();
  obj.helpful_count = rando(0,77);
  obj.not_helpful_count = rando(0,77);
  return obj;
};

var ProductRecordMaker = function() {
  //add in productID when iterating thru database insertion
  var obj = {};
  obj.description = casual.sentences(rando(5-8));
  obj.product_name = casual.words(3);
  obj.designer = casual.full_name;
  obj.height = rando(25,42);
  obj.length = rando(60,92);
  obj.width = rando(25,42);
  obj.weight = rando(100,200);
  obj. environment =	casual.sentences(rando(4-7));
  obj.materials =	casual.sentences(rando(4-7));
  return obj;
};

var insertProductSeeds = function (idList, recordMaker) {
  for (var i = 0; i < idList.length; i++) {
    var randomizedRecord = recordMaker();
    randomizedRecord.id = idList[i];
    connection.query('INSERT INTO product_data SET ?', randomizedRecord, (error, results, fields) => {
      if (error) {console.error(error);}
      console.log(results);
    })
  }
}

var insertReviewSeeds = function (idList, recordMaker, count) {
  for (var i = 0; i < count; i++) {
    var randomizedRecord = recordMaker();
    connection.query('INSERT INTO reviews SET ?', randomizedRecord, (error, results, fields) => {
      if (error) {
        console.error(error);
      }
      console.log(results)
    })
  }

};

var seedReviews = () => {insertReviewSeeds(productIdList, ReviewRecordMaker, 70)};
var seedProducts = () => {insertProductSeeds(productIdList, ProductRecordMaker)};
var seedAccordion = () => {
  seedReviews();
  seedProducts();
}

module.exports.seedReviews = seedReviews();