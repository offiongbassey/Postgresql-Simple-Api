const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require('dotenv').config({path: path.resolve(__dirname, './.env')});
const db = require('./models');
const tutorialRouter = require("./routes/tutorialRoute");
const errorHandler = require("./middleware/errorHandler");
const Property = require("./models/tutorialPropertyModel");
const Tutorial = require("./models/tutorials.model");


const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));

app.use("/api/", tutorialRouter);

app.get('/', (req, res) => {
    res.json({message: "Backend Successfully Connected"});
});

//error handler
app.use(errorHandler);

db.sequelize.sync()
.then(() => {
    console.log("DB Synced");
})
.catch((err) => {
    console.log(`Failed to sync DB ${err.message}`);
})
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
