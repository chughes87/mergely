module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define('Employee', {
    id: DataTypes.INTEGER,
    birthdate: DataTypes.DATE,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    sex: DataTypes.STRING,
    startDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        Employee.hasMany(models.SalaryPeriod);
      }
    }
  });
  return Employee;
};