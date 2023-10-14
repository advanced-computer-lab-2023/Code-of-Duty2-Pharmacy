import { useState } from "react";

import { Medicine } from "../types";
import EditMedicineForm from "./EditMedicineForm";

interface Props {
  medicines: Medicine[];
  medSales?: { [key: string]: number };
  onUpdated?: () => void;
  canEdit: boolean;
  canViewSales: boolean;
  canViewQuantity: boolean;
  usageFilter: string | null;
  setUsageFilter: React.Dispatch<React.SetStateAction<string | null>>;
}

const MedicineList: React.FC<Props> = ({
  medicines,
  onUpdated,
  canEdit,
  canViewSales,
  canViewQuantity,
  medSales = {},
  usageFilter,
  setUsageFilter,
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

  const handleUsageFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsageFilter(event.target.value);
  };

  const filteredMedicines = usageFilter
    ? medicines.filter((medicine) =>
        medicine.usages
          ? medicine.usages.some((usage) =>
              usage.toLowerCase().includes(usageFilter.toLowerCase())
            )
          : false
      )
    : medicines;

  return (
    <div>
      <h2>Medicine Information</h2>
      <input
        type="text"
        value={usageFilter || ""}
        onChange={handleUsageFilterChange}
        placeholder="Filter by usage"
        style={{ width: "300px", height: "25px" }}
      />
      {filteredMedicines.length === 0 && <p>No medicines found.</p>}
      {filteredMedicines.map((medicine) => (
        <div key={medicine._id}>
          <h3>Name: {medicine.name}</h3>
          <img src={medicine.pictureUrl} alt={medicine.name} width="200" />
          <p>Description: {medicine.description}</p>
          <p>Usages:</p>
          <ul>
            {medicine.usages &&
              medicine.usages.map((usage, index) => (
                <li key={index}>{usage}</li>
              ))}
          </ul>
          <p>Price: {medicine.price}</p>
          {canViewQuantity && <p>Quantity: {medicine.availableQuantity}</p>}
          {canViewSales && <p>Sales: {medSales[medicine._id] || 0}</p>}
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
