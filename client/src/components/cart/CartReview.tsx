import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
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
  const [cartItems, setCartItems] = useState([]);

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
      <Typography component="h1" variant="h4" align="center">
        Review your cart
      </Typography>

      <List>
        {cartItems.map((item, index) => (
          <ListItem key={index}>
            <Card>
              <Grid container>
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.medicineId.pictureUrl}
                    alt={item.medicineId.name}
                  />
                </Grid>
                <Grid item xs={8}>
                  <CardContent>
                    <Typography variant="h5">{item.medicineId.name}</Typography>
                    <Typography variant="body1">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="body1">
                      Price: {item.medicineId.price}
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </ListItem>
        ))}
      </List>

      <Button
        onClick={() => {
          navigate(checkoutRoute.path);
        }}
        variant="outlined"
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default CartReview;
