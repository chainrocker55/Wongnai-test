const express = require('express');
const app = express();
const Review = express.Router();

Review.route('/').get((req,res)=>{

})

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Views', 'index.html'));
//   })
  
  
//   app.get('/reviews/:id', (req, res) => {
//     var id = req.param('id')
//     res.send('get/reviews/:id')
//     console.log(id)
//   })
//     app.get('/reviews', async (req, res) => {
//     var query = req.query['query'].toString()
//     console.log(query)
//     var result = textByLine.search(query)
//     console.log(result);
//     res.sendStatus(200)
//     //res.send(result)
//   })
//   app.put('/reviews/:id', (req, res) => {
//     res.send('put/reviews/:id')
//   })