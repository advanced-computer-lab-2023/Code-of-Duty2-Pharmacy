import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config";

import OrderCard from "./OrderCard";
import { Order } from "../../types";

interface Props {
  canViewStatus: boolean;
}

const OrderList: React.FC<Props> = ({ canViewStatus }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/patients/orders`);
      setOrders(response.data);
      console.log(response.data);
      console.log(response.data[0].medicines[2].medicineId.name);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };
  const cancelOrder = async (orderId: string) => {
    try {
      await axios.delete(`${config.API_URL}/patients/orders/${orderId}`);
      // Update the local state of orders
      setOrders((orders) => orders.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error("Error cancelling order:", err);
    }
  };

  return (
    <div>
      {orders.map((order, index) => (
        <OrderCard
          key={index}
          order={order}
          canViewStatus={canViewStatus}
          onCancel={cancelOrder}
        />
      ))}
    </div>
  );
};

export default OrderList;
