//Initialize the Databse and any models you want to include

const Sequelize = require('sequelize');
const UserModel = require('./Models/User')
const ExpenseModel = require('./Models/Expense')
const IncomeStreamModel = require('./Models/IncomeStream')
const BudgetModel = require('./Models/Budget')

const sequelize = new Sequelize('postgres://alexander@127.0.0.1:5432/alexander');

//Define all models required for use on the database

//User is the person that this budget will be for
const User = UserModel(sequelize, Sequelize)

//List of income streams that are applicable to this specific budget
const IncomeStream = IncomeStreamModel(sequelize, Sequelize)

//List of expenses that are applicable to this budget
const Expense = ExpenseModel(sequelize, Sequelize)

//Budget table. One budget will have income streams and expenses for that particular user
const Budget = BudgetModel(sequelize,Sequelize)



//Each budget can have many expenses and many income streams
Budget.hasMany(IncomeStream, {as: 'incomestream'});
Budget.hasMany(Expense, {as: 'expense'});
Expense.belongsTo(Budget);
IncomeStream.belongsTo(Budget);



//Drop the table if it already exists
sequelize.sync({ force: true})
  .then(() => {
      console.log("Database & Table created !")
  })

  module.exports = {
      User,
      IncomeStream,
      Expense,
      Budget
  }
