const express = require("express");
const cors = require("cors");      // ✅ CORS require
const db = require("./app/models");

const app = express();

// Enable CORS for all origins
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connect
db.mongoose
  .connect("mongodb://mongo:27017/mydb", {   // ✅ Correct URL for docker-compose
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to the database!"))
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Test application." });
});

require("./app/routes/turorial.routes")(app);

// Server Port
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
