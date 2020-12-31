
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const categoriesRoutes=require('./routes/categoriesRoute');
require("dotenv/config");
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

    next();
});
app.use('/api/categories', categoriesRoutes);

app.use((req, res, next) => {
    const error = new   Error("Could not find this route.", 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: "Con me m" || "An unknown error occurred!" });
});

mongoose
    .connect(
        process.env.DB_CONNECTION,
        { useNewUrlParser: true },
        { useUnifiedTopology: true },
        { useCreateIndex: true },
        { useFindAndModify: false }
    )
    .then(() => {
        app.listen(3000);
        console.log("Connect Success");
    })
    .catch((error) => {
        console.log(error);
    });
