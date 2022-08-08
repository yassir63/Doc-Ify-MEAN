const jwt = require('jsonwebtoken')
const secretKey = "ezgfjkzfozelfzmjfmoze" // you can choose to do npm i dotenv and have an env file and store it there !


const verifyToken = (req,res,next) => {
    const token = req.headers['authorization']
    console.log('token is', token)

    if(!token){
        res.status(403).send("A token is required for zuthentification !")
    }else{
        try{
            const token2 = token.split(' ')[1]
            const decodedToken = jwt.verify(token2 ,secretKey)
            req.decodedToken = decodedToken;
            next();
        }catch(err){
            console.log(err)
            res.json({status : "error", data : "Something went wrong !"})
        }
    }
    // return next();
}


module.exports = verifyToken;
