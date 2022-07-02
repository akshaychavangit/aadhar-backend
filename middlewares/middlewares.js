const mongoClient = require('../db/mongodbConnection');
const { siteSettings } = require('../db/mongodbConfiguration').mongoConfiguration.collections;
const { jwtVerify ,jwtEncrypt } = require('../common/jwt')


const  middleware = {
    tokenVerification: async (req, res, next)=> {
      try {
        if(!req.headers.authorization){
            res.status(401).send({success:false,data:"token invalid"})
            res.end()
            return
        }
        let token = req.headers.authorization;
        // let cryptoDecryptedToken = await cryptoDecrypt(token);
        // if(!cryptoDecryptedToken){
        //     res.status(401).send({success:false,data:"token invalid"})
        //     res.end()
        //     return
        // }
        let tokenData = await jwtVerify(token);
        if(tokenData){
            req.body.userId = tokenData.data.userId;
            req.body.role = Number(tokenData.data.role);
            req.body.decodedToken = tokenData.data
            next();

        }else{
            res.status(401).send({success:false,data:"token expired"})
            res.end()
            return
        }    
        // next()
    } catch (error) {
        throw error    
    }
    },
    domainVerification:async (req,res,next)=>{
        try {
      
            let host = req.hostname;
            if(req.headers){
              if(req.headers.origin){
                host = req.headers.origin;
              }
            }
            let domainUrl;
            console.log(host)
            let db = mongoClient.getDb().db();
              
                let result =  await db.collection(siteSettings).findOne({domain:host})
                if(result){
                  console.log(result)
                  domainUrl = host;
                  req.body.domain = domainUrl;    
                  req.body.siteSettings = result;
                  next();
            } else {
              res.status(401).send({message: "Unauthorized domain", success:false});
            } 
          } catch (error) {
            console.log(error);
          }
    }
}

module.exports = middleware