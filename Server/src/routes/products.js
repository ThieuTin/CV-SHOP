const express = require("express");
const router = express.Router();

// Controllers
const productsAPI = require("../app/controllers/ProductsAPI");
// Middlewares
const upload = require("../app/middlewares/upload");
router.patch("/", productsAPI.deletedProductAll);
router.patch("/:productID", productsAPI.restoreByID);
router.get("/top/:type/:number", productsAPI.topProducts);
router.get("/similar/:productId/:number", productsAPI.similarProducts);
router.get("/:page/:number", productsAPI.findAllWithPagination);
router.get("/:slugProduct", productsAPI.findBySlug);
router.get("/", productsAPI.findAll);
router.post("/c", productsAPI.findByCategory);
router.post("/", upload.array("images", 10), productsAPI.insertProduct);
router.put(
  "/:productID",
  upload.array("images", 10),
  productsAPI.editProductById
);
router.delete("/:productID", productsAPI.deleteProductById);

module.exports = router;
