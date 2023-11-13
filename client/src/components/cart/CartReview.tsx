import {
  Box,
  Button,
  Card,
  CardMedia,
  TextField,
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
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    handleTotalPrice();
  }, [cartItems]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/patients/me/cart`);
      const cartItems = response.data;
      setCartItems(cartItems);
    } catch (error) {
      console.error("Failed to fetch cart items", error);
    }
  };
  const handleTotalPrice = () => {
    const total = cartItems.reduce(
      (sum: number, item: any) => sum + item.medicineId.price * item.quantity,
      0
    );
    setTotal(total);
  };
  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity > 0) {
      try {
        // const response = axios.patch(
        //   `${config.API_URL}/patients/me/cart/${cartItems[index]._id}`,
        //   {
        //     quantity: newQuantity,
        //   }
        // );
        fetchCartItems();
        handleTotalPrice();
      } catch (error) {
        console.log((error as any).response.data.message);
      }
    }
  };

  const handleDelete = async (index: number) => {
    // console.log("----------------------------------------------------------------" );
    // console.log("cartItems[index]._id  : ", cartItems[index]._id );
    // console.log("cartItems[index].medicineId: ", cartItems[index].medicineId);
    // console.log("cartItems[index].medicineId._id: ", cartItems[index].medicineId._id);
    // console.log("cartItems[index].medicineId.name: ", cartItems[index].medicineId.name);
    // console.log("index of item to be deleted : ", index);
    await axios
      .delete(
        `${config.API_URL}/patients/me/cart/${cartItems[index].medicineId._id}`
      )
      .catch((error) => {
        console.log(error);
        alert("Failed to delete item from cart ! ");
      });
    fetchCartItems();
    handleTotalPrice();
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
              <Typography variant="h5">
                Subtotal ({cartItems.length}{" "}
                {cartItems.length > 1 ? "items" : "item"}){" : "}
                <Typography variant="h5" component="span" fontWeight="bold">
                  EGP {total.toFixed(2)}
                </Typography>
              </Typography>{" "}
            </Box>
            <hr />
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
                        height: "100%",
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
                    <Box display="flex" alignItems="center">
                      <Typography variant="body1" color="text.secondary">
                        {"Qty "}
                      </Typography>
                      <TextField
                        type="number"
                        InputProps={{
                          inputProps: { min: 1 },
                          style: {
                            width: "30%",
                            height: "5vh",
                            marginLeft: "10px",
                          },
                        }}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(index, Number(e.target.value))
                        }
                      />
                    </Box>
                    <br />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(index)}
                      size="small"
                    >
                      remove item
                    </Button>
                  </Box>

                  <Box p={1} ml="auto">
                    <Typography variant="body1" fontWeight={"bold"}>
                      EGP {(item.medicineId.price * item.quantity).toFixed(2)}
                    </Typography>

                    {item.quantity > 1 && (
                      <Typography variant="body2" color="text.secondary">
                        EGP {item.medicineId.price.toFixed(2)} each
                      </Typography>
                    )}
                  </Box>
                </Box>
                <hr />
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
          sx={{ mt: 5 }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Box>

    // add new line
  );
};

export default CartReview;
