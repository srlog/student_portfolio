// models/Log.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("./Student"); // assumes you have this
const Admin = require("./Admin"); // make sure this model exists or create it
const Achievement = require("./Achievement"); // assuming you have this

const Log = sequelize.define(
  "Log",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    approved_by: {
      type: DataTypes.ENUM("placement", "department"),
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM(
        "certificate",
        "online_course",
        "project",
        "internship",
        "paper_presentation",
        "hackathon"
      ),
      allowNull: true,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "admins", // table name (or Admin if you’ve imported it)
        key: "id",
      },
      onDelete: "SET NULL",
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "students", // same as your Student table
        key: "id",
      },
      onDelete: "CASCADE",
    },
    achievement_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "achievements", // assuming you have this table
        key: "id",
      },
      onDelete: "CASCADE",
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "logs",
    timestamps: false,
  }
);

// ✅ Define Associations

// A log belongs to a student
Log.belongsTo(Student, {
  foreignKey: "student_id",
  as: "student",
});

// A log might belong to an admin (placement cell or dept coordinator)
Log.belongsTo(Admin, {
  foreignKey: "admin_id",
  as: "admin",
});
Achievement.hasMany(Log, {
  foreignKey: "achievement_id",
  as: "logs",
});

Log.belongsTo(Achievement, {
  foreignKey: "achievement_id",
  as: "achievement",
});

Student.hasMany(Log, { foreignKey: "student_id" });
Admin.hasMany(Log, { foreignKey: "admin_id" });

module.exports = Log;
