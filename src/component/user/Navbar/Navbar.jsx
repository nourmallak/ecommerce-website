import { Link, useNavigate } from 'react-router-dom';
import style from './navbar.module.css';
import { useContext } from 'react';
import { useMyContext, UserContext } from '../../../context/Context';
export default function Navbar() {
    const { isLogin, setIsLogin } = useContext(UserContext);
    const navigate = useNavigate();
    const cartNum=localStorage.getItem("cartNum");
    function handleLogout() {
        localStorage.removeItem("user token");
        setIsLogin(false);
        navigate('/login');
    }
    return (
        <nav className={`${style.nav} navbar navbar-expand-lg`}>
            <div className="container">
                <a className={`${style.logo} navbar-brand`} href="#">Elegance Store</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/" aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/categories">Categories</Link>
                        </li>

                    </ul>
                    <div className="d-flex justify-content-center align-items-center">
                        {isLogin ? (
                            <div className="dropdown">
                                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src='../images/icons/profile.svg' width={20} alt="Profile Icon" />
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to='/profile'>My Profile</Link></li>
                                    <li><Link className="dropdown-item" onClick={handleLogout} >Logout</Link></li>
                                </ul>
                                <Link className="btn btn-secondary ms-3" to='/cart' role="button" aria-expanded="false">
                                    <img src='../images/icons/cart-shopping.svg' width={20} alt="Cart Icon" />
                                    <span  className={` ${style.cartCount} position-absolute top-0 start-100 translate-middle badge rounded-pill`}>{cartNum}</span>

                                </Link>
                            </div>
                        ) : (
                            <div className="d-flex">
                                <Link className={`${style.btnn} btn me-2`} type="button" to="/login"> Login</Link>
                                <Link className={`${style.btnn} btn me-2`} type="button" to="/register">Register</Link>
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}
