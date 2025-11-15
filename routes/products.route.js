import express from "express";
import ProductsController from "../controllers/products.controller.js";
import {
  createProductSchema,
  updateProductSchema,
  validate,
} from "../validators/product.validators.js";

const router = express.Router();

// Get All Products
router.get("/", ProductsController.getAllProducts);

// Get Products Statistics
router.get("/statistics", ProductsController.getProductStatistics);

// Get Single Product by ID
router.get("/:id", ProductsController.getProductById);

// Create Product
router.post(
  "/",
  validate(createProductSchema),
  ProductsController.createProduct
);

// Update Product by ID
router.put(
  "/:ids",
  validate(updateProductSchema),
  ProductsController.updateProduct
);

// Delete Product by ID
router.delete("/:id", ProductsController.deleteProduct);

export default router;
