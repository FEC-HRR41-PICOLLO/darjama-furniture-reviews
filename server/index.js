const Express = require('express');
let app = express();
const bodyParser = require('body-parser');
const db = require('../database/index.js')

app.use(bodyParser.json());
app.use(express.static());

app.listen(3003, function(){
  console.log(`Review server listening on port $(port), ${new Date()}`);
})