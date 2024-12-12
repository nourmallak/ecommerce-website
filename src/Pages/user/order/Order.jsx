import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import style from '../Login/login.module.css';
import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Order() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("user token");

  const schema = yup.object({
    address: yup.string().required("Address is required"),
    phone: yup.string().required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: {
      couponName: '',
      address: '',
      phone: ''
    },
    onSubmit: createOrder,
    validationSchema: schema
  });

  async function createOrder() {
    try {
      const { data } = await axios.post(`https://ecommerce-node4.onrender.com/order`,
        {
          "couponName": formik.values.couponName,
          "address": formik.values.address,
          "phone": formik.values.phone
        },
        { headers: { Authorization: `Tariq__${token}` } });
      if (data.message === 'success') {
        toast.success("Order has been done successfully");
        navigate('/cart');
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
          <label htmlFor="InputCouponName" className={`${style.label} form-label`}>Coupon Name</label>
          <input
            type="text"
            className={`${style.input} input form-control`}
            id="InputCouponName"
            name="couponName"
            value={formik.values.couponName}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputAddress" className={`${style.label} form-label`}>Address</label>
          <input
            type="text"
            className={`${style.input} input form-control`}
            id="InputAddress"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputPhone" className={`${style.label} form-label`}>Phone</label>
          <input
            type="text"
            className={`${style.input} input form-control`}
            id="InputPhone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
        </div>
        <button type="submit" className={`${style.btnn}`}>Submit</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
