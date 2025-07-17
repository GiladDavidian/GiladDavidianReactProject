import { useNavigate, useParams } from 'react-router-dom';
import './UpdateCard.css';
import { MyContext } from '../App';
import { useContext, useEffect, useState } from 'react';

export default function UpdateCard() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { snackbar, setIsLoader } = useContext(MyContext);
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

    const editCard = async (ev) => {
        ev.preventDefault();
        setIsLoader(true)

        const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            snackbar("Successfuly updated")
            navigate('/mycards');
        } else {
            console.log(await res.text())
        }
        setIsLoader(false)
    }

    const change = ev => {
        const { id, value } = ev.target;
        console.log(ev);

        setFormData({
            ...formData,
            [id]: value,
        });
    }

    const getCard = async id => {
        setIsLoader(true);

        const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`);

        if (res.ok) {
            const data = await res.json();
            delete data._id;
            delete data.image._id;
            delete data.address._id;
            delete data.likes;
            delete data.createdAt;
            delete data.__v;
            setFormData(data);
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

    return (
        <div className="update-card-container">
            <h2 className="form-title">EDIT CARD</h2>
            <form className="update-card-form" onSubmit={editCard}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="title">Title *</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={change} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subtitle">Subtitle *</label>
                        <input type="text" id="subtitle" name="subtitle" required value={formData.subtitle} onChange={change} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <input type="text" id="description" name="description" required value={formData.description} onChange={change} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone *</label>
                        <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={change} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input type="email" id="email" name="email" required value={formData.email} onChange={change} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="web">Web</label>
                        <input type="text" id="web" name="web" value={formData.web} onChange={change} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="imageUrl">Image url</label>
                        <input type="text" id="imageUrl" name="imageUrl" value={formData.image.url} onChange={change} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageAlt">Image alt</label>
                        <input type="text" id="imageAlt" name="imageAlt" value={formData.image.alt} onChange={change} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="state">State *</label>
                        <input type="text" id="state" name="state" required value={formData.address.state} onChange={change} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country *</label>
                        <input type="text" id="country" name="country" required value={formData.address.country} onChange={change} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="city">City *</label>
                        <input type="text" id="city" name="city" required value={formData.address.city} onChange={change} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="street">Street *</label>
                        <input type="text" id="street" name="street" required value={formData.address.street} onChange={change} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="housenumber">Housenumber *</label>
                        <input type="text" id="housenumber" name="housenumber" required value={formData.address.houseNumber} onChange={change} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zip">Zip</label>
                        <input type="text" id="zip" name="zip" value={formData.address.zip} onChange={change} />
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
