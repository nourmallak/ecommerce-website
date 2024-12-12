import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import style from '../Login/login.module.css';
import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ForgetPassword() {
    const [errorMessage, setErrorMessage] = useState("");  // Corrected destructuring syntax
    const navigate = useNavigate();

    const schema = yup.object({
        email: yup.string().required("Email is required").email("Enter a valid email"),
        password: yup.string().required("Password is required").min(5, "Password must be at least 5 characters"),
        code: yup.string().required("Code is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            code: ''
        },
        onSubmit: forgetPassword,
        validationSchema: schema
    });

    async function forgetPassword() {
        try {
            const { data } = await axios.patch(`https://ecommerce-node4.onrender.com/auth/forgotPassword`, formik.values);
            if (data.message === 'success') {
                toast.success("Password has been changed successfully");
                navigate('/login');
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
                        value={formik.email} 
                        onChange={formik.handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword" className={`${style.label} form-label`}>New Password</label>
                    <input
                        type="password"
                        className={`${style.input} input form-control`}
                        id="InputPassword"
                        name="password"
                        value={formik.password} 
                        onChange={formik.handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputCode" className={`${style.label} form-label`}>Code</label>
                    <input
                        type="text"
                        className={`${style.input} input form-control`}
                        id="InputCode"
                        name="code"
                        value={formik.code} 
                        onChange={formik.handleChange}
                    />
                </div>
                <button type="submit" className={`${style.btnn}`}>Submit</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}
