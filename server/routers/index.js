

const express = require('express');
const router = express.Router();

const user = require('./user.js');
const habit = require('./habit.js');
const chat = require('./chat.js');
const house = require('./house.js');


router.use('/user',user)
router.use('/habit',habit)
router.use('/house',house)

module.exports=router;