const express = require('express');
const {Pool, Client} = require('pg');
const bodyParser = require('body-parser');

var app = require('./app')
var port = process.env.PORT || 5000;
var cors = require('cors')
app.use(bodyParser.json())
app.set('json spaces', 4);



const { Budget, IncomeStream, Expense } = require('./db');


/*var corsOptions = {
  origin: "http://localhost:3000",
  optionSuccessStatus: 200
}*/

var BudgetController = require('./Controllers/Budget');


app.use(express.static('public'));
app.use('/budget', BudgetController);

app.get('/who/:name', (req, res) => {
  res.send('Hello '+ req.params.name)
})



var server = app.listen(port, function(){
  console.log('Express server listening on port '+ port);
});
