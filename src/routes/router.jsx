import { createBrowserRouter } from "react-router-dom";
import Products from "../Pages/user/Products/Products";
import Login from "../Pages/user/Login/Login";
import Register from "../Pages/user/Register/Register";
import Root from "../Root/Root";
import Home from "../Pages/user/Home/Home";
import SendCode from "../Pages/user/sendcode/SendCode";
import Categories from "../component/user/categories/Categories";
import ForgetPassword from "../Pages/user/forgetpassword/ForgetPassword";
import UserProfile from "../Pages/user/userProfile/UserProfile";
import Cart from "../Pages/user/Cart/Cart";
import CategoryDetails from "../Pages/user/categoryDetails/CategoryDetails";
import ProductDetails from "../Pages/user/productDetails/ProductDetails";
import Order from "../Pages/user/order/Order";
import MyOrder from "../Pages/user/myOrders/MyOrder";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/sendcode',
        element: <SendCode />
      },
      {
        path: '/forgetpassword',
        element: <ForgetPassword />
      },
      {
        path: '/products',
        element: <Products />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/categories',
        element: <Categories />
      },
      {
        path: '/profile',
        element: <UserProfile />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/categorydetails/:categoryId',
        element: <CategoryDetails/>
      },
      {
        path: '/productdetails/:productId',
        element: <ProductDetails />
      },
      {
        path: '/order',
        element: <Order/>
      },
      {
        path: '/myorder',
        element: <MyOrder/>
      }
    ]
  }
]);

export default router;
