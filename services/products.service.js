import ProductModel from "../models/products.model.js";

class ProductsService {
  async getAllProducts(from = 0, limit = 10, search = "") {
    const products = await ProductModel.getAllProducts(from, limit, search);
    const total = await ProductModel.getTotalProducts(search);

    return {
      success: true,
      data: products,
    };
  }

  async getProductById(id) {
    return await ProductModel.getProductById(id);
  }

  async getProductStatistics(id) {
    return await ProductModel.getProductStatistics(id);
  }

  async createProduct(data) {
    return await ProductModel.createProduct(data);
  }

  async updateProduct(ids, data) {
    if (!ids || ids.length === 0) {
      const error = new Error("Invalid product IDs");
      error.error = "INVALID_INPUT";
      error.status = 400;
      throw error;
    }
    if (ids.length === 1) {
      const product = await ProductModel.getProductById(ids);

      if (!product) {
        const error = new Error("Product not found");
        error.error = "PRODUCT_NOT_FOUND";
        error.status = 404;
        throw error;
      }

      if (
        product.status === "inactive" ||
        (product.status === "inactive" && data.status === "inactive")
      ) {
        const error = new Error("Cannot update inactive product");
        error.error = "PRODUCT_INACTIVE";
        error.status = 400;
        throw error;
      }
    }
    return await ProductModel.updateProduct(ids, data);
  }

  async deleteProduct(id) {
    const product = await ProductModel.getProductById(id);

    if (!product) {
      const error = new Error("Product not found");
      error.error = "PRODUCT_NOT_FOUND";
      error.status = 404;
      throw error;
    }

    return await ProductModel.deleteProduct(id);
  }
}

export default new ProductsService();
