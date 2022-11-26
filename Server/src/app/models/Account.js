const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Account = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: '',
    },
    image:{
        type: String,
        default: '',
    },
    phone: {
        type: String,
        maxlength: 10,
        default: ''
    },
    address: {
        type: String,
        default: '',
    },
    role:{
        type: String,
        default: 'User',
    },
    refreshToken: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});
Account.plugin(mongooseDelete,{
    deletedAt: true,
    deletedBy: true,
    overrideMethods: true
});
module.exports = mongoose.model('Account', Account);
