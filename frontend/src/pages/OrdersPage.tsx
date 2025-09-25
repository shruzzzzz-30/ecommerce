import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/AuthContext";
import { BASE_URL } from "../constants/baseUrl";
import toast from "react-hot-toast";
import type { IOrder } from "../types/Order";

const OrdersPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          const res = await fetch(`${BASE_URL}/orders`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();

          if (res.ok) {
            setOrders(data);
            return;
          }

          console.error(data);
          toast.error(data.message);
        } catch (error) {
          console.error(error);
          toast.error("Something wrong in the server! Please try again later", {
            duration: 3000,
          });
        }
      } else {
        setOrders([]);
      }
    })();
  }, [token]);

  return (
    <>
      {orders.length === 0 ? (
        <>
          <h2 className="head-title">You haven't placed <br /> any orders yet!</h2>
        </>
      ) : (
        <>
          <h2 className="head-title">Your Orders</h2>
          {orders.map((order, i) => (
            <div key={order._id} className="orders">
              <div className="order-card">
                <div className="order-header">Order #{i+1}</div>
                <div className="items">
                  {order.items.map((item) => (
                    <div key={item._id} className="item">
                      <img src={item.image} alt="item" />
                      <div className="item-info">
                        <div>{item.title}</div>
                        <small>Category: {item.category}</small>
                      </div>
                      <div>RS.{item.price} × {item.quantity}</div>
                    </div>
                  ))}
                </div>
                <div className="total">Total: RS.{order.total}</div>
                <div className="address">Shipping to: {order.address}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default OrdersPage;
