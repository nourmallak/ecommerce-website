import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import style from '../Login/login.module.css';
import axios from 'axios';
import * as yup from 'yup';
import { toast } from 'react-toastify';

export default function SendCode() {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const schema = yup.object({
        email: yup.string().required("Email is required").email("Enter a valid email"),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: sendCode,
        validationSchema: schema
    });

    async function sendCode() {
        try {
            const { data } = await axios.patch(`https://ecommerce-node4.onrender.com/auth/sendcode`, formik.values);
            if (data.message === 'success') {
                toast.success("Check Your Email Please!");
                navigate('/forgetpassword');
            }
        } catch (error) {
            const message = error.response?.data?.message || "An unexpected error occurred";
            setErrorMessage(message);
            toast.error(message);
        }
    }

    return (
        <div className={`${style.body}`}>
            <form className={`${style.form}`} onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="InputEmail1" className={`${style.label} form-label`}>Email</label>
                    <input
                        type="email"
                        className={`${style.input} input form-control`}
                        id="InputEmail1"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                </div>
                <button type="submit" className={`${style.btnn}`}>Submit</button>
            </form>
        </div>
    );
}

