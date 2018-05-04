

const express = require('express');
const router = express.Router();

const user = require('./user.js');
const habit = require('./habit.js');

// router.use('/test',test)
router.use('/user',user)
router.use('/habit',habit)

module.exports=router;