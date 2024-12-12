import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/Context";
import style from '../search/search.module.css'
import CardsStyle from '../../Pages/user/Products/Products.module.css'
import Loader from "../loader/loader";
export default function Search() {
  const [products, setProducts] = useState([]);
  const { isSearching, setIsSearching } = useContext(UserContext);
  const [showResultMessage, setShowResultMessage] = useState(false); 

  const formik = useFormik({
    initialValues: {
      word: "",
    },
    onSubmit: async () => {
      try {
        const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products?search=${formik.values.word}`);
        setProducts(data.products);
        setIsSearching(true);
        setShowResultMessage(true);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  });

  return (
    <>
   
      <form className={`${style.searchForm} d-flex justify-content-center`} role="search" onSubmit={formik.handleSubmit} >
        <input
          className={`${style.searchInput} form-control me-2`}
          type="search"
          placeholder="Search"
          aria-label="Search"
          name="word"
          value={formik.values.word}
          onChange={formik.handleChange}
        />
        <button className={`${style.button}`} type="submit">
          Search
        </button>
      </form>
      {isSearching && (
        <div className="container">
          {products.length?(
            <div className="row justify-content-center">
              {products.map((product) => (
                <div className="col-sm-3" key={product.id}>
                <Link to={`/productdetails/${product.id}`}>
                  <div className= {`${CardsStyle.card} card h-100`}>
                    <img src={product.mainImage.secure_url}
                      className={`${CardsStyle.image} img-fluid card-img-top`}
                      alt="Tis is product image" />
                    <div className="card-body">
                      <h5 className={`${CardsStyle.title} card-title`}>
                        {product.name.split(' ').slice(0, 3).join(' ')}...
                      </h5>
                    </div>
                    <div className="card-footer">
                      <del className={`${CardsStyle.deleted} text-muted`}>
                        <small>${product.price}</small>
                      </del>
                      <small className={`${CardsStyle.price}`}>${product.finalPrice}</small>
                    </div>
                  </div>
                </Link>
              </div>
               
              ))}
            </div>
          ):
            (showResultMessage?<h2 className={`${style.noProduct}`}>No products found...</h2>:<Loader/>)
            }
        </div>
      )}
    </>
  );
}
