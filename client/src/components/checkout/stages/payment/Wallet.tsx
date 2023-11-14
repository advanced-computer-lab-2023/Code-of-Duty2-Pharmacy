import { AlertProps, Box, Button, Snackbar, Typography } from "@mui/material";
import {
  FormEvent,
  Ref,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "react";
import MuiAlert from "@mui/material/Alert";

import { CheckoutContext } from "../../Checkout";
import axios from "axios";
import config from "../../../../config/config";

function Alert(props: AlertProps, ref: Ref<any>) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
}

const AlertRef = forwardRef(Alert);

const Wallet = () => {
  const { handleNext, handleCreateOrder, total } = useContext(CheckoutContext);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [walletExists, setWalletExists] = useState<boolean | null>(null);

  useEffect(() => {
    const checkWalletExists = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/patients/wallets/exists`
        );
        setWalletExists(response.data.exists);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    checkWalletExists();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await handleCreateOrder(total + 0, "wallet"); // We assume 0 fee for wallet

      const walletResponse = await axios.patch(
        `${config.API_URL}/patients/wallet-transactions`,
        {
          transactionAmount: total + 0, // We assume 0 fee for wallet
        }
      );
      console.log(walletResponse.data.message);

      setIsProcessing(false);
      handleNext();
    } catch (error: any) {
      setIsProcessing(false);
      setOpenSnackbar(true);
      if (error.message) setMessage(error.message);
      else setMessage("An unexpected error occurred.");
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Pay via Wallet
      </Typography>
      <p>Experience the convenience of digital wallet payments.</p>
      <p>
        No need for cash or cards. Just place your order and pay using your
        El7a2ni digital wallet. Enjoy this modern and reliable method of
        payment.
      </p>

      {!walletExists && (
        <p>
          You currently don't have an El7a2ni Wallet. Please create one before
          attempting to pay via wallet.
        </p>
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={handleSubmit}
          variant="outlined"
          disabled={!walletExists || isProcessing}
          id="submit"
          sx={{ mt: 3, ml: 1 }}
        >
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <AlertRef onClose={() => setOpenSnackbar(false)} severity={"error"}>
          {message}
        </AlertRef>
      </Snackbar>
    </form>
  );
};

export default Wallet;
