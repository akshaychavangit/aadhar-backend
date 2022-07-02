const express = require('express');
const router = express.Router();




router.get('/getUserDetails',async (req,res)=>{
  try {
      let vendor = new vendorController(req.body,req.params);
      let response = await vendor.getUserDetails();
      res.send({ success: true, message: 'Success', data: response });
      res.end();
    } catch (error) {
      res.status(error.statusCode).send({ success: false, message: error.message, data: error.data });
    }
})



module.exports = router