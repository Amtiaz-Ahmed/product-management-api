import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().required().min(3),
  price: Joi.number().required().positive(),
  stock: Joi.number().required().min(0),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3),
  price: Joi.number().positive(),
  stock: Joi.number().min(0),
  status: Joi.string().valid("active", "inactive"),
}).min(1);

export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        error: "Invalid Data",
      });
    }

    req.validatedBody = value;
    next();
  };
};
