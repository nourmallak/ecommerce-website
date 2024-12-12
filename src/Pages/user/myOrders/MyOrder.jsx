import axios from "axios";
import { useEffect, useState } from "react";
import style from '../myOrders/myOrders.module.css'
import Loader from "../../../component/loader/loader";
export default function MyOrder() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const getOrder = async () => {
    try {
      const token = localStorage.getItem('user token');
      console.log(token)
      const { data } = await axios.get(`https://ecommerce-node4.onrender.com/order`, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      setOrders(data.orders);
      console.log(data.orders);


    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }
  const cancleOrder = async (orderId) => {
      setLoading(true);
      try {
        const token = localStorage.getItem("user token");
        const {data} = await axios.patch(
          `https://ecommerce-node4.onrender.com/order/cancel/${orderId}`,
          { headers: { Authorization: `Tariq__${token}` } }
        );
        getOrder();
      } catch (error) {
        console.error("Failed to decrease quantity:", error);
      } finally {
        setLoading(false);
      }
    }
  
  useEffect(() => {
    getOrder();

  }, []);

  return (
    <>

<div className="container text-center">
  {orders.length > 0 ? orders.map((order, orderIndex) => (
    <div className={`${style.order}`} key={orderIndex}>
      <h2 className={`${style.title}`}>Order ({orderIndex+1})</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="col-sm-4" scope="col">Item</th>
            <th className="col-sm-2" scope="col">Quantity</th>
          </tr>
        </thead>

        <tbody>
          {order.products.length > 0 &&
            order.products.map((product) => (
              <tr key={product.productId._id}>
                <td>
                  <div className="row align-items-center border">
                    <div className="col-lg-3 g-6 ml-5">
                      <img
                        src={product.productId.mainImage.secure_url}
                        alt={product.productId.name}
                        width={100}
                      />
                    </div>
                    <div className="col-lg-9 g-6 ml-5">
                      <span>{product.productId.name}</span>
                    </div>
                  </div>
                </td>
                <td>{product.quantity}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <h4>Address : {order.address}</h4>
      <h4>Order Cost : {order.finalPrice}</h4>
      <h4>Payment Type : {order.paymentType}</h4>
      <h4>Created At : {order.createdAt}</h4>
      <button onClick={() => cancleOrder(order._id)}>Cancle Order</button>
    </div>
  )):<Loader/>}
</div>

    </>
  );
}