const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect Database
connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.json({ msg: "Hi" }));

//Define Routes

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
