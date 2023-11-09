import {
  FC,
  FormEvent,
  useState,
  useContext,
  useEffect,
  ChangeEvent,
} from "react";
import {
  Box,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  IconButton,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { CheckoutContext } from "../Checkout";
import axios from "axios";
import config from "../../../config/config";

const Address: FC = () => {
  const { handleNext, setAddressData } = useContext(CheckoutContext);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [addressError, setAddressError] = useState("");

  useEffect(() => {
    const fetchAddresses = async () => {
      const response = await axios.get(`${config.API_URL}/patients/addresses`);
      setAddresses(response.data.deliveryAddresses);
    };

    fetchAddresses();
  }, []);

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedAddress((event.target as HTMLInputElement).value);
  };

  const handleAddAddress = async () => {
    if (!newAddress.trim()) {
      setAddressError("Address cannot be empty");
      return;
    }

    setAddressError("");

    try {
      const response = await axios.post(
        `${config.API_URL}/patients/addresses`,
        { address: newAddress }
      );
      setAddresses(response.data);
      setNewAddress("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setAddressData(selectedAddress);

    setIsProcessing(false);
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton color="success" onClick={handleAddAddress}>
          <AddCircleOutlineIcon />
        </IconButton>
        <TextField
          variant="standard"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddAddress();
            }
          }}
          placeholder="Add new delivery & billing address (city, zip code, street name, house number)"
          helperText={addressError}
          error={!!addressError}
          fullWidth
        />
      </Box>

      <Typography variant="h6" gutterBottom>
        My Addresses
      </Typography>

      {addresses.length > 0 ? (
        <Typography variant="body1" gutterBottom>
          Select a billing and delivery address.
        </Typography>
      ) : (
        <Typography variant="body1" gutterBottom>
          Please enter a new address above to proceed.
        </Typography>
      )}

      <FormControl component="fieldset">
        <RadioGroup value={selectedAddress} onChange={handleRadioChange}>
          {addresses &&
            addresses.map((address, index) => (
              <FormControlLabel
                key={index}
                value={address}
                control={<Radio />}
                label={address}
              />
            ))}
        </RadioGroup>
      </FormControl>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          disabled={isProcessing || !selectedAddress}
          id="submit"
          sx={{ mt: 3, ml: 1 }}
        >
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Continue"}
          </span>
        </Button>
      </Box>
    </form>
  );
};

export default Address;
