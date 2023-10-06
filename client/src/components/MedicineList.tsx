import { useState } from "react";
import { Medicine } from "../types";
import EditMedicineForm from "./EditMedicineForm";

interface Props {
  medicines: Medicine[];
  onUpdated: () => void;
}

const MedicineList: React.FC<Props> = ({ medicines, onUpdated }) => {
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
      {medicines.map((medicine) => (
        <div key={medicine._id}>
          <img src={medicine.pictureUrl} alt={medicine.name} />
          <h2>Name: {medicine.name}</h2>
          <p>Description: {medicine.description}</p>
          <p>Price: {medicine.price}</p>
          <button onClick={() => handleEditClick(medicine)}>Edit</button>
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
