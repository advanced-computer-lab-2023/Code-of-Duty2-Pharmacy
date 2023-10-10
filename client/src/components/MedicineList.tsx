import { useState } from "react";

import { Medicine } from "../types";
import EditMedicineForm from "./EditMedicineForm";

interface Props {
  medicines: Medicine[];
  medSales?: { [key: string]: number };
  onUpdated?: () => void;
  canEdit: boolean;
}

const MedicineList: React.FC<Props> = ({
  medicines,
  onUpdated,
  canEdit,
  medSales = {},
}) => {
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );

  const handleEditClick = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
  };

  const handleClose = () => {
    setSelectedMedicine(null);
  };

  return (
    <div>
      {medicines.length === 0 && <p>No medicines found.</p>}
      {medicines.map((medicine) => (
        <div key={medicine._id}>
          <h2>Name: {medicine.name}</h2>
          <img src={medicine.pictureUrl} alt={medicine.name} width="200" />
          <p>Description: {medicine.description}</p>
          <p>Price: {medicine.price}</p>
          <p>Quantity: {medicine.availableQuantity}</p>
          <p>Sales: {medSales[medicine._id] || 0}</p>
          {canEdit && (
            <button onClick={() => handleEditClick(medicine)}>Edit</button>
          )}
          {selectedMedicine && selectedMedicine._id === medicine._id && (
            <EditMedicineForm
              open={!!selectedMedicine}
              medicine={selectedMedicine}
              onClose={handleClose}
              onUpdated={onUpdated}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MedicineList;
