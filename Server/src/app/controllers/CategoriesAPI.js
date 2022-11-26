const Category = require('../models/Category');
const mongoose = require('mongoose');
class CategoriesAPI {
    // [GET] /categories
    async findAll(req, res) {
        try {
            const categories = await Category
                .find({})
                .sort({ 'displayOrder': 1 });
            res.json(categories);
        } catch (error) {
            console.log(error);
        }
    };

    // [GET] /categories/:slugCategory
    async findBySlug(req, res) {
        try {
            const { slugCategory } = req.params;
            const category = await Category
                .findOne({
                    slug: slugCategory,
                    status: 'active'
                });
            const parents = [];
            let parent = await Category
                .findOne({
                    _id: category.parentId,
                    status: 'active'
                })
                .select('title slug parentId');
            while (parent !== null) {
                parents.push(parent);
                const prevParent = await Category
                    .findOne({
                        _id: parent.parentId,
                        status: 'active'
                    })
                    .select('title slug parentId');
                parent = prevParent;
            };
            const children = await Category
                .find({
                    parentId: category._id,
                    status: 'active'
                })
                .sort({ 'displayOrder': 1 })
                .select('title slug');
            res.json({
                ...(category.toObject()),
                parents,
                children
            });
        } catch (error) {
            console.log(error);
        }
    };
    // async findBySlug(req, res) {
    //     try {
    //         const { slugProduct } = req.params;
    //         const product = await Product
    //             .findOne({
    //                 slug: slugProduct,
    //             });
    //         res.json(product);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // [POST] /categories
    async insertCategory(req, res) {
        try {
            const banners = req.files['banners'].map( file => file.originalname );
            const image = req.files['image'][0].originalname;
            const { title, ...categoryBody } = req.body;
            const categoryExisted = await Category.findOne({ title: title });
            if (categoryExisted) {
                res.json({
                    statusText: 'error',
                    message: 'Category is existed'
                });
                console.log('error');
                return;
            }
            const isDeleted = await Category
                .findOneDeleted({title: title});
            if(isDeleted) {
                res.json({
                    statusText: 'info',
                    message: 'Category is existed in recycle bin',
                    category: isDeleted
                });
                return;
            }
            const category = new Category({
                ...categoryBody,
                title,
                image,
                banners
            });
            await category.save();
            res.json({
                status: 'success',
                message: 'Create category successfully!'
            });
        } catch (error) {
            console.log(error);
        }
    };
     // [PUT] /categories/: categoryID
     async editCategoryById(req, res) {
        try { 
            const { categoryID } = req.params;
           // const banners = req.files['banners'].map( file => file.originalname );
            const { title, image, banners, ...newBody } = req.body;
            const body = {
                ...req.body,
            };    
            if (req.files) {
                body.image = req.files['image'][0].originalname;
                body.banners = req.files['banners'].map( file => file.originalname );
            }
            if (title) {
                const category = await Category.findById(categoryID);
                category.title = title;
                await category.save();
            }
            const _category = await Category.findByIdAndUpdate(categoryID, body, {
                category:true,
                
            })
            res.json({
                category: _category,
                status: "success",
                message: "Edit Category successfully!",
            });
        } catch (error) {
            console.log(error);
        };
    };
    // [DELETE] /categories/:categoryID
    async deleteCategorybyID(req, res) {
        try {
            const deletor = mongoose.Types.ObjectId("61af7d561ab0c6ea12eaa560");
            const { categoryID } = req.params;
            const result = await Category
            .delete({ _id: categoryID }, deletor );
                res.json({
                    ...result,
                    categoryID
                });
        } catch (error) {
            console.log(error);
        };
    };

    // [DELETE] /categories/
    async deletedCategoryAll(req, res) {
        try {
            const deletor = mongoose.Types.ObjectId("61af7d561ab0c6ea12eaa560");
            const { categoryIDs } = req.body;
            const result = await Category
            .delete({ _id: { $in: categoryIDs }}, deletor );
                res.json({
                    ...result,
                    categoryIDs
                });
        } catch (error) {
            console.log(error);
        };
    };
    // [PATCH] /products/:productID
    async restoreByID(req, res) {
        try {
        const { categoryID } = req.params;
        const restoredItem = await Category.restore({ _id: categoryID });
        res.json({
            statusText: "success",
            message: "Restore successfully",
        });
        } catch (error) {
        console.log(error);
        }
    }
};

module.exports = new CategoriesAPI;