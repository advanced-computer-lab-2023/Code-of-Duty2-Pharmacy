import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardMedia,
  useTheme,
  LinearProgress,
  Stack,
  TextField,
  Typography
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { checkoutRoute } from "../../data/routes/patientRoutes";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import config from "../../config/config";

const CartReview = () => {
  const theme = useTheme();
  const textFieldRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<any>([]);
  const [isEditable, setIsEditable] = useState(new Array(cartItems.length).fill(false));
  const [isLoading, setIsLoading] = useState(new Array(cartItems.length).fill(false));
  const [textFieldValue, setTextFieldValue] = useState(new Array(cartItems.length).fill(0));

  const [cartMedicineQuantites, setCartMedicineQuantites] = useState<any>({
    availableQuantities: []
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    updateTotalPrice();
  }, [cartItems]);

  useEffect(() => {
    fetchCartMedicineQuantities();
  }, []);

  useEffect(() => {
    setIsEditable(new Array(cartItems.length).fill(false));
  }, [cartItems]);
  useEffect(() => {
    setIsLoading(new Array(cartItems.length).fill(false));
  }, [cartItems]);
  useEffect(() => {
    setTextFieldValue(cartItems.map((item: any) => item.quantity));
  }, [cartItems]);

  useEffect(() => {
    if (focusedIndex !== null && textFieldRefs.current[focusedIndex] !== null) {
      textFieldRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/patients/me/cart`);
      const cartItems = response.data;

      setCartItems(cartItems);
    } catch (error) {
      console.error("Failed to fetch cart items", error);
    }
  };
  const fetchCartMedicineQuantities = async () => {
    // try dummy data
    // setCartMedicineQuantites([0, 1, 0, 4, 0]);

    try {
      const response = await axios.get(`${config.API_URL}/patients/me/cart-medicines-stock`);
      const availableQuantities = response.data;
      setCartMedicineQuantites(availableQuantities);
    } catch (error) {
      console.error("Failed to fetch cart medicine quantities", error);
      alert("Failed to fetch cart medicine quantities");
    }
  };

  const updateTotalPrice = () => {
    const total = cartItems.reduce((sum: number, item: any) => sum + item.medicineId.price * item.quantity, 0);
    setTotal(total);
  };

  const handleQuantityChange = async (index: number, newQuantity: number) => {
    if (newQuantity > 0) {
      var success = true;
      const medicineId = cartItems[index].medicineId._id;
      let newIsLoading = [...isLoading];
      newIsLoading[index] = true;
      setIsLoading(newIsLoading);
      try {
        await axios
          // "/me/cart/:itemId/change-quantity/:newQuantity",
          .patch(`${config.API_URL}/patients/me/cart/${medicineId}/change-quantity/${newQuantity}`)
          .catch((error) => {
            console.log(error);
            success = false;
            alert("Failed to change item quantity!");
          })
          .finally(() => {
            newIsLoading[index] = false;
            setIsLoading(newIsLoading);
            // let newIsEditable = [...isEditable];
            // newIsEditable[index] = !newIsEditable[index];
            // setIsEditable(newIsEditable);
          });

        if (success) {
          fetchCartItems();
          updateTotalPrice();
        }
      } catch (error) {
        console.log((error as any).response.data.message);
      }
    }
  };

  const handleDelete = async (index: number) => {
    let newIsLoading = [...isLoading];
    newIsLoading[index] = true;
    setIsLoading(newIsLoading);
    await axios
      .delete(`${config.API_URL}/patients/me/cart/${cartItems[index].medicineId._id}`)
      .catch((error) => {
        console.log(error);
        alert("Failed to delete item from cart!");
        return;
      })
      .finally(() => {
        newIsLoading[index] = false;
        setIsLoading(newIsLoading);
        return;
      });
    fetchCartItems();
    updateTotalPrice();
  };

  return (
    <>
      <Typography variant="h4" component="div" color="primary" ml="3%">
        Review your cart
      </Typography>

      <Box sx={{ p: "2%", ml: "1.25%" }}>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
          {cartItems.some(
            (item: { quantity: number }, index: number) =>
              item.quantity > cartMedicineQuantites.availableQuantities[index]
          ) && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Some items in your cart are currently unavailable due to limited stock. Please modify your cart
              accordingly.
            </Alert>
          )}

          <Box>
            {cartItems.length === 0 ? (
              <Typography>It looks like your cart is currently empty.</Typography>
            ) : (
              <Box>
                <Box sx={{ mb: "1%" }}>
                  <Typography variant="h4" fontSize="1.4rem" color="text.primary" gutterBottom>
                    Total ({cartItems.length} {cartItems.length > 1 ? "items" : "item"}){": "}
                    EGP {total.toFixed(2)}
                  </Typography>{" "}
                </Box>

                {cartItems.map((item: any, index: any) => (
                  <Card key={index} elevation={0}>
                    {isLoading[index] && <LinearProgress color="success" />}
                    {/* {isLoading[index] && <CircularProgress />} */}
                    {isLoading[index] && <br />}

                    {cartMedicineQuantites.availableQuantities[index] < item.quantity && (
                      <Alert severity="warning">
                        {cartMedicineQuantites[index] === 0
                          ? "This medicine is currently out of stock"
                          : `Stock has only ${cartMedicineQuantites.availableQuantities[index]} of this medicine`}
                      </Alert>
                    )}

                    {/* {isLoading[index] && <CircularProgress />} */}

                    <Box display="flex" p={1}>
                      <Box
                        sx={{
                          height: "5rem",
                          width: "5rem",
                          objectFit: "contain"
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            height: "100%",
                            objectFit: "contain"
                          }}
                          image={item.medicineId.pictureUrl}
                          alt={item.medicineId.name}
                        />
                      </Box>

                      <Box p={1}>
                        <Typography variant="body1" fontWeight={"bold"}>
                          {item.medicineId.name}
                        </Typography>

                        <Stack direction="row" spacing={2}>
                          <Typography variant="body1" color="text.secondary">
                            Qty
                          </Typography>

                          <TextField
                            type="number"
                            InputProps={{
                              size: "small",
                              inputProps: { min: 1 },
                              readOnly: !isEditable[index],
                              style: {
                                width: "30%"
                              }
                            }}
                            // value={item.quantity}
                            value={isEditable[index] ? textFieldValue[index] : item.quantity}
                            onChange={(e) => {
                              let newValue = Number(e.target.value);
                              if (newValue !== 0) {
                                let newTextFieldValue = [...textFieldValue];
                                newTextFieldValue[index] = newValue;
                                setTextFieldValue(newTextFieldValue);
                              }
                            }}
                            inputRef={(ref) => (textFieldRefs.current[index] = ref)}
                          />
                        </Stack>
                        <br />
                      </Box>

                      <Box
                        p={1}
                        ml="auto"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center"
                        }}
                      >
                        <Typography variant="body1" fontWeight={"bold"}>
                          EGP {(item.medicineId.price * item.quantity).toFixed(2)}
                        </Typography>

                        {item.quantity > 1 && (
                          <Typography variant="body2" color="text.secondary">
                            EGP {item.medicineId.price.toFixed(2)} each
                          </Typography>
                        )}

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Button
                            sx={{ mt: "4%" }}
                            color="error"
                            size="small"
                            variant="outlined"
                            onClick={() => handleDelete(index)}
                          >
                            Remove
                          </Button>

                          <Button
                            sx={{
                              color: isEditable[index]
                                ? theme.palette.common.white
                                : theme.palette.mode === "dark"
                                  ? theme.palette.common.white
                                  : theme.palette.common.black
                            }}
                            variant={isEditable[index] ? "contained" : "text"}
                            onClick={() => {
                              setTextFieldValue(cartItems.map((item: any) => item.quantity));
                              if (!isEditable[index]) {
                                setFocusedIndex(null);
                                setTimeout(() => setFocusedIndex(index), 0);
                              } else {
                                handleQuantityChange(index, textFieldValue[index]);
                              }
                              let newIsEditable = isEditable.map(() => false);
                              newIsEditable[index] = !newIsEditable[index];
                              setIsEditable(newIsEditable);
                            }}
                          >
                            {isEditable[index] ? "Confirm" : "Modify"}
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                ))}
              </Box>
            )}

            {cartItems.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 2
                }}
              >
                <Button
                  onClick={() => {
                    navigate(checkoutRoute.path);
                  }}
                  variant="outlined"
                  disabled={cartItems.some(
                    (item: { quantity: number }, index: number) =>
                      item.quantity > cartMedicineQuantites.availableQuantities[index]
                  )}
                  sx={{ mt: 2, pl: 15, pr: 15 }}
                >
                  Proceed to Checkout
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CartReview;
