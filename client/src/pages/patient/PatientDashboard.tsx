import { useState, useEffect } from "react";
import { Typography, Box, Button, Card, CardContent, Grid } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";
import config from "../../config/config";
import { To, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LockIcon from "@mui/icons-material/Lock";
import NotificationsIcon from "@mui/icons-material/Notifications";

// PatientDashboard Component
const PatientDashboard = () => {
  // State for current and past orders count
  const [currentOrdersCount, setCurrentOrdersCount] = useState(0);
  const [pastOrdersCount, setPastOrdersCount] = useState(0);

  // Hook for navigation
  const navigate = useNavigate();

  // Effect hook to fetch orders and update state
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/patients/orders`);
        const orders = response.data;

        // Filter orders based on status
        const pastOrders = orders.filter((order: { orderStatus: string }) => order.orderStatus === "successful");
        const currentOrders = orders.filter((order: { orderStatus: string }) => order.orderStatus !== "successful");

        // Update state with orders count
        setPastOrdersCount(pastOrders.length);
        setCurrentOrdersCount(currentOrders.length);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Function to navigate to different routes
  const navigateTo = (path: To) => {
    navigate(path);
  };

  // PieChart Data
  const pieChartData = {
    series: [
      {
        data: [
          { id: 0, value: currentOrdersCount, label: "Current Orders" },
          { id: 1, value: pastOrdersCount, label: "Past Orders" }
        ]
      }
    ]
  };

  return (
    <Box ml={"3%"} mt={2}>
      <Typography variant="h4" gutterBottom component="div" color="primary">
        Patient Dashboard
      </Typography>

      <Typography variant="subtitle1" gutterBottom component="div" color="primary">
        We're here to support your health journey every step of the way.
      </Typography>

      <Typography variant="body1" gutterBottom>
        Track your orders, manage your profile, and stay updated with your health regimen all in one place.
      </Typography>

      <Box mt={5} sx={{ display: "flex", justifyContent: "center" }}>
        <PieChart series={pieChartData.series} width={600} height={350} />
      </Box>
      <Typography variant="h6" mt={4} mb={2} color="primary">
        Quick Access
      </Typography>

      <Grid container spacing={4}>
        {/* Button for Review Cart */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Button fullWidth onClick={() => navigateTo("/patient/review-cart")} startIcon={<ShoppingCartIcon />}>
                Review Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Button for Change Password */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Button fullWidth onClick={() => navigateTo("/patient/change-password")} startIcon={<LockIcon />}>
                Change Password
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Button for Notifications */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Button
                fullWidth
                onClick={() => navigateTo("/patient/notification/view")}
                startIcon={<NotificationsIcon />}
              >
                Notifications
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientDashboard;
