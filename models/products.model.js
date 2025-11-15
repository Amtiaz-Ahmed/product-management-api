import database from "../config/database.js";

class ProductModel {
  async getAllProducts(from = 0, limit = 10, search = "") {
    try {
      let query = "SELECT * FROM products WHERE 1=1";
      const params = [];

      if (search) {
        query += " AND (name LIKE ? OR price LIKE ? OR status LIKE ?)";
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      }

      query += " LIMIT ? OFFSET ?";
      params.push(limit, from);

      const [rows] = await database.query(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async getTotalProducts(search = "") {
    try {
      let query = "SELECT COUNT(*) as count FROM products WHERE 1=1";
      const params = [];

      if (search) {
        query += " AND (name LIKE ? OR price LIKE ? OR status LIKE ?)";
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      }

      const [rows] = await database.query(query, params);
      return rows[0].count;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const query = "SELECT * FROM products WHERE id = ?";
      const [rows] = await database.query(query, [id]);

      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }

  async getProductStatistics() {
    try {
      const query =
        "SELECT COUNT(*) as total, SUM(status = 'active') as active, SUM(status = 'inactive') as inactive, AVG(price) as avg_price, MAX(price) as highest_price, MIN(price) as lowest_price FROM products";

      const [rows] = await database.query(query);

      const result = rows[0];

      return {
        total: parseInt(result.total),
        active: parseInt(result.active),
        inactive: parseInt(result.inactive),
        avg_price: parseFloat(result.avg_price).toFixed(0),
        highest_price: parseFloat(result.highest_price).toFixed(0),
        lowest_price: parseFloat(result.lowest_price).toFixed(0),
      };
    } catch (error) {
      throw error;
    }
  }

  async createProduct(data) {
    try {
      const { name, price, stock } = data;
      const query =
        "INSERT INTO products (name, price, stock, status, created_at) VALUES (?, ?, ?, 'active', NOW())";
      const [result] = await database.query(query, [name, price, stock]);

      return {
        id: result.insertId,
        name,
        price,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(ids, data) {
    try {
      const setFields = Object.keys(data)
        .map((key) => `${key} = ?`)
        .join(", ");

      const placeholders = ids.map(() => "?").join(",");
      let query = `UPDATE products SET ${setFields}, updated_at = NOW() WHERE id IN (${placeholders})`;
      if (!data.status) {
        query += ` AND status = 'active'`;
      }
      const params = [...Object.values(data), ...ids];

      const [result] = await database.query(query, params);

      return {
        updatedCount: result.affectedRows,
        skippedCount: ids.length - result.affectedRows,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const query =
        "UPDATE products SET status = 'inactive', updated_at = NOW() WHERE id = ?";
      const [result] = await database.query(query, [id]);

      return {
        id,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductModel();
