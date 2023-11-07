import MedicineList from "../../components/medicine/MedicineList";

const PatientViewMedicinesPage = () => {
  return (
    <MedicineList
      canEdit={false}
      canBuy={true}
      canViewSales={false}
      canViewQuantity={true}
    />
  );
};

export default PatientViewMedicinesPage;
