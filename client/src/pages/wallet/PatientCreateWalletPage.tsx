import CreateWalletForm from "../../features/wallets/wallet-creation/CreateWalletForm";

const PatientCreateWalletPage: React.FC = () => {
  return (
    <CreateWalletForm
      walletExistsRoute="/patients/wallets/exists"
      userWalletPageLink="/patient/wallet"
      createNewWalletRoute="/patients/wallets"
    />
  );
};

export default PatientCreateWalletPage;
