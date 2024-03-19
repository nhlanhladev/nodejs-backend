const express = require("express");
const port = 5000;
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.listen(port, (req, res) => {
  console.log(" server listening on port", port);
});

mongoose
  .connect(
    "mongodb+srv://themba:themba@taskdb.rpbllym.mongodb.net/TaskDB?retryWrites=true&w=majority&appName=TaskDB"
  )
  .then(() => console.log("Connected!"));
