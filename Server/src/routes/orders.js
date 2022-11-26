const express = require('express');
const router = express.Router();

//controllers
const ordersAPI = require('../app/controllers/OrdersAPI');
// middlewares
const verifyToken = require('../app/middlewares/verifyToken');

router.patch('/status/:orderId', ordersAPI.switchStatus);
router.post('/', verifyToken, ordersAPI.insertOrder);
router.get('/:orderId', ordersAPI.findById);
router.get('/', ordersAPI.findAll);

module.exports = router;