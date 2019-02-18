const express = require('express');
const {Pool, Client} = require('pg');

const app = express()
var cors = require('cors')

//var corsOptions = {
//  origin: "http://localhost:3000",
//  optionSuccessStatus: 200
//}

const pool = new Pool({
  user: "alexander",
  host: "127.0.0.1",
  database: "alexander",
  port: "5432"
})

app.set('json spaces', 4);

getPlaygroundItems = function(query){
    return new Promise(function(resolve, reject){
      pool.query(query, (err, res) => {
        if(err){
          throw err;
        }else{
          console.log(res.rows)
          resolve(res.rows);
        }
    })
  })
}

//app.get('/', (req, res) => {
//  res.send('HEY!')
//})
app.use(express.static('public'))

app.get('/budget', cors(), (req, res) => {
  //Get the information out of the database and send it to the front end
  console.log(req)
    incomeStreams = [
      {
        "key": 1,
        "name": "Paycheck",
        "amount": 2000,
        "frequency": 2,
      },
      {
        "key": 2,
        "name": "Consulting",
        "amount": 500,
        "frequency": 1,
      },
      {
        "key": 3,
        "name": "Investments",
        "amount": 1000,
        "frequency": 1,
      }
    ]
    expenses = [
      {
        "key": 1,
        "name": "Mortgage",
        "amount": 1300,
        
      },
      {
        "key": 2,
        "name": "Internet",
        "amount": 60,
        
      },
      {
        "key": 3,
        "name": "Phone",
        "amount": 60,
        
      },
      {
        "key": 4,
        "name": "Liquor",
        "amount": 200,
        
      },
      {
        "key": 5,
        "name": "Petrol",
        "amount": 200, 
      }
    ]
  
  res.send({incomeStreams, expenses})
})


app.get('/who/:name', (req, res) => {
  res.send('Hello '+ req.params.name)
})


app.get('/playground', (req, res) => {
  var query = 'SELECT * from playground;'

  getPlaygroundItems(query).then(function(results){
    res.send({data: results})
  }).catch(function(err){
    console.log(err)
    res.send("Didn't find anything");
  })
  
})

app.listen(3000, () => console.log('Server running on port 5000'))
