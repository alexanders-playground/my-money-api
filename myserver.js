const express = require('express');
const {Pool, Client} = require('pg');
const bodyParser = require('body-parser');

var app = require('./app')
var port = process.env.PORT || 5000;
var cors = require('cors')
app.use(bodyParser.json())
app.set('json spaces', 4);



const { Budget, IncomeStream, Expense } = require('./db');


//var corsOptions = {
 // origin: "http://localhost:3000",
 // optionSuccessStatus: 200
//}

var BudgetController = require('./Controllers/Budget');




//app.get('/', (req, res) => {
//  res.send('HEY!')
//})

app.use(express.static('public'));
app.use('/', BudgetController);

/*
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
})*/

app.get('/who/:name', (req, res) => {
  res.send('Hello '+ req.params.name)
})

app.get('/myBudgets', (req, res) => {
  Budget.findAll({ include : [{all: true}] }).then(function(budget){
    console.log(JSON.stringify((budget), null, "  "));
  });

})

app.post('/addBudget', (req, res) => {
  Budget.create( {
    'name': 'my_budget'
  }).then(function(budget){
      IncomeStream.create({
        'amount': 2000,
        'name': 'salary',
        'frequency': 1
      }).then(function(incomestream){
        budget.setIncomestream(incomestream);
        Expense.create({
          'amount': 200,
          'name': 'petrol',
          'frequency': 1
      }).then(function(expense){
        budget.setExpense(expense);
      });
    });
  }).catch(function(error){
    console.log(error);
    res.send("Error: " + error)
  });
  res.send("Successfully added your budget !")
});

var server = app.listen(port, function(){
  console.log('Express server listening on port '+ port);
});
