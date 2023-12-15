import { Box, Button, Modal, Typography } from "@mui/material";
import WalletComponent from "./Wallet";
import WalletPasswordInput from "../../../components/WalletPasswordInput";
import { UseMutationResult, UseQueryResult } from "react-query";
import { useState } from "react";
import { getErrorMessage } from "../../../utils/displayError";
import { Wallet } from "../../../types/Wallet";
import { useLocation } from "react-router-dom";
import { patientWalletRoute } from "../../../data/routes/patientRoutes";
import { pharmacistWalletRoute } from "../../../data/routes/pharmacistRoutes";

type ExistingWalletComponentProps = {
  getWalletDetailsQuery: UseQueryResult<Wallet, unknown>;
  validatePinMutation: UseMutationResult<void, unknown, string, unknown>;
};

const ExistingWalletComponent: React.FC<ExistingWalletComponentProps> = ({
  getWalletDetailsQuery,
  validatePinMutation
}) => {
  const [pinCodeDigits, setPinCodeDigits] = useState<Array<string>>(Array(5).fill(""));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validatePinMutation.mutate(pinCodeDigits?.concat().join(""));
  };

  if (getWalletDetailsQuery.isLoading) return <></>;

  const currentPageLocation = useLocation().pathname;
  return (
    <div>
      <Modal
        open={
          (currentPageLocation === patientWalletRoute.path || currentPageLocation === pharmacistWalletRoute.path) &&
          (getWalletDetailsQuery.isError || validatePinMutation.isError)
        }
        onClose={validatePinMutation.reset}
        sx={{ backgroundColor: "white" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "white"
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Enter your wallet's PIN code:
            </Typography>
            <WalletPasswordInput pinCodeDigits={pinCodeDigits} setPinCodeDigits={setPinCodeDigits} />
            {validatePinMutation.isError && (
              <Typography variant="body2" color="error">
                {getErrorMessage(validatePinMutation.error)}
              </Typography>
            )}
            <Button type="submit">Submit</Button>
          </form>
        </Box>
      </Modal>

      {getWalletDetailsQuery.isSuccess && (
        <div>
          <WalletComponent
            balance={getWalletDetailsQuery.data?.amount!}
            currency={getWalletDetailsQuery.data?.currency!}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button href="https://stripe.com">Recharge</Button>
          </Box>
        </div>
      )}
    </div>
  );
};

export default ExistingWalletComponent;
