import { useFormik } from "formik";
import axios from 'axios';
import * as yup from 'yup';
import style from './login.module.css';
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/Context";

export default function Login() {
    const navigate = useNavigate();
    const { setIsLogin, setUserData } = useContext(UserContext);

    const schema = yup.object({
        email: yup.string().required("Email is required").email("Invalid email format"),
        password: yup.string().required("Password is required").min(5, "Password must be at least 5 characters")
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: LoginUser,
        validationSchema: schema
    });

    async function LoginUser() {
        try {
            const { data } = await axios.post(`https://ecommerce-node4.onrender.com/auth/signin`, formik.values);
            if (data.message === 'success') {
                localStorage.setItem("user token", data.token);
                setIsLogin(true);
                const decoded = jwtDecode(data.token);
                console.log(decoded);
                setUserData(decoded);
                console.log("Navigating to home...");  // Add this line
                toast.success('Login successfully', {
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
                navigate('/');                  
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
                });
        }
    }

    return (
        <div className={style.body}>
            <form className={style.form} onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="InputEmail1" className={`${style.label} form-label`}>Email</label>
                    <input
                        type="email"
                        className={`${style.input} form-control`}
                        id="InputEmail1"
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
                    <label htmlFor="InputPassword" className={`${style.label} form-label`}>Password</label>
                    <input 
                        type="password"
                        className={`${style.input} form-control`}
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
                <div>
                    <Link to='/sendcode'>Forgot password?</Link>
                </div>
                <button type="submit" className={style.btnn}>Login</button>
            </form>
        </div>
    );
}

