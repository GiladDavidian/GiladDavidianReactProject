import { useContext, useEffect, useRef, useState } from 'react';
import { MyContext } from "../App";
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { signupSchema } from './SignupSchema';

export default function Signup() {
    const { setIsLoader, snackbar } = useContext(MyContext);
    const isFirstRender = useRef(true);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: {
            first: '',
            middle: '',
            last: ''
        },
        phone: '',
        email: '',
        password: '',
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
        },
        isBusiness: false
    });

    const change = ev => {
        const { name, value, type, checked } = ev.target;

        if (type === 'checkbox') {
            setForm(prevForm => ({
                ...prevForm,
                isBusiness: checked
            }));
            return;
        }

        const nameParts = name.split('.');

        setForm(prevForm => {
            let newForm = { ...prevForm };
            let currentLevel = newForm;

            for (let i = 0; i < nameParts.length - 1; i++) {
                if (!currentLevel[nameParts[i]] || typeof currentLevel[nameParts[i]] !== 'object') {
                    currentLevel[nameParts[i]] = {};
                }
                currentLevel[nameParts[i]] = { ...currentLevel[nameParts[i]] };
                currentLevel = currentLevel[nameParts[i]];
            }

            if (name === 'address.houseNumber') {
                currentLevel[nameParts[nameParts.length - 1]] = Number(value);
            } else {
                currentLevel[nameParts[nameParts.length - 1]] = value;
            }

            return newForm;
        });
    };

    const send = async ev => {
        setIsLoader(true);
        ev.preventDefault();

        const validationResult = signupSchema.validate(form, { abortEarly: false });
        if (validationResult.error) {
            const newErrors = {};
            validationResult.error.details.forEach(x => {
                let errorPath = x.path.join('.');
                newErrors[errorPath] = x.message;
            });
            setErrors(newErrors);
            snackbar('Please correct the form errors.');
            setIsLoader(false);
            return;
        }

        try {
            const res = await fetch('https://bcard-ojqa.onrender.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                const data = await res.json();
                console.log('Registration successful:', data);
                navigate('/login');
                snackbar('User successfully created!');
                setForm({
                    name: { first: '', middle: '', last: '' },
                    phone: '',
                    email: '',
                    password: '',
                    image: { url: '', alt: '' },
                    address: { state: '', country: '', city: '', street: '', houseNumber: '', zip: '' },
                    isBusiness: false
                });
                setErrors({});
            } else {
                const errorData = await res.json();
                console.error('Registration failed:', errorData);
                snackbar(errorData.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Network error during registration:', error);
            snackbar('Network error. Please check your connection.');
        } finally {
            setIsLoader(false);
        }
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const validation = signupSchema.validate(form, { abortEarly: false });
        const newErrors = {};

        if (validation.error) {
            validation.error.details.forEach(x => {
                let errorPath = x.path.join('.');
                newErrors[errorPath] = x.message;
            });
        }
        setErrors(newErrors);
    }, [form]);

    return (
        <>
            <div className="register-form-container">
                <h1 className="form-title">REGISTER</h1>

                <form className="register-form" onSubmit={send}>
                    <div className="form-row">
                        <div className="form-group">
                            <label className={errors['name.first'] ? 'errorField' : ''}>
                                <input type="text" id="name.first" name="name.first" placeholder="First name *" onChange={change} value={form.name.first} />
                                {errors['name.first'] && <div className="error">{errors['name.first']}</div>}
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <input type="text" id="name.middle" name="name.middle" placeholder="Middle name" onChange={change} value={form.name.middle} />
                            </label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className={errors['name.last'] ? 'errorField' : ''}>
                                <input type="text" id="name.last" name="name.last" placeholder="Last name *" onChange={change} value={form.name.last} />
                                {errors['name.last'] && <div className="error">{errors['name.last']}</div>}
                            </label>
                        </div>
                        <div className="form-group">
                            <label className={errors.phone ? 'errorField' : ''}>
                                <input type="tel" id="phone" name="phone" placeholder="Phone *" onChange={change} value={form.phone} />
                                {errors.phone && <div className="error">{errors.phone}</div>}
                            </label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className={errors.email ? 'errorField' : ''}>
                                <input type="email" id="email" name="email" placeholder="Email *" onChange={change} value={form.email} />
                                {errors.email && <div className="error">{errors.email}</div>}
                                <span className='emailNotRegistered'>* Check that the email is not registered</span>
                            </label>
                        </div>
                        <div className="form-group">
                            <label className={errors.password ? 'errorField' : ''}>
                                <input type="password" id="password" name="password" placeholder="Password *" onChange={change} value={form.password} />
                                {errors.password && <div className="error">{errors.password}</div>}
                            </label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className={errors['image.url'] ? 'errorField' : ''}>
                                <input type="url" id="image.url" name="image.url" placeholder="Image url" onChange={change} value={form.image.url} />
                                {errors['image.url'] && <div className="error">{errors['image.url']}</div>}
                            </label>
                        </div>
                        <div className="form-group">
                            <label className={errors['image.alt'] ? 'errorField' : ''}>
                                <input type="text" id="image.alt" name="image.alt" placeholder="Image alt" onChange={change} value={form.image.alt} />
                                {errors['image.alt'] && <div className="error">{errors['image.alt']}</div>}
                            </label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className={errors['address.state'] ? 'errorField' : ''}>
                                <input type="text" id="address.state" name="address.state" placeholder="State" onChange={change} value={form.address.state} />
                                {errors['address.state'] && <div className="error">{errors['address.state']}</div>}
                            </label>
                        </div>
                        <div className="form-group">
                            <label className={errors['address.country'] ? 'errorField' : ''}>
                                <input type="text" id="address.country" name="address.country" placeholder="Country *" onChange={change} value={form.address.country} />
                                {errors['address.country'] && <div className="error">{errors['address.country']}</div>}
                            </label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className={errors['address.city'] ? 'errorField' : ''}>
                                <input type="text" id="address.city" name="address.city" placeholder="City *" onChange={change} value={form.address.city} />
                                {errors['address.city'] && <div className="error">{errors['address.city']}</div>}
                            </label>
                        </div>
                        <div className="form-group">
                            <label className={errors['address.street'] ? 'errorField' : ''}>
                                <input type="text" id="address.street" name="address.street" placeholder="Street *" onChange={change} value={form.address.street} />
                                {errors['address.street'] && <div className="error">{errors['address.street']}</div>}
                            </label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className={errors['address.houseNumber'] ? 'errorField' : ''}>
                                <input type="text" id="address.houseNumber" name="address.houseNumber" placeholder="House number *" onChange={change} value={form.address.houseNumber} />
                                {errors['address.houseNumber'] && <div className="error">{errors['address.houseNumber']}</div>}
                            </label>
                        </div>
                        <div className="form-group">
                            <label className={errors['address.zip'] ? 'errorField' : ''}>
                                <input type="text" id="address.zip" name="address.zip" placeholder="Zip" onChange={change} value={form.address.zip} />
                                {errors['address.zip'] && <div className="error">{errors['address.zip']}</div>}
                            </label>
                        </div>
                    </div>

                    <div className="form-checkbox">
                        <input type="checkbox" id="signupAsBusiness" name="isBusiness" onChange={change} checked={form.isBusiness} />
                        <label className="signupAsBusiness" htmlFor="signupAsBusiness">Signup as business</label>
                    </div>
                    <div className="containerBtn">
                        <button className="btnForm" type="submit">send</button>
                    </div>
                </form>
            </div>
        </>
    );
}