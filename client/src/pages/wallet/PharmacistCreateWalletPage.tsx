import CreateWalletForm from "../../features/wallets/wallet-creation/CreateWalletForm";

const PharmacistCreateWalletPage: React.FC = () => {
  return (
    <CreateWalletForm
      walletExistsRoute="/pharmacists/wallets/exists"
      userWalletPageLink="/pharmacist/wallet"
      createNewWalletRoute="/pharmacists/wallets"
    />
  );
};

export default PharmacistCreateWalletPage;
