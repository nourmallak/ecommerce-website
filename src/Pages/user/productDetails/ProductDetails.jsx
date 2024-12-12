import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import style from '../../user/Products/Products.module.css';
import detailsStyle from '../productDetails/details.module.css';
import { useFormik } from "formik";
import * as yup from 'yup';
import { Bounce, toast } from "react-toastify";

export default function ProductDetails() {
    const [product, setProduct] = useState({});
    const [reviews, setReviews] = useState({});
    const [productImages, setProductImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const { productId } = useParams();
    const navigate = useNavigate();

    async function getProductDetails() {
        try {
            const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products/${productId}`);
            setProduct(data.product);
            setReviews(data.product.reviews);
            console.log("rev:", reviews)
            setProductImages(data.product.subImages);
        } catch (error) {
            console.error("Failed to fetch product details:", error);
        }
    }

    const schema = yup.object({
        comment: yup.string().required("Comment is required"),
        rating: yup.number().required("Rating is required").min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
    });

    const formik = useFormik({
        initialValues: {
            comment: '',
            rating: ''
        },
        onSubmit: createComment,
        validationSchema: schema
    });

    async function createComment() {
        const token = localStorage.getItem("user token");
        try {
            const { data } = await axios.post(
                `https://ecommerce-node4.onrender.com/products/${productId}/review`,
                {
                    comment: formik.values.comment,
                    rating: formik.values.rating
                },
                { headers: { Authorization: `Tariq__${token}` } }
            );
            if (data.message === 'success') {
                toast.success("Comment submitted successfully!");
                getProductDetails();
            }
        } catch (error) {
            const message = error.response?.data?.message || "An unexpected error occurred";
            setErrorMessage(message);
            toast.error(message);
        }
    }

    useEffect(() => {
        getProductDetails();
    }, []);

    async function addToCart() {
        const token = localStorage.getItem("user token");
        try {
            await axios.post(`https://ecommerce-node4.onrender.com/cart`, { productId: productId }, { headers: { Authorization: `Tariq__${token}` } });
            toast.success("Product added to cart successfully!", {
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
        } catch (error) {
            console.error("Failed to add product to cart:", error);
            toast.error("This product is already in your cart.", {
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
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 g-3 ml-5">
                    {productImages.map((image) => <img className={`${detailsStyle.img}`} src={image.secure_url} key={image.public_id} alt="Product" />)}
                </div>
                <div className="col-lg-6 g-3 ml-5">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                </div>
                <button onClick={addToCart} className={`${detailsStyle.button}`}>Add to cart</button>
            </div>

            <div className={`${detailsStyle.reviews} col-lg-6 g-3 ml-5 mt-5`}>
                    <h3 className={`${detailsStyle.highlight}`}>Reviews</h3>
                    {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((review) => (
                            <div key={review._id} className="review">
                                <p><strong>User:</strong> {review.createdBy.userName}</p>
                                <p><strong>Comment:</strong> {review.comment}</p>
                                <p><strong>Rating:</strong> {review.rating}/5</p>
                                <hr />
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet for this product.</p>
                    )}
                </div>


            <div className={`${style.body} ${detailsStyle.reviews}`}>
                <fieldset>
                    <legend className={`${detailsStyle.highlight}`}>Add Comment </legend>
                <form className={`${style.form}`} onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="InputReview" className={`${style.label} form-label`}>Comment</label>
                        <input
                            type="text"
                            className={`${style.input} input form-control`}
                            id="InputReview"
                            name="comment"
                            value={formik.values.comment}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.comment && formik.errors.comment ? (
                            <div className="text-danger">{formik.errors.comment}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputRating" className={`${style.label} form-label`}>Rating</label>
                        <input
                            type="number"
                            className={`${style.input} input form-control`}
                            id="InputRating"
                            name="rating"
                            value={formik.values.rating}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.rating && formik.errors.rating ? (
                            <div className="text-danger">{formik.errors.rating}</div>
                        ) : null}
                    </div>

                    <button type="submit" className={`${detailsStyle.button}`}>Create Comment</button>
                </form>
                </fieldset>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </div>
        </div>
    );
}
