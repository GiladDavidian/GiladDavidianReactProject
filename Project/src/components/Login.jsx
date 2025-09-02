import { useContext, useEffect, useRef, useState } from "react"
import { MyContext } from "../App";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Joi from 'joi';
import './Login.css'

export default function Login() {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const isFirstRender = useRef(true);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { setIsLoader, snackbar, setUser } = useContext(MyContext);

    const schema = Joi.object({
        email: Joi.string().email({ tlds: false }).min(5).required(),
        password: Joi.string()
            .min(7)
            .max(20)
            .required()
            .pattern(
                /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*\-]).{7,20}$/
            )
            .messages({
                "string.pattern.base":
                    '"password" must contain at least one uppercase English letter, one lowercase English letter, one number, and one special character (!@#$%^&*-).',
                "string.empty": '"password" is required.',
                "string.min": '"password" must be at least 7 characters long.',
                "string.max": '"password" must be at most 20 characters long.',
            }),
    });

    const login = async ev => {
        ev.preventDefault();
        setIsLoader(true)

        const res = await fetch(`https://bcard-ojqa.onrender.com/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });

        if (res.ok) {
            const token = await res.text();
            const data = jwtDecode(token);
            localStorage.setItem('token', token)
            navigate('/');
            snackbar('You connected!');
            setUser(data);
        } else {
            snackbar('Erorr!');
        }
        setIsLoader(false)
    }

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const validation = schema.validate(form);
        const err = {};

        validation.error?.details.forEach(x => {
            err[x.context.key] = x.message;
        });

        setErrors(err);
    }, [form]);
    return (
        <>
            <h1 className="loginTitle">Login</h1>
            <hr className="loginHR" />
            <div className='containerForm'>
                <form className='myForm'>
                    <label className={errors.email ? 'errorField' : ''}>
                        Email:
                        <input type="email" className='inputEmail' onChange={ev => setForm({ ...form, email: ev.target.value })} />
                        {errors.email && <div className="error">{errors.email}</div>}
                    </label>

                    <label className={errors.password ? 'errorField' : ''}>
                        Password:
                        <input type="password" className='inputPassword' onChange={ev => setForm({ ...form, password: ev.target.value })} />
                        {errors.password && <div className="error">{errors.password}</div>}
                    </label>

                    <button className='btnLogin' onClick={login}>send</button>
                </form>
            </div>
        </>
    )
}
