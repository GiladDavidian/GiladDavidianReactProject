import { useContext, useEffect, useRef, useState } from 'react';
import { MyContext } from "../App";
import { useNavigate } from 'react-router-dom';
import { addCardSchema } from './AddCardSchema';
import './AddCard.css';

export default function AddCard() {
    const { snackbar, setIsLoader, getCardsData } = useContext(MyContext);
    const navigate = useNavigate();
    const isFirstRender = useRef(true);
    const [errors, setErrors] = useState({});
    const token = localStorage.getItem('token');

    const [touched, setTouched] = useState({});

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

    const validateForm = () => {
        const { error } = addCardSchema.validate(form, { abortEarly: false });
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

        const allFieldsTouched = Object.keys(form).reduce((acc, key) => {
            if (typeof form[key] === 'object' && form[key] !== null) {
                Object.keys(form[key]).forEach(nestedKey => {
                    if (key === 'image' && (nestedKey === 'url' || nestedKey === 'alt')) {
                        acc[`${key}${nestedKey.charAt(0).toUpperCase() + nestedKey.slice(1)}`] = true;
                    } else if (key === 'address') {
                        acc[`${key}.${nestedKey}`] = true;
                    }
                });
            } else {
                acc[key] = true;
            }
            return acc;
        }, {});
        setTouched(allFieldsTouched);

        const isValid = validateForm();
        if (!isValid) {
            snackbar('Please correct the errors in the form.', 'error');
            return;
        }

        setIsLoader(true);
        try {
            const res = await fetch(`https://bcard-ojqa.onrender.com/cards`, {
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

    const handleBlur = ev => {
        const { id } = ev.target;
        let touchedId = id;
        if (id === 'imageUrl') touchedId = 'image.url';
        else if (id === 'imageAlt') touchedId = 'image.alt';
        else if (['state', 'country', 'city', 'street', 'houseNumber', 'zip'].includes(id)) touchedId = `address.${id}`;

        setTouched(prevTouched => ({
            ...prevTouched,
            [touchedId]: true,
        }));
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
                        <input
                            type="text"
                            id="title"
                            placeholder="Title *"
                            required
                            onChange={change}
                            onBlur={handleBlur}
                            value={form.title}
                        />
                        {touched.title && errors.title && <div className="error">{errors.title}</div>}
                    </div>

                    <div className="form-group">
                        <input type="text" id="subtitle" placeholder="Subtitle *" required onChange={change} onBlur={handleBlur} value={form.subtitle} />
                        {touched.subtitle && errors.subtitle && <div className="error">{errors.subtitle}</div>}
                    </div>

                    <div className="form-group">
                        <input type="text" id="description" placeholder="Description *" required onChange={change} onBlur={handleBlur} value={form.description} />
                        {touched.description && errors.description && <div className="error">{errors.description}</div>}
                    </div>

                    <div className="form-group">
                        <input type="tel" id="phone" placeholder="Phone *" required onChange={change} onBlur={handleBlur} value={form.phone} />
                        {touched.phone && errors.phone && <div className="error">{errors.phone}</div>}
                    </div>

                    <div className="form-group">
                        <input type="email" id="email" placeholder="Email *" required onChange={change} onBlur={handleBlur} value={form.email} />
                        <span className='emailNotRegistered'>* Check that the email is not used</span>
                        {touched.email && errors.email && <div className="error">{errors.email}</div>}
                    </div>

                    <div className="form-group">
                        <input type="url" id="web" placeholder="Web" onChange={change} onBlur={handleBlur} value={form.web} />
                        {touched.web && errors.web && <div className="error">{errors.web}</div>}
                    </div>

                    <div className="form-group">
                        <input type="url" id="imageUrl" placeholder="Image URL" onChange={change} onBlur={handleBlur} value={form.image.url} />
                        {touched['image.url'] && errors['image.url'] && <div className="error">{errors['image.url']}</div>}
                    </div>

                    <div className="form-group">
                        <input type="text" id="imageAlt" placeholder="Image Alt" onChange={change} onBlur={handleBlur} value={form.image.alt} />
                        {touched['image.alt'] && errors['image.alt'] && <div className="error">{errors['image.alt']}</div>}
                    </div>

                    <div className="form-group">
                        <input type="text" id="state" placeholder="State" onChange={change} onBlur={handleBlur} value={form.address.state} />
                        {touched['address.state'] && errors['address.state'] && <div className="error">{errors['address.state']}</div>}
                    </div>

                    <div className="form-group">
                        <input type="text" id="country" placeholder="Country *" required onChange={change} onBlur={handleBlur} value={form.address.country} />
                        {touched['address.country'] && errors['address.country'] && <div className="error">{errors['address.country']}</div>}
                    </div>

                    <div className="form-group">
                        <input type="text" id="city" placeholder="City *" required onChange={change} onBlur={handleBlur} value={form.address.city} />
                        {touched['address.city'] && errors['address.city'] && <div className="error">{errors['address.city']}</div>}
                    </div>

                    <div className="form-group">
                        <input type="text" id="street" placeholder="Street *" required onChange={change} onBlur={handleBlur} value={form.address.street} />
                        {touched['address.street'] && errors['address.street'] && <div className="error">{errors['address.street']}</div>}
                    </div>

                    <div className="form-group">
                        <input type="number" id="houseNumber" placeholder="House Number *" required onChange={change} onBlur={handleBlur} value={form.address.houseNumber} />
                        {touched['address.houseNumber'] && errors['address.houseNumber'] && <div className="error">{errors['address.houseNumber']}</div>}
                    </div>

                    <div className="form-group">
                        <input type="text" id="zip" placeholder="Zip" onChange={change} onBlur={handleBlur} value={form.address.zip} />
                        {touched['address.zip'] && errors['address.zip'] && <div className="error">{errors['address.zip']}</div>}
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