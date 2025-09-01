// const { DataTypes, Model } = require("sequelize");

// // const User = sequelize.define(
// //   "User",
// //   {
// //     id: {
// //       type: DataTypes.STRING,
// //       primaryKey: true,
// //       allowNull: false,
// //     },
// //     name: {
// //       type: DataTypes.STRING,
// //       allowNull: false,
// //     },
// //     username: {
// //       type: DataTypes.STRING,
// //       allowNull: false,
// //     },
// //     password: {
// //       type: DataTypes.STRING,
// //       allowNull: false,
// //     },
// //   },
// //   {
// //     tableName: "users",
// //     timestamps: false,
// //   }
// // );

// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     static associate(models) {}
//   }
//   User.init(
//     {
//       id: {
//         type: DataTypes.STRING,
//         primaryKey: true,
//         allowNull: false,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     },
//     {
//       sequelize,
//       modelName: "User",
//       tableName: "users",
//       timestamps: false,
//     }
//   );
//   return User;
// };

const { mongoose } = require("../config/mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
  },
  { collection: "users", timestamps: false }
);

module.exports = mongoose.model("User", UserSchema);
