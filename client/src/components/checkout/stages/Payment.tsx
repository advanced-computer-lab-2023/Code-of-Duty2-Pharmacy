import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CashOnDeliveryIcon from "@mui/icons-material/LocalAtm";
import { useState, useContext } from "react";
import { Box, Card, CardMedia, Tooltip, Typography } from "@mui/material";

import Wallet from "./payment/Wallet";
import CreditCard from "./payment/CreditCard";
import CashOnDelivery from "./payment/CashOnDelivery";
import { CheckoutContext } from "../Checkout";
import { COD_FEE } from "../../../data/payment/cashOnDeliveryFee";

export default function Payment() {
  const [tabIndex, setTabIndex] = useState(0);
  const { cartItems, total } = useContext(CheckoutContext);

  const handleTabChange = (
    _event: React.ChangeEvent<{}>,
    newTabIndex: number
  ) => {
    setTabIndex(newTabIndex);
  };

  const codFee = tabIndex === 2 ? COD_FEE : 0;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ ml: 1, mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Pay El7a2ni LLC
            </Typography>

            <Typography variant="h4">
              EGP {(total + codFee).toFixed(2)}
            </Typography>

            {codFee > 0 && (
              <Typography variant="body2" color="text.secondary">
                Includes EGP {codFee.toFixed(2)} COD fee
              </Typography>
            )}
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
