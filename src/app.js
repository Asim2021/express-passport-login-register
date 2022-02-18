const express = require('express');
const path = require('path')
const morgan = require('morgan');
const cors = require('cors');
const middlewares = require("./middlewares");
const userRouter = require("./routers");
const cookieParser = require('cookie-parser')

require("./auth/passport");
require("./models/user")

const port = process.env.PORT || 5000;
const app = express();

//// INITIATING MIDDLESWARES ////
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan(":method - :url - :status - :response-time ms"))
app.use(cors())
app.use(cookieParser());
// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);
app.use(express.static(path.join(__dirname,'..','public')))

// USING ROUTER
app.use("/api/v1", userRouter);

// Routing
app.get("/",(req,res)=>{
  res.send(`<h2 style="background:red">WELCOME TO SERVER</h2>`)
})
app.get("/logout", (req, res) => {
  res.sendFile(path.join(__dirname,'..','public','logout.html'))
  });
app.get("/api/v1/login", (req, res) => {
  res.sendFile(path.join(__dirname,'..','public','login.html'))
  });
// CREATING SERVER
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});