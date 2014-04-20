module.exports = function(sequelize, DataTypes) {
  var SalaryPeriod = sequelize.define('SalaryPeriod', {
    id: DataTypes.INTEGER,
    salary: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        SalaryPeriod.belongsTo(models.Employee);
      }
    }
  });
  return SalaryPeriod;
};
