// src/utils/validate.js
export default function validate(schema) {
  return (req, res, next) => {
    const result = schema.validate(req.body, { abortEarly: false, allowUnknown: false, stripUnknown: true });
    if (result.error) {
      const details = result.error.details.map(d => d.message);
      return res.status(400).json({ message: "Validation error", details });
    }
    req.body = result.value;
    next();
  };
}
