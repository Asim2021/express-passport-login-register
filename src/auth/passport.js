const passport = require('passport')
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const User = require("../models/user");


let option = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:"m@shd%h&wqer9823jkbe23ybh",
}

passport.use(
    new StrategyJwt(option,async function(jwtPayload,done){
            return User.findOne({where:{id:jwtPayload.id}})
            .then((user)=>{
                return done(null,user)
            })
            .catch((err)=>{
                return done(err)
            })
        }
    )
)