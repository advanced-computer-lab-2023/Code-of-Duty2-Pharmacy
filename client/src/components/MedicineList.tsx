import { useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";

import { Medicine } from "../types";
import EditMedicineModal from "./EditMedicineModal";
import MedicineCard from "./MedicineCard";

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
      <h2 style={{ paddingLeft: "1rem" }}>Medicine Information</h2>
      <input
        type="text"
        value={usageFilter || ""}
        onChange={handleUsageFilterChange}
        placeholder="Filter by usage"
        style={{ width: "300px", height: "25px", padding: "1rem" }}
      />
      <br></br>
      <br></br>
      <br></br>

      {filteredMedicines.length === 0 && <p>No medicines found.</p>}
      {filteredMedicines.map((medicine) => (
        <div
          key={medicine._id}
          style={{ padding: "1rem", display: "inline-block" }}
        >
          <MedicineCard
            medicine={medicine}
            canEdit={canEdit}
            canViewSales={canViewSales}
            canViewQuantity={canViewQuantity}
            sales={medSales[medicine._id]}
            handleEditClick={handleEditClick}
          />

          {selectedMedicine && selectedMedicine._id === medicine._id && (
            <EditMedicineModal
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

// old list for reference

{
  /* <img
            src={medicine.pictureUrl}
            alt={medicine.name + " image"}
            height="120"
          />
          <br></br>
          <br></br>
          {canEdit && (
            <Button
              onClick={() => handleEditClick(medicine)}
              variant="outlined"
            >
              Edit
            </Button>
          )}
          <h3>{medicine.name}</h3>
          <p>
            <strong>Description:</strong> {medicine.description}
          </p>
          <p>
            <strong>Usages:</strong>
          </p>
          {medicine.usages &&
            medicine.usages.map((usage, index) => (
              <Chip label={usage} key={index} />
            ))}
          <p>
            <strong>Price:</strong> {medicine.price}
          </p>
          {canViewQuantity && (
            <p>
              <strong>Quantity:</strong> {medicine.availableQuantity}
            </p>
          )}
          {canViewSales && (
            <p>
              <strong>Sales:</strong> {medSales[medicine._id] || 0}
            </p>
          )}
          <br></br>
          <hr></hr>
          <br></br> */
}
