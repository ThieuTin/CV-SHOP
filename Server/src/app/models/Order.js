const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    customerId: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    ordered: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        default: 'proccessing'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', Order);