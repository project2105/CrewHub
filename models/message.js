module.exports = function (sequelize, DataTypes) {
    var Message = sequelize.define("Message", {
        text: DataTypes.STRING,
        recipientId: DataTypes.INTEGER
    });

    // Message.associate = function (models) {
    //     Message.belongsTo(models.User, {

    //     });
    // };

    // Message.associate = function (models) {
    //     Message.belongsTo(models.Post, {
    //     });
    // };

    return Message;
};