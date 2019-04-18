module.exports = function(sequelize, DataTypes) {
    var Employee = sequelize.define("Employee", {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hire_date: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pay_rate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dob: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postition: {
        type: DataTypes.STRING,
        allowNull: false
      },
      store_number: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }, {
      classMethods: {
        associate: function(models) {
          Employee.hasMany(models.Inventory);
        }
      }
    });
    return Employee;
  };

