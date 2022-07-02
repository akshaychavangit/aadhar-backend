const express = require('express');
const router = express.Router();
const Common = require('../../controllers/common/common')
const {  tokenVerification } = require('../../middlewares/middlewares')







router.get('/domain-settings',async (req,res)=>{
  try {
      let common = new Common(req.body,req.params);
      let response = await common.getDomainSettings();
      res.send({ success: true, message: 'Success', data: response });
      res.end();
    } catch (error) {
      res.send({ success: false, message: error.message, data: error.data });
    }
})


router.post('/register',async (req,res)=>{
  try {
    let common = new Common(req.body,req.params);
    let response = await common.register();
      res.send({ success: true, message: 'Success', data: response });
      res.end();
    } catch (error) {
      res.status(400).send({ success: false, message: error.message, data: error.data });
    }
})

router.post('/login',async (req,res)=>{
  try {
    let common = new Common(req.body,req.params);
    let response = await common.login();
      res.send({ success: true, message: 'Success', data: response });
      res.end();
    } catch (error) {
      res.status(400).send({ success: false, message: error.message, data: error.data });
    }
})

router.get('/refreshToken',tokenVerification,async (req,res)=>{
  try {
    let common = new Common(req.body,req.params);
    let response = await common.refreshToken();
      res.send({ success: true, message: 'Success', data: response });
      res.end();
    } catch (error) {
      res.status(400).send({ success: false, message: error.message, data: error.data });
    }
})



router.post('/createAadhar',async (req,res)=>{
  try {
    let common = new Common(req.body,req.params);
    let response = await common.createAadhar();
      res.send({ success: true, message: 'Success', data: response });
      res.end();
    } catch (error) {
      res.status(400).send({ success: false, message: error.message, data: error.data });
    }
})



module.exports = router