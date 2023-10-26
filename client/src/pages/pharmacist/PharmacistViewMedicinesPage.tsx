import MedicineList from "../../components/medicine/MedicineList";

const PharmacistViewMedicinesPage = () => {
  return (
    <MedicineList
      canEdit={true}
      canBuy={false}
      canViewSales={true}
      canViewQuantity={true}
    />
  );
};

export default PharmacistViewMedicinesPage;
