const { body, query } = require("express-validator");

exports.validateRegistration = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 14, min: 3 }),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

exports.validateLogin = [
  body("email").notEmpty().withMessage("email is required").isEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

exports.validateCheckUser = [
  body().custom((body) => {
    if (Object.keys(body).length > 0) {
      throw new Error("No fields are allowed");
    }
    return true;
  }),
];

exports.validateDeletion = [
  body().custom((body) => {
    if (Object.keys(body).length > 0) {
      throw new Error("No fields are allowed");
    }
    return true;
  }),
];

exports.validateUpdation = [
  body("username")
    .optional()
    .isLength({ min: 3, max: 14 })
    .withMessage("Username must be 3–14 characters"),

  body("email").optional().isEmail().withMessage("Invalid email format"),

  body().custom((body) => {
    const allowed = ["username", "email"];
    const keys = Object.keys(body);

    if (keys.length === 0) {
      throw new Error("At least one field is required");
    }

    const invalid = keys.filter((key) => !allowed.includes(key));
    if (invalid.length > 0) {
      throw new Error(`Invalid fields: ${invalid.join(", ")}`);
    }

    return true;
  }),
];
