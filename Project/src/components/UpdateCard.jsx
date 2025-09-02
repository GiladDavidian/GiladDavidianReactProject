import { useNavigate, useParams } from 'react-router-dom';
import './UpdateCard.css';
import { MyContext } from '../App';
import { useContext, useEffect, useRef, useState } from 'react';
import { updateCardSchema } from './UpdateCardSchema';

export default function UpdateCard() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const isFirstRender = useRef(true);
    const [errors, setErrors] = useState({});
    const { snackbar, setIsLoader, getCardsData } = useContext(MyContext);
    const { id } = useParams();
    const [formData, setFormData] = useState({
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
    })

    const validateForm = () => {
        const { error } = updateCardSchema.validate(formData, { abortEarly: false });
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

    const editCard = async (ev) => {
        ev.preventDefault();
        setIsLoader(true)

        const res = await fetch(`https://bcard-ojqa.onrender.com/cards/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            navigate('/');
            snackbar("Successfuly updated")
            getCardsData()
        } else {
            console.log(await res.text())
        }
        setIsLoader(false)
    }

    const handleChange = ev => {
        const { id, value } = ev.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const handleImageChange = ev => {
        const { id, value } = ev.target;
        const key = id === 'imageUrl' ? 'url' : 'alt';
        setFormData(prevFormData => ({
            ...prevFormData,
            image: {
                ...prevFormData.image,
                [key]: value,
            },
        }));
    };

    const handleAddressChange = ev => {
        const { id, value } = ev.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            address: {
                ...prevFormData.address,
                [id]: value,
            },
        }));
    };

    const getCard = async id => {
        setIsLoader(true);

        const res = await fetch(`https://bcard-ojqa.onrender.com/cards/${id}`);

        if (res.ok) {
            const data = await res.json();
            setFormData({
                title: data.title || '',
                subtitle: data.subtitle || '',
                description: data.description || '',
                phone: data.phone || '',
                email: data.email || '',
                web: data.web || '',
                image: {
                    url: data.image?.url || '',
                    alt: data.image?.alt || ''
                },
                address: {
                    state: data.address?.state || '',
                    country: data.address?.country || '',
                    city: data.address?.city || '',
                    street: data.address?.street || '',
                    houseNumber: data.address?.houseNumber || '',
                    zip: data.address?.zip || ''
                }
            });
        }

        setIsLoader(false);
    }

    const cancel = () => {
        navigate('/')
    }

    useEffect(() => {
        if (id) {
            getCard(id);
        }
    }, [id]);

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
    }, [formData]);

    return (
        <div className="update-card-container">
            <h2 className="form-title">EDIT CARD</h2>
            <form className="update-card-form" onSubmit={editCard}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="title">Title *</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                        {errors.title && <div className="error">{errors.title}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="subtitle">Subtitle *</label>
                        <input type="text" id="subtitle" name="subtitle" required value={formData.subtitle} onChange={handleChange} />
                        {errors.subtitle && <div className="error">{errors.subtitle}</div>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <input type="text" id="description" name="description" required value={formData.description} onChange={handleChange} />
                        {errors.description && <div className="error">{errors.description}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone *</label>
                        <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} />
                        {errors.phone && <div className="error">{errors.phone}</div>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="web">Web</label>
                        <input type="text" id="web" name="web" value={formData.web} onChange={handleChange} />
                        {errors.web && <div className="error">{errors.web}</div>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="imageUrl">Image url</label>
                        <input type="text" id="imageUrl" name="imageUrl" value={formData.image.url} onChange={handleImageChange} />
                        {errors['image.url'] && <div className="error">{errors['image.url']}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageAlt">Image alt</label>
                        <input type="text" id="imageAlt" name="imageAlt" value={formData.image.alt} onChange={handleImageChange} />
                        {errors['image.alt'] && <div className="error">{errors['image.alt']}</div>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="state">State *</label>
                        <input type="text" id="state" name="state" required value={formData.address.state} onChange={handleAddressChange} />
                        {errors['address.state'] && <div className="error">{errors['address.state']}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country *</label>
                        <input type="text" id="country" name="country" required value={formData.address.country} onChange={handleAddressChange} />
                        {errors['address.country'] && <div className="error">{errors['address.country']}</div>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="city">City *</label>
                        <input type="text" id="city" name="city" required value={formData.address.city} onChange={handleAddressChange} />
                        {errors['address.city'] && <div className="error">{errors['address.city']}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="street">Street *</label>
                        <input type="text" id="street" name="street" required value={formData.address.street} onChange={handleAddressChange} />
                        {errors['address.street'] && <div className="error">{errors['address.street']}</div>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="houseNumber">Housenumber *</label>
                        <input type="text" id="houseNumber" name="houseNumber" required value={formData.address.houseNumber} onChange={handleAddressChange} />
                        {errors['address.houseNumber'] && <div className="error">{errors['address.houseNumber']}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="zip">Zip</label>
                        <input type="text" id="zip" name="zip" value={formData.address.zip} onChange={handleAddressChange} />
                        {errors['address.zip'] && <div className="error">{errors['address.zip']}</div>}
                    </div>
                </div>
                <div className="form-actions">
                    <button type="button" className="cancel-button" onClick={cancel}>CANCEL</button>
                    <button type="submit" className="submit-button">SAVE</button>
                </div>
            </form>
        </div >
    )
}