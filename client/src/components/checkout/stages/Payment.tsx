import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Wallet from "./payment/Wallet";
import CreditCard from "./payment/CreditCard";
import CashOnDelivery from "./payment/CashOnDelivery";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CashOnDeliveryIcon from "@mui/icons-material/LocalAtm";
import { useState } from "react";
import { Box, Tooltip } from "@mui/material";

export default function Payment() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (
    event: React.ChangeEvent<{}>,
    newTabIndex: number
  ) => {
    setTabIndex(newTabIndex);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {/* Cart Items here */}
          <Box>Cart Items here . . .</Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
            <Tab
              icon={
                <Tooltip title="Wallet">
                  <WalletIcon />
                </Tooltip>
              }
            />
            <Tab
              icon={
                <Tooltip title="Credit Card">
                  <CreditCardIcon />
                </Tooltip>
              }
            />
            <Tab
              icon={
                <Tooltip title="Cash on Delivery">
                  <CashOnDeliveryIcon />
                </Tooltip>
              }
            />
          </Tabs>

          <Box mt={2}>
            {tabIndex === 0 && <Wallet />}
            {tabIndex === 1 && <CreditCard />}
            {tabIndex === 2 && <CashOnDelivery />}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
