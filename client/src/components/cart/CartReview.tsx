import { Box, Button, Card, CardMedia, List, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { checkoutRoute } from "../../data/routes/patientRoutes";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/config";

const CartReview = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<any>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCartItemsAndTotalPrice();
  }, []);

  const fetchCartItemsAndTotalPrice = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/patients/me/cart`);
      const cartItems = response.data;
      setCartItems(cartItems);

      const total = cartItems.reduce(
        (sum: number, item: any) => sum + item.medicineId.price * item.quantity,
        0
      );

      setTotal(total);
      return total;
    } catch (error) {
      console.error("Failed to fetch cart items", error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      gap="1rem"
      ml="10%"
    >
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Review your cart
      </Typography>

      <Box>
        {cartItems.length === 0 ? (
          <Typography>It looks like your cart is currently empty.</Typography>
        ) : (
          <Box>
            <Box sx={{ ml: 1, mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Here's what you're about to buy.
              </Typography>
              <Typography variant="h4">EGP {total.toFixed(2)}</Typography>
            </Box>
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
                      Qty {item.quantity}
                    </Typography>
                  </Box>

                  <Box p={1} ml="auto">
                    <Typography variant="body1" fontWeight={"bold"}>
                      EGP {(item.medicineId.price * item.quantity).toFixed(2)}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      EGP {item.medicineId.price.toFixed(2)} each
                    </Typography>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        )}

        <Button
          onClick={() => {
            navigate(checkoutRoute.path);
          }}
          variant="outlined"
          disabled={cartItems.length === 0}
          sx={{ mt: 7 }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default CartReview;
