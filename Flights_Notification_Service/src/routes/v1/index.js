const express = require('express');

const router=express.Router();

const {info_controller} = require('../../controllers');
const emailRoutes = require('./email_routes')

router.get('/info',info_controller.info);

router.use('/tickets',emailRoutes);

module.exports=router;
