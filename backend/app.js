const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./config/db");

const studentRoutes = require("./routes/student.routes");
const adminRoutes = require("./routes/admin.routes");
const masterRoutes = require("./routes/master.routes");
const achievementRoutes = require("./routes/achievement.routes");

const { Student, Admin, Master, Achievement, Log } = require("./models");
async function syncDb() {
  try {
    await sequelize.sync({ alter: true }); // Use { alter: true } to keep data
    console.log("All tables were dropped and re-synced successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}
require("dotenv").config();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Server is running!!");
});
app.use("/api/auth/student", studentRoutes);
app.use("/api/auth/admin", adminRoutes);
app.use("/api/auth/master", masterRoutes);
app.use("/api/achievement", achievementRoutes);


// Commented so that, no re-init occurs for database while reload
// console.log('Syncing database...')
// syncDb().then(() => {
//   app.listen(process.env.PORT, () => {
//     console.log(
//       `Server is running on port ${process.env.PORT} at http://localhost:${process.env.PORT}`
//     );
//   });
// });

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} at http://localhost:${process.env.PORT}`
  );
});
