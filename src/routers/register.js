const User = require('../models/user')
const bcrypt = require("bcryptjs");

const registerUser = async(req,res)=>{
  console.log(req.body)
    const  { username, email, password, confirmPassword } = req.body;
    const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
        (err) => {
          console.log("Error: ", err);
        }
      );
      if (alreadyExistsUser) {
        return res.status(400).json({ message: "User with email already exists!" });
      }
      if(password!==confirmPassword){
        return res.status(400).json({message:'Password does not match'});
      }

      const hashPassword = await bcrypt.hash(password,8);
      const newUser = new User({ username, email, password:hashPassword });
      const savedUser = await newUser.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Cannot register user at the moment!" });
      });
    
      if (savedUser) res.json({ message: "Thanks for registering" });
}


module.exports = registerUser;