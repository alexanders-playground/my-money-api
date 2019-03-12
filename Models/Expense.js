module.exports = (sequelize, type) => {
    return sequelize.define('expense', {
        amount: type.BIGINT,
        name: type.STRING
    },{
      timestamps: false,
      underscored: true
    });
}
