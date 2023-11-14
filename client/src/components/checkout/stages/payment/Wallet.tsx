import {
  AlertProps,
  Box,
  Button,
  Card,
  CardContent,
  Snackbar,
  Typography,
} from "@mui/material";
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
  const [isCheckingWallet, setIsCheckingWallet] = useState<boolean>(true);
  const [walletExists, setWalletExists] = useState<boolean | null>(null);
  const [walletAmount, setWalletAmount] = useState<number>(0);

  useEffect(() => {
    const initializeWallet = async () => {
      const walletExists = await checkWalletExists();
      if (walletExists) {
        fetchWalletAmount();
      }
      setIsCheckingWallet(false);
    };

    initializeWallet();
  }, []);

  const checkWalletExists = async () => {
    try {
      const response = await axios.get(
        `${config.API_URL}/patients/wallets/exists`
      );
      setWalletExists(response.data.exists);
      return response.data.exists;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const fetchWalletAmount = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/patients/wallets`);
      setWalletAmount(response.data.amount);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await handleCreateOrder(total + 0, "wallet"); // We assume 0 fee for wallet

      await axios.patch(`${config.API_URL}/patients/wallet-transactions`, {
        transactionAmount: total + 0, // We assume 0 fee for wallet
      });

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

      {!walletExists && !isCheckingWallet && (
        <MuiAlert severity="error">
          You currently don't have an El7a2ni Wallet. Please create one before
          attempting to pay via wallet.
        </MuiAlert>
      )}

      {walletExists && !isCheckingWallet && (
        <Card sx={{ marginTop: 2, marginBottom: 2 }}>
          <CardContent>
            <Typography variant="body1">
              Current Wallet Balance:{" "}
              <strong>EGP {walletAmount.toFixed(2)}</strong>
            </Typography>
            <Typography variant="body1">
              Balance After Transaction:{" "}
              <strong>EGP {(walletAmount - total).toFixed(2)}</strong> (-EGP{" "}
              {total.toFixed(2)})
            </Typography>
          </CardContent>
        </Card>
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
