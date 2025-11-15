export const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;

  const response = {
    success: false,
    message: err.message || "Internal Server Error",
    error: err.error || "INTERNAL_ERROR",
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  if (err.error === "PRODUCT_NOT_FOUND") {
    return res.status(404).json({
      success: false,
      message: "Product not found",
      error: "PRODUCT_NOT_FOUND",
    });
  }

  if (err.error === "PRODUCT_INACTIVE") {
    return res.status(400).json({
      success: false,
      message: "Cannot update inactive product",
      error: "PRODUCT INACTIVE",
    });
  }

  if (err.error === "EMPTY_UPDATE") {
    return res.status(400).json({
      success: false,
      message: "Add something to update",
      error: "Empty Data",
    });
  }
  if (err.error === "MISSING_ID") {
    return res.status(400).json({
      success: false,
      message: "Product ID is required",
      error: "MISSING_ID",
    });
  }

  return res.status(status).json(response);
};

export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    error: "ROUTE_NOT_FOUND",
  });
};
