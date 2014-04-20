module.exports = function(sequelize, DataTypes) {
  var SalaryHistory = sequelize.define('SalaryHistory', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        SalaryHistory.belongsTo(models.Employee);
      }
    }
  });
  return SalaryHistory;
};
