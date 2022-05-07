import Joi from "joi";

export const NameSchema = Joi.object({
    name:Joi.string().required()
})