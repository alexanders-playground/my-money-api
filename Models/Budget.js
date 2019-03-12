module.exports = (sequelize, type) => {
    return sequelize.define('budget', {
        name: type.STRING
        },{
          timestamps: false,
          underscored: true
        });
}
