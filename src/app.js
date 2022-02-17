const express = require('express');
const path = require('path')
const morgan = require('morgan');
const cors = require('cors');
const middlewares = require("./middlewares");
const {userRouter,userRegister} = require("./routers");

require("./auth/passport");
require("./models/user")

const port = process.env.PORT || 5000;
const app = express();

//// INITIATING MIDDLESWARES ////
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan(":method - :url - :status - :response-time ms"))
app.use(cors())
// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);
app.use(express.static(path.join(__dirname,'..','public')))

// USING ROUTER
app.use("/api/v1", userRouter);
app.use("/api/v1", userRegister);

// Routing
app.get("/test",(req,res)=>{
  res.send(`<h2 style="background:red">WELCOME TO SERVER</h2>`)
})
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname,'..','public','login.html'))
  });
// CREATING SERVER
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});