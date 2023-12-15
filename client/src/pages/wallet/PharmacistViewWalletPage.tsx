import { Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import config from "../../config/config";
import { useMutation, useQuery } from "react-query";
import { getErrorMessage } from "../../utils/displayError";
import { doesUserHasAWallet } from "../../features/wallets/services/doesUserHasAWallet";
import WalletDoesNotExistComponent from "../../features/wallets/wallet-viewing/WalletDoesNotExistComponent";
import ExistingWalletComponent from "../../features/wallets/wallet-viewing/ExistingWalletComponent";
import { Wallet } from "../../types/Wallet";

async function validatePin(pinCode: string) {
  await axios.post(`${config.API_URL}/pharmacists/validate-wallet-pin-code`, {
    pinCode
  });
}
async function getWalletDetails(): Promise<Wallet> {
  const response = await axios.get(`${config.API_URL}/pharmacists/wallets`);
  return response.data;
}

const PharmacistViewWalletPage: React.FC = () => {
  const getWalletDetailsQuery = useQuery(["wallets"], getWalletDetails, {
    retry: 1
  });

  const validatePinMutation = useMutation(validatePin, {
    onSuccess: () => getWalletDetailsQuery.refetch()
  });

  const doesWalletExistsQuery = useQuery(["doesWalletExist"], doesUserHasAWallet("/pharmacists/wallets/exists"));

  const exists = doesWalletExistsQuery.data;

  if (doesWalletExistsQuery.isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <>
      {exists ? (
        <ExistingWalletComponent
          getWalletDetailsQuery={getWalletDetailsQuery}
          validatePinMutation={validatePinMutation}
        />
      ) : (
        <WalletDoesNotExistComponent walletCreationLink="/pharmacist/wallet/create" />
      )}
      {doesWalletExistsQuery.isError && (
        <Typography variant="body2" color="error">
          {getErrorMessage(doesWalletExistsQuery.error)}
        </Typography>
      )}
    </>
  );
};

export default PharmacistViewWalletPage;
