import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { checkoutRoute } from "../../data/routes/patientRoutes";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/config";

const CartReview = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<any>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/patients/me/cart`);
        setCartItems(response.data);
      } catch (error) {
        console.error("Failed to fetch cart items", error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="1rem"
    >
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Review your cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>It looks like your cart is currently empty.</Typography>
      ) : (
        <List>
          {cartItems.map((item: any, index: any) => (
            <Card key={index} elevation={0}>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="flex-start"
                p={1}
              >
                <Box
                  sx={{
                    height: "5rem",
                    width: "5rem",
                    objectFit: "contain",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      objectFit: "contain",
                    }}
                    image={item.medicineId.pictureUrl}
                    alt={item.medicineId.name}
                  />
                </Box>

                <Box p={1}>
                  <Typography variant="body1" fontWeight={"bold"}>
                    {item.medicineId.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Quantity: {item.quantity}
                  </Typography>
                </Box>
                <Box p={1} ml="auto">
                  <Typography variant="body1" fontWeight={"bold"}>
                    EGP {item.medicineId.price}
                  </Typography>
                </Box>
              </Box>
            </Card>
          ))}
        </List>
      )}

      <Button
        onClick={() => {
          navigate(checkoutRoute.path);
        }}
        variant="outlined"
        disabled={cartItems.length === 0}
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default CartReview;
