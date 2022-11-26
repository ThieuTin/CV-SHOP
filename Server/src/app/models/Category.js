const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

const Category = new Schema({
    _id: {
        type: Number
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: 'title',
        unique: true
    },
    image: {
        type: String,
        default: ''
    },
    parentId: {
        type: Number,
        default: null
    },
    displayOrder: {
        type: Number
    },
    banners: {
        type: Array,
        default: []
    },
}, {
    _id: false,
    timestamps: true
});

mongoose.plugin(slug);
Category.plugin(AutoIncrement);

Category.plugin(mongooseDelete,{
    deletedAt: true,
    deletedBy: true,
    overrideMethods: true
});
module.exports = mongoose.model('Category', Category);