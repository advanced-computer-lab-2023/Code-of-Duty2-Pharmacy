import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config";

import OrderCard from "./OrderCard";

interface Props {
  canViewStatus: boolean;
}

const OrderList: React.FC<Props> = ({ canViewStatus }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/patients/orders`);
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };
  return (
    <div>
      {orders.map((order, index) => (
        <OrderCard key={index} order={order} canViewStatus={canViewStatus} />
      ))}
    </div>
  );
};

export default OrderList;
