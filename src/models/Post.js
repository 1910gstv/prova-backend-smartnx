const { DataTypes, Model } = require("sequelize");

// const Post = sequelize.define(
//   "Post",
//   {
//     id: {
//       type: DataTypes.STRING,
//       primaryKey: true,
//       allowNull: false,
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     text: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     user_id: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     create_time: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "posts",
//     timestamps: false,
//   }
// );

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.hasMany(models.Comment, {
        foreignKey: "post_id",
        as: 'comments'
      });
    }
  }
  Post.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      title: DataTypes.STRING,
      text: DataTypes.STRING,
      user_id: DataTypes.STRING,
      create_time: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
      timestamps: false,
    }
  );
  return Post;
};
