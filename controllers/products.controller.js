import ProductsService from "../services/products.service.js";
import { io } from "../index.js";

class ProductsController {
  async getAllProducts(req, res, next) {
    try {
      const { from = 0, limit = 10, search = "" } = req.query;
      const products = await ProductsService.getAllProducts(
        parseInt(from),
        parseInt(limit),
        search
      );

      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async getProductStatistics(req, res, next) {
    try {
      const products = await ProductsService.getProductStatistics();

      return res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductsService.getProductById(id);

      if (!product) {
        const error = new Error("Product not found");
        error.error = "PRODUCT_NOT_FOUND";
        error.status = 404;
        throw error;
      }

      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      const data = req.body;
      const result = await ProductsService.createProduct(data);

      io.emit("product_created", {
        event: "product_created",
        data: result,
      });

      return res.status(201).json({
        success: true,
        message: "Product created",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const { ids } = req.params;
      const data = req.body;

      if (!ids) {
        const error = new Error("Product ID is required");
        error.error = "MISSING_ID";
        error.status = 400;
        throw error;
      }

      // Check if body is empty
      if (!data || Object.keys(data).length === 0) {
        const error = new Error("Add something to update");
        error.error = "EMPTY_UPDATE";
        error.status = 400;
        throw error;
      }
      const product_ids = ids.split(",").map((id) => parseInt(id.trim()));

      const result = await ProductsService.updateProduct(product_ids, data);

      io.emit("product_updated", {
        event: "product_updated",
        data: result,
      });

      return res.status(200).json({
        success: true,
        message: "Product updated",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const result = await ProductsService.deleteProduct(id);

      io.emit("product_deleted", {
        event: "product_deleted",
        data: result,
      });

      return res.status(200).json({
        success: true,
        message: "Product deleted",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductsController();
