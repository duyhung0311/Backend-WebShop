
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const categoriesRoutes=require('./routes/categoriesRoute');
const productRoutes=require('./routes/productRoute');
const userRoutes = require('./routes/userRoute');
const HttpError = require("./error-handle/http-error");

require("dotenv/config");
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(
    "/upload/imagesProduct",
    express.static(path.join("upload", "imagesProduct"))
);
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
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
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
module.exports = app;
