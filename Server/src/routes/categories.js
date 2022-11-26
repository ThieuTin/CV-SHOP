const express = require('express');
const router = express.Router();

//controllers
const categoriesAPI = require('../app/controllers/CategoriesAPI');
//Middlewares
const upload = require('../app/middlewares/upload');
router.patch("/:categoryID", categoriesAPI.restoreByID);
router.patch('/', categoriesAPI.deletedCategoryAll);
router.delete('/:categoryID', categoriesAPI.deleteCategorybyID);
router.get('/:slugCategory', categoriesAPI.findBySlug);
router.post('/', upload.fields([{name:'image', maxCount: 1}, {name:'banners', maxCount: 10}]), categoriesAPI.insertCategory);
router.put('/:categoryID', upload.fields([{name:'image', maxCount: 1}, {name:'banners', maxCount: 10}]), categoriesAPI.editCategoryById);
router.get('/', categoriesAPI.findAll);

module.exports = router;