import Joi from 'joi';

export const signupSchema = Joi.object({
    name: Joi.object({
        first: Joi.string().min(2).max(256).required().messages({
            'string.min': '"First name" must be at least 2 characters long.',
            'string.max': '"First name" must be at most 256 characters long.',
            'string.empty': '"First name" cannot be empty.',
            'any.required': '"First name" is required.'
        }),
        middle: Joi.string().allow('').max(256),
        last: Joi.string().min(2).max(256).required().messages({
            'string.min': '"Last name" must be at least 2 characters long.',
            'string.max': '"Last name" must be at most 256 characters long.',
            'string.empty': '"Last name" cannot be empty.',
            'any.required': '"Last name" is required.'
        })
    }).required(),

    phone: Joi.string()
        .pattern(/^05\d{8}$/)
        .required()
        .messages({
            'string.pattern.base': '"Phone" number must be a valid Israeli phone number (e.g., 0501234567).',
            'string.empty': '"Phone" number cannot be empty.',
            'any.required': '"Phone" number is required.'
        }),

    email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(5)
        .required()
        .messages({
            'string.email': '"Email" must be a valid email address.',
            'string.min': '"Email" must be at least 5 characters long.',
            'string.empty': '"Email" cannot be empty.',
            'any.required': '"Email" is required.'
        }),

    password: Joi.string()
        .min(7)
        .max(20)
        .required()
        .pattern(
            /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*\-]).{7,20}$/
        )
        .messages({
            "string.pattern.base":
                '"Password" must contain at least one uppercase English letter, one lowercase English letter, one number, and one special character (!@#$%^&*-).',
            "string.empty": '"Password" is required.',
            "string.min": '"Password" must be at least 7 characters long.',
            "string.max": '"Password" must be at most 20 characters long.',
            "any.required": '"Password" is required.'
        }),

    image: Joi.object({
        url: Joi.string().uri().allow(''),
        alt: Joi.string().max(256).allow('')
    }).optional(),

    address: Joi.object({
        state: Joi.string().max(256).allow(''),
        country: Joi.string().min(2).max(256).required().messages({
            'string.min': '"Country" must be at least 2 characters long.',
            'string.max': '"Country" must be at most 256 characters long.',
            'string.empty': '"Country" cannot be empty.',
            'any.required': '"Country" is required.'
        }),
        city: Joi.string().min(2).max(256).required().messages({
            'string.min': '"City" must be at least 2 characters long.',
            'string.max': '"City" must be at most 256 characters long.',
            'string.empty': '"City" cannot be empty.',
            'any.required': '"City" is required.'
        }),
        street: Joi.string().min(2).max(256).required().messages({
            'string.min': '"Street" must be at least 2 characters long.',
            'string.max': '"Street" must be at most 256 characters long.',
            'string.empty': '"Street" cannot be empty.',
            'any.required': '"Street" is required.'
        }),
        houseNumber: Joi.number().integer().min(1).required().messages({
            'number.base': '"House number" must be a number.',
            'number.integer': '"House number" must be an integer.',
            'number.min': '"House number" must be at least 1.',
            'any.required': '"House number" is required.'
        }),
        zip: Joi.string().max(20).allow('')
    }).required(),

    isBusiness: Joi.boolean().required()
});