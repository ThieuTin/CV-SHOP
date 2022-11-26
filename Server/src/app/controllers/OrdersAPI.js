
// models
const Order = require('../models/Order');

class OrdersAPI {
    // [GET] /orders
    async findAll(req, res) {
        try {
            const orders = await Order
                .find({});
            res.json(orders);
        } catch (error) {
            console.log(error);
        }
    };

    // [GET] /orders/:orderId
    async findById(req, res) {
        try {
            const { orderId } = req.params;
            const order = await Order
                .findOne({ _id: orderId });
            res.json(order);
        } catch (error) {
            console.log(error);
        }
    };

    // [POST] /orders
    async insertOrder(req, res) {
        try {
            const order = new Order({
                customerId: req.user._id,
                ...req.body
            });
            await order.save();
            res.json({
                statusText: 'success',
                message: 'Order successfully!'
            })
        } catch (error) {
            console.log(error);
        }
    };

    // [PATCH] /orders/status/:orderId
    async switchStatus(req, res) {
        try {
            const { orderId } = req.params;
            const order = await Order
                .findOne({ _id: orderId });
            order.status = order.status === 'proccessing' ? 'success' : 'proccessing';
            await order.save();
            res.json({
                statusText: 'success',
                message: 'Switch status successfully!'
            })
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = new OrdersAPI;