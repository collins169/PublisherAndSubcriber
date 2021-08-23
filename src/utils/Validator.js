const { check, validationResult } = require("express-validator");

exports.validate = {
  subscribe: [
    check("url")
    .notEmpty()
    .withMessage("url is required")
    .isString()
    .withMessage("url must be a string")
  ],
};

exports.validateRequest = (req, res, next) => {
    const errors = validationResult(req).array({
      onlyFirstError: true,
    });
  
    if (errors.length) {
      return res.status(422).json({ error: errors.map(er => `${er.msg} in ${er.location}`).join(' ,') });
    }

    return next();
  };