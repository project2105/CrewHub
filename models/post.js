module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        text: DataTypes.STRING
    });

    Post.associate = function (models) {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    // Post.associate = function (models) {
    //     Post.hasMany(models.Message, {
    //         onDelete: "cascade"
    //     });
    // };

    return Post;
};

//