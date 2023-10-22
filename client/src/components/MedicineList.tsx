import { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Typography,
  Grid,
  Button,
} from "@mui/material";

import { Medicine } from "../types";
import EditMedicineModal from "./EditMedicineModal";
import MedicineCard from "./MedicineCard";

interface Props {
  medicines: Medicine[];
  medSales?: { [key: string]: number };
  onUpdated?: () => void;
  canEdit: boolean;
  canBuy: boolean;
  canViewSales: boolean;
  canViewQuantity: boolean;
  usageFilter: string[];
  setUsageFilter: React.Dispatch<React.SetStateAction<string[]>>;
  filterOptions: string[];
}

const MedicineList: React.FC<Props> = ({
  medicines,
  onUpdated,
  canBuy,
  canEdit,
  canViewSales,
  canViewQuantity,
  usageFilter,
  setUsageFilter,
  medSales = {},
  filterOptions,
}) => {
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );
  const [showMore, setShowMore] = useState(false);

  const handleEditClick = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
  };

  const handleClose = () => {
    setSelectedMedicine(null);
  };

  const handleUsageFilterChange =
    (option: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setUsageFilter((prev) => [...prev, option]);
      } else {
        setUsageFilter((prev) => prev.filter((value) => value !== option));
      }
    };

  const filteredMedicines =
    usageFilter.length > 0
      ? medicines.filter((medicine) =>
          medicine.usages
            ? medicine.usages.some((usage) =>
                usageFilter.some((filter) =>
                  usage.toLowerCase().includes(filter.toLowerCase())
                )
              )
            : false
        )
      : medicines;

  return (
    <Grid container>
      <Grid sm={12} md={2}>
        <br />
        <Typography variant="h6" gutterBottom>
          Medicine Usages
        </Typography>
        {(showMore ? filterOptions : filterOptions.slice(0, 10)).map(
          (option) => (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={usageFilter.includes(option)}
                    onChange={handleUsageFilterChange(option)}
                    value={option}
                    size="small"
                  />
                }
                label={option}
              />
              <br />
            </>
          )
        )}
        {!showMore && filterOptions.length > 10 && (
          <Button onClick={() => setShowMore(true)} color="primary">
            Show more
          </Button>
        )}
      </Grid>
      <Grid
        item
        sm={12}
        md={10}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "start",
        }}
      >
        {filteredMedicines.length === 0 && <p>No medicines found.</p>}
        {filteredMedicines.map((medicine) => (
          <div
            key={medicine._id}
            style={{ padding: "0rem", boxSizing: "border-box" }}
          >
            <MedicineCard
              medicine={medicine}
              canBuy={canBuy}
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
      </Grid>
      {/*<Grid item sm={1}></Grid>*/}
    </Grid>
  );
};

export default MedicineList;
