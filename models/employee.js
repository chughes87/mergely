module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define('Employee', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Employee.hasMany(models.SalaryHistory);
      }
    }
  });
  return Employee;
};