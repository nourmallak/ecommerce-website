import { useContext, useEffect, useState } from "react";
import style from "./Products.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../../../component/search/Search";
import Loader from "../../../component/loader/Loader";
import { UserContext } from "../../../context/Context";
import { useFormik } from "formik";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isSearching } = useContext(UserContext);
  const [showProductsMessage, setShowProductsMessage] = useState(false);

  const postsPerPage = 8;

  async function getProducts(page) {
    try {
      const { data } = await axios.get(
        `https://ecommerce-node4.onrender.com/products?page=${page}&limit=${postsPerPage}`
      );
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / postsPerPage));
      setShowProductsMessage(true);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  async function getFilteredProducts() {
    try {
      const { data } = await axios.get(
        `https://ecommerce-node4.onrender.com/products?sort=${formik.values.sort}`
      );
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / postsPerPage));
      console.log(data.products);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  }

  const formik = useFormik({
    initialValues: {
      sort: "",
    },
    onSubmit: getFilteredProducts
    },
  );

  useEffect(() => {
    if (!isSearching) {
      getProducts(currentPage);
    }
  }, [currentPage, isSearching]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container">
      <Search />

      <div className={`${style.filter} filters mb-4`}>
        <form onSubmit={formik.handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-md-3">
              <select
                className="form-select"
                name="sort"
                value={formik.values.sort}
                onChange={formik.handleChange}
              >
                <option value="">Sort By</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="-name">Name: Z to A</option>
              </select>
            </div>
            
            <div className="col-md-3">
              <button type="submit" className="btn btn-primary w-100">
                Apply Filters
              </button>
            </div>
          </div>
        </form>
      </div>

      {!isSearching && products.length === 0 ? (
        showProductsMessage ? (
          <h2>No Products</h2>
        ) : (
          <Loader />
        )
      ) : (
        <>
          {!isSearching && (
            <>
              <div className="row justify-content-center g-3">
                {products.map((product) => (
                  <div className="col-sm-3" key={product.id}>
                    <Link to={`/productdetails/${product.id}`}>
                      <div className={`${style.card} card h-100`}>
                        <img
                          src={product.mainImage.secure_url}
                          className={`${style.image} img-fluid card-img-top`}
                          alt="Product"
                        />
                        <div className="card-body">
                          <h5 className={`${style.title} card-title`}>
                            {product.name.split(" ").slice(0, 3).join(" ")}...
                          </h5>
                        </div>
                        <div className="card-footer">
                          <del className={`${style.deleted} text-muted`}>
                            <small>{product.price} ILS</small>
                          </del>
                          <small className={`${style.price}`}>
                            {product.finalPrice} ILS
                          </small>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <nav aria-label="Page navigation" className={`${style.control}`}>
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                  >
                    <button
                      className={`${style.next} page-link`}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>
                  <span className={`${style.span}`}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <li
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                  >
                    <button
                      className={`${style.next} page-link`}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </>
      )}
    </div>
  );
}
