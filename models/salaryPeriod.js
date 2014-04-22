module.exports = function(sequelize, DataTypes) {
  var SalaryPeriod = sequelize.define('SalaryPeriod', {
    salary: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        SalaryPeriod.belongsTo(models.Employee, {foreignKey: 'id'});
      }
    }
  });
  return SalaryPeriod;
};
