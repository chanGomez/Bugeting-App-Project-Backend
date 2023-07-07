const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const transactionsControllers = require("./controllers/transactionsControllers");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/transactions", transactionsControllers );

app.use("/*", (req, res) =>{
    res.send("Page Not Found")
})

module.exports = app;