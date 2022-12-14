import joi from "joi";

export const signInSchema = joi.object({
    url: joi.string().required()
});