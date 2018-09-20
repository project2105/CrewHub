module.exports = function (sequelize, DataTypes) {
    var Message = sequelize.define("Message", {
        text: DataTypes.STRING,
        recipientId: DataTypes.INTEGER
    });

    Message.associate = function (models) {
        Message.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    Message.associate = function (models) {
        Message.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Message;
};