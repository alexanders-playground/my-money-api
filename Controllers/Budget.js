var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cors = require('cors')
const Sequelize = require('sequelize');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//const Budget = require('../Models/Budget');
//const IncomeStream = require('../Models/IncomeStream');
//const Expense = require('../Models/Expense');
const { Budget, IncomeStream, Expense } = require('../db');

var corsOptions = {
  origin: "http://localhost:3000",
  optionSuccessStatus: 200
}

//On POST user creates his/her budget with Income Streams and expenses
//Method bulk adds incomestreams and then maps each of the to the budget item
//saying that this budget has all these income streams associated. This is the
//same for expenses
router.post('/add', cors(), function (req, res){
  Budget.create( {
    'name': req.body.name
  }).then(function(budget){
      IncomeStream.bulkCreate(
        req.body.incomestream
      , {returning: true}).then(function(incomestream){
        incomestream.forEach(stream => {
          budget.setIncomestream(stream);
        });
        Expense.bulkCreate(
          req.body.expense
        , {returning: true}).then(function(expense){
        expense.forEach(cost =>{
           budget.setExpense(cost);
        });
      });
    });
  }).catch(function(error){
    console.log(error);
    res.send("Error: " + error)
  });
  res.send("Successfully added your budget !")
});

//GET method that returns the users budget consisting off all the
//Incomestreams and expenses.
router.get('/list', cors(), function (req, res){
  Budget.findAll({ include : [{all: true}] }).then(function(budget){
    console.log(JSON.stringify((budget[0]), null, "  "));
    res.send(JSON.stringify((budget[0]), null, "  "));
  });
});


module.exports = router;
