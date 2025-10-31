// schemas/playerSchema.ts
import Joi from "joi";

export const playerManagerJoiSchema = Joi.object({
    fullname: Joi.string().trim().min(2).max(50).required().messages({
        "string.empty": "Manager fullname is required",
    }),
    phone: Joi.string()
        .trim()
        .pattern(/^[0-9]{7,15}$/)
        .required()
        .messages({
            "string.pattern.base": "Phone must contain only digits (7–15 chars)",
            "string.empty": "Manager phone is required",
        }),
    email: Joi.string().email({ tlds: false }).required().messages({
        "string.email": "Manager email must be valid",
    }),
    dob: Joi.date().iso().less("now").required().messages({
        "date.base": "Manager date of birth must be valid",
        "any.required": "Manager DOB is required",
    }),
});

export const playerJoiSchema = Joi.object({
    firstName: Joi.string().trim().min(2).max(30).required().messages({
        "string.empty": "First name is required",
    }),
    lastName: Joi.string().trim().min(2).max(30).required().messages({
        "string.empty": "Last name is required",
    }),
    number: Joi.alternatives()
        .try(Joi.number(), Joi.string())
        .required()
        .messages({
            "any.required": "Jersey number is required",
        }),
    dateSigned: Joi.date().iso().required().messages({
        "date.base": "Date signed must be a valid date",
    }),
    height: Joi.number().positive().max(300).required().messages({
        "number.base": "Height must be a number",
        "number.max": "Height cannot exceed 300 cm",
    }),
    phone: Joi.string()
        .trim()
        .pattern(/^[0-9]{7,15}$/)
        .required()
        .messages({
            "string.pattern.base": "Phone must contain only digits (7–15 chars)",
            "string.empty": "Phone is required",
        }),
    email: Joi.string().email({ tlds: false }).required().messages({
        "string.email": "Invalid email format",
    }),
    dob: Joi.date().iso().less("now").required().messages({
        "date.base": "Date of birth must be valid",
        "any.required": "Date of birth is required",
    }),
    avatar: Joi.string().uri().required().messages({
        "string.empty": "Profile photo is required",
        "string.uri": "Invalid image URL",
    }),
    manager: playerManagerJoiSchema.required(),
});
