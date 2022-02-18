
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


///// LOGIN LOGIC ///////
const loginUser = async (req, res) => {

  const { email, password } = req.body;
  const userWithEmail = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );
  if (!userWithEmail) {
    return res
      .status(400)
      .json({ message: "No Such user with this email is found!" });
  }
  let comparePass = await bcrypt.compare(password,userWithEmail.password)
  if ( !comparePass) {
    return res.status(400).json({ message: "Password does not match!" });
  }
  const  jwtToken = jwt.sign(
    { id: userWithEmail.id, email: userWithEmail.email },
    "m@shd%h&wqer9823jkbe23ybh",{expiresIn:"1d"}
  );
  const cookieOptions = {
    expires:new Date(Date.now()+ 1*24*60*60*1000), 
    httpOnly:true,
  }
  res.cookie('jwt',jwtToken,cookieOptions);
  res.status(200).json({ message:"Welcome Back!",token:jwtToken });
};

// THE SERVER WILL CRASH IF YOU ARE ALREADY LOGGED IN AND AGAIN TRY TO LOGIN 

////// LOGOUT LOGIC /////
const logoutUser = async(req,res)=>{
    res.cookie('jwt','logout',{ 
        expires : new Date(Date.now()+ 200),
        httpOnly : true
      })
      return res.status(200)
}

module.exports = {loginUser,logoutUser};
