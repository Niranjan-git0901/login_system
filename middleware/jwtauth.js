const jwt = require("jsonwebtoken");

function jwtAuth(req,res,next){

    const authHeader =
    req.headers.authorization;

    if(!authHeader){

       return res.send("Token Missing");

    }

    const parts =
    authHeader.split(" ");

    if(parts.length !== 2){

        return res.status(401)
        .send("Invalid Authorization Format");

    }

    const token = parts[1];
    let decoded;
    try{

        decoded =
        jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    }
    catch(err){

        console.log(err);

        return res.status(401)
        .send("Invalid Token");

    }

}

module.exports = jwtAuth;