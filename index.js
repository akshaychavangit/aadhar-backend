const express = require('express');
require('dotenv').config()
const mongoUtil = require( './db/mongodbConnection' );
const { domainVerification } = require('./middlewares/middlewares')
const indexRouter = require('./routes/indexRouter');
const app = express();
var cors = require('cors');
app.use(express.json());
app.use(cors());



global.CustomError = require('./common/CustomError')
mongoUtil.connectToServer().then(async ()=> {
    console.log('Connected to mongoDB');



app.use('/api', domainVerification,indexRouter);

},(error)=>{
    throw error
})





app.listen(process.env.PORT,()=>{
    console.log(`Listening on ${process.env.PORT}`)
})