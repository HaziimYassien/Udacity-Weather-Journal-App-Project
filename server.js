//installing express
const express = require("express");
//installing body-parser
const bodyParser = require("body-parser");
//installing cors
const cors = require("cors");
//initializing express
const app = express();
//initializing cors
app.use(cors());

app.use(express.static("website"));
//saving the data that will be sent to an empty variable
projectData = {};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//starting the port
const port = 3000;
//starting the server
app.listen(port, () => {
  console.log(`server is runinng on port ${port}`);
});
app.get("/", (req, res) => {
  res.send("testing");
});
//sedning the data to the server
app.get("/getData", (req, res) => {
  res.send(projectData);
});
//this function will get the weather data from app.js file and save it to weatherData var in server.js
app.post("/saveData", (req, res) => {
  projectData = { ...req.body };
  res.end();
});
