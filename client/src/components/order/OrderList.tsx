import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config";
import { CircularProgress, Typography, Paper, Box, Divider, Grid } from "@mui/material";
import { FaTruckMoving, FaBoxOpen } from "react-icons/fa";
import { styled } from "@mui/system";

import OrderCard from "./OrderCard";
import { Order } from "../../types";

const IconText = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "8px"
});

const Icon = styled("div")({
  marginTop: "10px"
});

const StyledDivider = styled(Divider)({
  margin: "30px 0"
});

interface Props {
  canViewStatus: boolean;
}

const OrderList: React.FC<Props> = ({ canViewStatus }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/patients/orders`);
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId: string) => {
    try {
      await axios.delete(`${config.API_URL}/patients/orders/${orderId}`);
      setOrders((orders) => orders.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error("Error cancelling order:", err);
    }
  };

  const successfulOrders = orders.filter((order) => order.orderStatus === "successful");
  const unsuccessfulOrders = orders.filter((order) => order.orderStatus !== "successful");

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : orders.length === 0 ? (
        <Box ml={5}>
          <Typography variant="h4" gutterBottom component="div" color="primary">
            No Orders
          </Typography>
          <Typography variant="body1" gutterBottom component="div" color="textSecondary">
            You have no ongoing or past orders.
          </Typography>
        </Box>
      ) : (
        <>
          {unsuccessfulOrders.length > 0 && (
            <Paper elevation={3} sx={{ margin: 2, padding: 2 }}>
              <Typography variant="h4" gutterBottom component="div" color="primary">
                <IconText>
                  <Icon>
                    <FaTruckMoving />
                  </Icon>{" "}
                  Current Orders
                </IconText>
              </Typography>
              <Grid container spacing={2}>
                {unsuccessfulOrders.map((order, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <OrderCard order={order} canViewStatus={canViewStatus} onCancel={cancelOrder} />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}

          <StyledDivider variant="middle" />

          {successfulOrders.length > 0 && (
            <Paper elevation={3} sx={{ margin: 2, padding: 2 }}>
              <Typography variant="h4" gutterBottom component="div" color="primary">
                <IconText>
                  <Icon>
                    <FaBoxOpen />
                  </Icon>{" "}
                  Past Orders
                </IconText>
              </Typography>
              <Grid container spacing={2}>
                {successfulOrders.map((order, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <OrderCard order={order} canViewStatus={canViewStatus} onCancel={cancelOrder} />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}
        </>
      )}
    </>
  );
};

export default OrderList;
