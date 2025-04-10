const express = require("express");
const cors = require("cors");
const app = express();


const db = require("./models"); // this imports models and associations

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully.");
    // Start your server here, e.g., app.listen(PORT, ...);
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });


require("dotenv").config();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
    res.send("Server is running!!");
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http:localhost:${process.env.PORT}`);
});