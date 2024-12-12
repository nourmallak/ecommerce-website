import { useFormik } from "formik";
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Bounce, toast } from 'react-toastify';

export default function Register() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const schema = yup.object({
        email: yup.string().required("Email is required").email("Invalid email format"),
        password: yup.string().required("Password is required").min(5, "Password must be at least 5 characters")
    });

    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            password: '',
            image: '',
        },
        validationSchema: schema,
        onSubmit: RegisterUser,
    });

    async function RegisterUser() {
        try {
            const { data } = await axios.post(`https://ecommerce-node4.onrender.com/auth/signup`, formik.values);
            if (data.message === 'success') {
                toast.success('Check Your Email Please!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });        }
    }

    return (
        <>
            <form className="container" onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">User Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="userName" 
                        name="userName" 
                        value={formik.values.userName} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.userName && formik.errors.userName ? (
                        <div className="text-danger">{formik.errors.userName}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="InputEmail" 
                        name="email" 
                        value={formik.values.email} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="InputPassword" 
                        name="password" 
                        value={formik.values.password} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-danger">{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="InputImage" className="form-label">Image</label>
                    <input 
                        type="file" 
                        className="form-control" 
                        id="InputImage" 
                        name="image" 
                        value={formik.image}
                        onChange={formik.handleChange}
                    />
                </div>
                {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </>
    );
}
