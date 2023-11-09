import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { checkoutRoute } from "../../data/routes/patientRoutes";

const CartReview = () => {
  const navigate = useNavigate();

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

      {/* Cart Items here */}
      <Box>Cart Items here . . .</Box>

      <Button
        onClick={() => {
          navigate(checkoutRoute.path);
        }}
        variant="contained"
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default CartReview;
