import Joi from 'joi';

export const addCardSchema = Joi.object({
    title: Joi.string().min(2).max(256).required().label('Title'),
    subtitle: Joi.string().min(2).max(256).required().label('Subtitle'),
    description: Joi.string().min(2).max(1024).required().label('Description'),
    phone: Joi.string().pattern(/^05\d([-]{0,1})\d{7}$/).required().label('Phone').messages({
        'string.pattern.base': 'Phone number must be a valid Israeli phone number (e.g., 05X-XXXXXXX)',
        'string.empty': 'Phone is required'
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    web: Joi.string().uri().allow('').label('Web URL'),
    image: Joi.object({
        url: Joi.string().uri().allow('').label('Image URL'),
        alt: Joi.string().min(2).max(256).allow('').label('Image Alt Text')
    }).label('Image'),
    address: Joi.object({
        state: Joi.string().min(2).max(256).allow('').label('State'),
        country: Joi.string().min(2).max(256).required().label('Country'),
        city: Joi.string().min(2).max(256).required().label('City'),
        street: Joi.string().min(2).max(256).required().label('Street'),
        houseNumber: Joi.number().integer().min(1).required().label('House Number'),
        zip: Joi.string().min(7).max(10).required().allow('').label('Zip Code')
    }).required().label('Address')
});