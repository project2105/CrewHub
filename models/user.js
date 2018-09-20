module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.TEXT
  });
  return User;
};