const jwt = require('jsonwebtoken');


let jwtEncrypt = async (data) =>{
    try {
        return jwt.sign({
            data: data
          }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME });
        
    } catch (error) {
        console.log(error,"Token generation error")
        throw error
    }

}

let jwtVerify = async (data) =>{
    try {
    
        return jwt.verify(data,process.env.JWT_SECRET_KEY);
        
    } catch (error) {
           return null
    }

}


module.exports = {
    jwtEncrypt , jwtVerify
}