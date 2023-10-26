import MedicineList from "../../components/medicine/MedicineList";

const AdminViewMedicinesPage = () => {
  return (
    <MedicineList
      canEdit={false}
      canBuy={false}
      canViewSales={true}
      canViewQuantity={true}
    />
  );
};

export default AdminViewMedicinesPage;
