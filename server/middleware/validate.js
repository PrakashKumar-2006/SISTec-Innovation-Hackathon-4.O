const { z } = require('zod');

/**
 * Middleware factory for validating request bodies against a Zod schema.
 * @param {z.ZodSchema} schema - The Zod schema to validate against.
 */
const validateBody = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse(req.body);
    req.body = parsed;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      return res.status(400).json({
        success: false,
        message: 'Input validation failed.',
        errors: formattedErrors
      });
    }
    next(error);
  }
};

module.exports = { validateBody };
