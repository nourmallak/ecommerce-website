import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Loader from "../../../component/loader/loader";
import style from '../Cart/cart.module.css'
export default function Cart() {
  const [cart, setCart] = useState([]);
  const [counter, setCounter] = useState(0);
  const [cartNum, setCartNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showCartMessage, setShowCartMessage] = useState(false); 
  const getCart = async () => {
    try {
      const token = localStorage.getItem('user token');
      console.log(token)
      const { data } = await axios.get(`https://ecommerce-node4.onrender.com/cart/`, {

        headers: {
          Authorization: `Tariq__${token}`
        }
      });

      console.log('suceess', data)
      setCounter(1);

      setCart(data.products);
      console.log(data.products)
      setCartNum(data.count);
      localStorage.setItem("cartNum", cartNum);
      console.log(cartNum);
      setShowCartMessage(true);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }
  useEffect(() => {
    getCart();
  }, [counter]);
  useEffect(() => {
    getCart();
  }, [cartNum]);
  const increaseQty = async (productId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("user token");
      await axios.patch(
        `https://ecommerce-node4.onrender.com/cart/incraseQuantity`,
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      setCounter((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to increase quantity:", error);
    } finally {
      setLoading(false);
    }

  }

  const decreaseQty = async (productId, quantity) => {
    if (quantity !== 1) {
      setLoading(true);
      try {
        const token = localStorage.getItem("user token");
         const {data} =await axios.patch(
          `https://ecommerce-node4.onrender.com/cart/decraseQuantity`,
          { productId },
          { headers: { Authorization: `Tariq__${token}` } }
        );
        setCounter((prev) => prev - 1);
      } catch (error) {
        console.error("Failed to decrease quantity:", error);
      } finally {
        setLoading(false);
      }
    }
  }
  const removeItem = async (productId) => {
    setLoading(true);
    const token = localStorage.getItem("user token");
    console.log('pid', productId);
    const { data } = await axios.patch(`https://ecommerce-node4.onrender.com/cart/removeItem`, { "productId": productId }, { headers: { Authorization: `Tariq__${token}` } });
    getCart();
    setLoading(false);
    toast.success("The product has been cansled successfully", {
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
  const ClearCart = async () => {
    setLoading(true);
    const token = localStorage.getItem("user token");
    const { data } = await axios.patch(`https://ecommerce-node4.onrender.com/cart/clear`, {}, { headers: { Authorization: `Tariq__${token}` } });
    getCart();
    setLoading(false);
    toast.success("remove all products successfully", {
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
  const total = (price, quantity) => {
    return price * quantity;
  }
  if (loading) {
    return <Loader />;
  }
  return (
    <>
    <div className={`${style.cart}`}>
      {cart.length?


        <div className={` container text-center`}>
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th className='col-sm-5' scope="col-lg-4">Item</th>
                  <th className='col-sm-1' scope="col">Price</th>
                  <th className='col-sm-3' scope="col">Quantity</th>
                  <th className='col-sm-1' scope="col">Total</th>
                  <th className='col-sm-2' scope="col">Remove Item</th>
                </tr>
              </thead>

              <tbody>
                {cart.length > 0 && cart?.map((product) =>
                (
                  <tr key={product._id}>
                    <td>
                      <div className="row align-items-center border">
                        <div className="col-lg-3 g-6 ml-5"><img src={product.details.mainImage.secure_url} width={100} /></div>
                        <div className="col-lg-9 g-6 ml-5"><span>{product.details.name}</span> </div>
                      </div>
                    </td>
                    <td> <span>{product.details.finalPrice}</span></td>
                    <td><button onClick={() => decreaseQty(product.productId, product.quantity)}>-</button>
                      <span>{product.quantity}</span>
                      <button onClick={() => increaseQty(product.productId)}>+</button></td>
                    <td><span>{total(product.details.finalPrice, product.quantity)}</span>
                    </td>
                    <td><button onClick={() => removeItem(product.productId)}>x</button></td>

                  </tr>
                )
                )}
              </tbody>
            </table>
            <button width='50px' onClick={ClearCart}> Remove All Items</button>
            <Link to='/order'>
              <button width='50px'> Create Order</button>
            </Link>

          </div>

        </div>
        : (showCartMessage?<h1>Your Cart is Empty</h1>:<Loader />)
      }
      </div>
    </>
  );
}