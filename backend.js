const express = require('express')
const app = express()
const port = 5555
const bodyParser = require('body-parser')
const fs = require('fs') 
const csv = require('csv-parser');
const readXlsxFile = require('read-excel-file')
const cors= require('cors')
const path = require('path');
const modelReview = require('./Model/model').schema
const reviews = []

//#region read data
var text = fs.readFileSync('./Review_Dataset/food_dictionary.txt',(err,data)=>{
  if(err) throw console.error();
})

fs.createReadStream('./Review_Dataset/test_file.csv')
.pipe(csv(['reviewID','review']))
.on('data',(row) => reviews.push(row))
.on('end',()=>{

})

var textByLine = text.toString()
//#endregion
//#region set config
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(express.static(path.join(__dirname, "public")));
//#endregion

app.get('/', (req, res) => {
  res.render("index")
})


app.get('/reviews/:id', (req, res) => {
  var id = req.param('id')
  console.log(id)
  var flag = false;
  for(var i = 0; i < reviews.length; i++)
  {
    if(reviews[i].reviewID == id)
    {
      res.json(reviews[i])
      res.end()
    }
    if(i==reviews.length-1){
      flag = true;
    }
  }
  if(flag==true){
    res.send("Not Found!")
    res.end()
  }
 


})
  app.get('/reviews', async (req, res) => {
  var query = req.query['query'].toString()
  console.log(query)
  var flag = false
  var result = []
  for(var i = 0; i < reviews.length; i++)
  {
    var text = reviews[i].review.toString()

    if(text.search(query)!=-1)
    {
      result.push(reviews[i])
    }
    if(i==reviews.length-1){
      flag = true;
    }
  }
  if(flag==true){
    if(result==[]){
      res.send("There isn't review!")
      res.end()
    }
    res.send(result)
    res.end()
  }
  //res.send(result)
})
app.put('/reviews/:id', (req, res) => {
  var id = req.param('id')
  var content = req.body
  console.log(content.text)
  for(var i = 0; i < reviews.length; i++)
  {
    if(reviews[i].reviewID == id)
    {
      reviews[i].review = content.text
      res.sendStatus(200)
    }

  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
