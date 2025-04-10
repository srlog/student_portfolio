const Student = require("./Student");
const Admin = require("./Admin");
const Master = require("./Master");
const Achievement = require("./Achievement");
const Log = require("./Log");

Achievement.belongsTo(Student, {
  foreignKey: "student_id",
  onDelete: "CASCADE",
  as: "achievementStudent", // 👈 Add alias to avoid conflict
});

Student.hasMany(Achievement, {
  foreignKey: "student_id",
  onDelete: "CASCADE",
  as: "studentAchievements", // 👈 Add matching alias
});

// ✅ Define Associations

Log.belongsTo(Student, {
  foreignKey: "student_id",
  as: "logStudent", // 👈 Unique alias
});

Student.hasMany(Log, {
  foreignKey: "student_id",
  as: "studentLogs", // 👈 Matching alias
});

Log.belongsTo(Admin, {
  foreignKey: "admin_id",
  as: "logAdmin", // ✅ Changed alias
});

Admin.hasMany(Log, {
  foreignKey: "admin_id",
  as: "adminLogs", // ✅ Matching and unique alias
});

Achievement.hasMany(Log, {
  foreignKey: "achievement_id",
  as: "logs",
});

Log.belongsTo(Achievement, {
  foreignKey: "achievement_id",
  as: "achievement",
});

module.exports = {
  Student,
  Admin,
  Master,
  Achievement,
  Log,
};

