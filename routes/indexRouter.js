const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/middlewares');
// const userIndex = require('../routes/user/userIndex')
const adminIndex = require('../routes/admin/adminIndex')
const commonIndex = require('./common/common.js');



router.use('/common',commonIndex)

// router.use('/user',userIndex)
router.use('/admin',adminIndex)


module.exports = router



