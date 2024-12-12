import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from '../../user/Products/Products.module.css'
import Loader from "../../../component/loader/Loader";
export default function CategoryDetails() {
    const [products, setProducts] = useState([]);
    const { categoryId } = useParams();
    console.log(categoryId);
    async function getProducts() {
        try {
            const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products/category/${categoryId}`);
            setProducts(data.products);
            console.log(data)
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    }
    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <div className="container" >
                {products?.length == 0 ? (<Loader />) :
                    (<div className="row justify-content-center">
                        {
                            products?.map((product) => (
                                <div className="card col-lg-3 g-3 ml-5" key={product._id}>
                                    <Link to={`/productdetails/${product._id}`}>
                                        <img src={`${product.mainImage.secure_url}`} className={`${style.image} img-fluid card-img-top`} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className={`${style.title} card-title`}>{product.name}</h5>
                                        </div>
                                    </Link>
                                    <div className="card-footer">
                                        <del className={`${style.deleted} text-muted`}>
                                            <small>{product.price} ILS</small>
                                        </del>
                                        <small className={`${style.price}`}>
                                            {product.finalPrice} ILS
                                        </small>
                                    </div>
                                </div>
                            )
                            )
                        }
                    </div>)
                }
            </div>
        </>
    );
}