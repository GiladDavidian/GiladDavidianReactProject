import { useContext, useEffect, useRef, useState } from 'react';
import { MyContext } from "../App";
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import './AddCard.css';

export default function AddCard() {
    const { snackbar, setIsLoader, getCardsData } = useContext(MyContext);
    const navigate = useNavigate();
    const isFirstRender = useRef(true);
    const [errors, setErrors] = useState({});
    const token = localStorage.getItem('token');

    const [form, setForm] = useState({
        title: '',
        subtitle: '',
        description: '',
        phone: '',
        email: '',
        web: '',
        image: {
            url: '',
            alt: ''
        },
        address: {
            state: '',
            country: '',
            city: '',
            street: '',
            houseNumber: '',
            zip: ''
        }
    });

    // --- Joi Schema for Card Validation ---
    const schema = Joi.object({
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
            zip: Joi.string().min(7).max(10).allow('').label('Zip Code')
        }).required().label('Address')
    });

    const validateForm = () => {
        const { error } = schema.validate(form, { abortEarly: false });
        const newErrors = {};
        if (error) {
            error.details.forEach(detail => {
                if (detail.path.length > 1) {
                    const parent = detail.path[0];
                    const child = detail.path[1];
                    newErrors[`${parent}.${child}`] = detail.message;
                } else {
                    newErrors[detail.context.key] = detail.message;
                }
            });
        }
        setErrors(newErrors);
        return !error;
    };

    const addCard = async ev => {
        ev.preventDefault();

        const isValid = validateForm();
        if (!isValid) {
            snackbar('Please correct the errors in the form.', 'error');
            return;
        }

        setIsLoader(true);
        try {
            const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                snackbar('Successfully added card', 'success');
                getCardsData()
                navigate('/');
            } else {
                const errorData = await res.json();
                console.error('Error adding card:', errorData);
                snackbar(`Failed to add card: ${errorData.message || 'Unknown error'}`, 'error');
            }
        } catch (error) {
            console.error('Network or unexpected error:', error);
            snackbar('An unexpected error occurred. Please try again.', 'error');
        } finally {
            setIsLoader(false);
        }
    };

    const cancel = () => {
        navigate('/');
    };

    const change = ev => {
        const { id, value } = ev.target;

        setForm(prevForm => {
            if (id === 'imageUrl' || id === 'imageAlt') {
                return {
                    ...prevForm,
                    image: {
                        ...prevForm.image,
                        [id === 'imageUrl' ? 'url' : 'alt']: value
                    }
                };
            } else if (['state', 'country', 'city', 'street', 'houseNumber', 'zip'].includes(id)) {
                return {
                    ...prevForm,
                    address: {
                        ...prevForm.address,
                        [id]: value
                    }
                };
            } else {
                return {
                    ...prevForm,
                    [id]: value,
                };
            }
        });
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const handler = setTimeout(() => {
            validateForm();
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [form]);

    return (
        <div className="card-form-container">
            <h2>CREATE CARD</h2>
            <form onSubmit={addCard}>
                <div className="form-grid">
                    <div className="form-group">
                        <input type="text" id="title" placeholder="Title *" required onChange={change} value={form.title} />
                        {errors.title && <div className="error">{errors.title}</div>}
                    </div>

                    <div className="form-group">
                        <input type="text" id="subtitle" placeholder="Subtitle *" required onChange={change} value={form.subtitle} />
                        {errors.subtitle && <div className="error">{errors.subtitle}</div>}
                    </div>

                    <div className="form-group">
                        <input type="text" id="description" placeholder="Description *" required onChange={change} value={form.description} />
                        {errors.description && <div className="error">{errors.description}</div>}
                    </div>

                    <div className="form-group">
                        <input type="tel" id="phone" placeholder="Phone *" required onChange={change} value={form.phone} />
                        {errors.phone && <div className="error">{errors.phone}</div>}
                    </div>

                    <div className="form-group">
                        <input type="email" id="email" placeholder="Email *" required onChange={change} value={form.email} />
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>

                    <div className="form-group">
                        <input type="url" id="web" placeholder="Web" onChange={change} value={form.web} />
                        {errors.web && <div className="error">{errors.web}</div>}
                    </div>

                    <div className="form-group">
                        <input type="url" id="imageUrl" placeholder="Image URL" onChange={change} value={form.image.url} />
                        {errors['image.url'] && <div className="error">{errors['image.url']}</div>}
                    </div>

                    <div className="form-group">
                        <input type="text" id="imageAlt" placeholder="Image Alt" onChange={change} value={form.image.alt} />
                        {errors['image.alt'] && <div className="error">{errors['image.alt']}</div>}
                    </div>

                    <div className="form-group">
                        <input type="text" id="state" placeholder="State" onChange={change} value={form.address.state} />
                        {errors['address.state'] && <div className="error">{errors['address.state']}</div>}
                    </div>

                    <div className="form-group">
                        <input type="text" id="country" placeholder="Country *" required onChange={change} value={form.address.country} />
                        {errors['address.country'] && <div className="error">{errors['address.country']}</div>}
                    </div>

                    <div className="form-group">
                        <input type="text" id="city" placeholder="City *" required onChange={change} value={form.address.city} />
                        {errors['address.city'] && <div className="error">{errors['address.city']}</div>}
                    </div>

                    <div className="form-group">
                        <input type="text" id="street" placeholder="Street *" required onChange={change} value={form.address.street} />
                        {errors['address.street'] && <div className="error">{errors['address.street']}</div>}
                    </div>

                    <div className="form-group">
                        <input type="number" id="houseNumber" placeholder="House Number *" required onChange={change} value={form.address.houseNumber} />
                        {errors['address.houseNumber'] && <div className="error">{errors['address.houseNumber']}</div>}
                    </div>

                    <div className="form-group">
                        <input type="text" id="zip" placeholder="Zip" onChange={change} value={form.address.zip} />
                        {errors['address.zip'] && <div className="error">{errors['address.zip']}</div>}
                    </div>
                </div>

                <div className="form-actions-combined">
                    <button type="button" className="cancel-button" onClick={cancel}>CANCEL</button>
                    <button type="submit" className="submit-button">ADD</button>
                </div>
            </form>
        </div>
    );
}