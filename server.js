require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
// const product = require("./model/productModel");
// const user = require("./model/usersModel");
const productRoute= require('./route/productRoute');
const userRoute= require('./route/userRoute');
const cors = require('cors')
const errorMiddleware = require('./middleware/errorMiddleware');
const MONGO_URL=process.env.MONGO_URL
const PORT_NUMBER=process.env.PORT_NUMBER||3000
const app = express();

// middleware goes here.
app.use(express.json());
app.use(errorMiddleware);
app.use(cors());
app.use(express.urlencoded({extended:false}))
// route
app.use('/api/v1',productRoute,userRoute);
// app.use('/api/v1',userRoute);
app.get("/", (req, res) => {
  res.send("hello world chaxo");
});

//   Db connect
mongoose
  .connect(
    // "mongodb+srv://charlesuwaje:12345uwaje@node-rest-shop.pv2f9dv.mongodb.net/Product-API?retryWrites=true&w=majority&appName=node-rest-shop"
    MONGO_URL
  )
  .then(() => {
    console.log("connected to database");
    app.listen(PORT_NUMBER, () => {
      console.log(`server running on port ${PORT_NUMBER}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
