module.exports = (sequelize, type) => {
    var IncomeStream = sequelize.define('incomestream', {
        amount: type.BIGINT,
        name: type.STRING,
        frequency: type.INTEGER
    },{
      timestamps: false,
      underscored: true
    });
    return IncomeStream;
};
