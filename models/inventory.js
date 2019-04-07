module.exports = function (sequelize, DataTypes) {
    var Inventory = sequelize.define("Inventory", {
        item_name: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },  
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        sku_number: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        category: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        price: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        quanity: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        size: {
            type: DataTypes.TEXT,
            allowNull: true
        }
        
    });

    Inventory.associate = function (models) {
        models.Inventory.belongsTo(models.Employee, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        })
    };

    return Inventory;
};