import Joi from "joi";

const bookSchema = Joi.object({
  id: Joi.number().integer().min(0),
  name: Joi.string().min(4).max(100).required(),
  author: Joi.string().min(4).max(20).required(),
  isbn: Joi.string()
    .min(1)
    .max(15)
    .pattern(RegExp(/^[0-9]*$/))
    .required(),
});

export const userSchema = Joi.object({
  id: Joi.number().integer().min(0),
  firstName: Joi.string().min(4).max(20).required(),
  lastName: Joi.string().min(4).max(20).required(),
  email: Joi.string().email().min(9).max(25).required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .required(),
  repeatPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("repeatPassword")
    .options({ messages: { "any.only": "{{#label}} does not match" } }),
});

export const credentialsSchema = Joi.object({
  email: Joi.string().email().min(3).max(25).required(),
  password: Joi.string()
    .min(9)
    .max(30)
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .required(),
});
export const idSchema = Joi.number();

export default bookSchema;
