const Joi = require("joi");


const validateSignup = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(16),
    phone: Joi.string().required(),
  });
  return schema.validate(user);
};

const validateLogin = (login) => {
  const schema = Joi.object({
    EmailPhone: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(login);
};

const validateUpdate = (user) => {
  const schema = joi.object({
    firstName: joi.string().min(2).max(255),
    lastName: joi.string().min(2).max(255),
    phone: joi.string().min(11).max(13),
  });
  return schema.validate(user);
};


module.exports = { validateSignup, validateLogin, validateUpdate };
