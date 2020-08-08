const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const fs = require('fs') 
const csv = require('csv-parser');
const readXlsxFile = require('read-excel-file')
app.use(bodyParser.urlencoded({ extended: false }))

const modelReview = require('./Model/model').schema
const review = []

var text = fs.readFileSync('food_dictionary.txt',(err,data)=>{
  if(err) throw console.error();
})

fs.createReadStream('./Review_Dataset/test_file.csv')
.pipe(csv(['reviewID','review']))
.on('data',(row) => review.push(row))
.on('end',()=>{
  console.log(review[0])
})




// var text = fs.readFile('food_dictionary.txt',(err,data)=>{
//   if(err) throw console.error();
// })
// var textByLine = text.toString().split("\n").sort()
var textByLine = text.toString()
// console.log(textByLine[1])

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.get('/', (req, res) => {
  res.send('Welcome to API Testing!')
})


app.get('/reviews/:id', (req, res) => {
  var id = req.param('id')
  res.send('get/reviews/:id')
  console.log(id)
})
  app.get('/reviews', async (req, res) => {
  var query = req.query['query'].toString()
  console.log(query)
  var result = textByLine.search(query)
  console.log(result);
  res.sendStatus(200)
  //res.send(result)
})
app.put('/reviews/:id', (req, res) => {
  res.send('put/reviews/:id')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
