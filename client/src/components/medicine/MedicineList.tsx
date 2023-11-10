import { useState, useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import config from "../../config/config";

import { Medicine } from "../../types";
import { MedicineUsages } from "../../data/medicines";
import MedicineCard from "./MedicineCard";
import { NameSearchBar, goSearch } from "../../components/search/NameSearchBar";

interface Props {
  canEdit: boolean;
  canBuy: boolean;
  canViewSales: boolean;
  canViewQuantity: boolean;
}

const MedicineList: React.FC<Props> = ({
  canBuy,
  canEdit,
  canViewSales,
  canViewQuantity,
}) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [usageFilter, setUsageFilter] = useState<string[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [medSales, setMedSales] = useState<{ [key: string]: number }>({});

  const filterOptions = MedicineUsages;

  useEffect(() => {
    if (canViewSales) {
      loadSales();
    }
  }, [canViewSales]);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const loadSales = async () => {
    const response = await axios.get<{ [key: string]: number }>(
      `${config.API_URL}/medicines/sales`
    );
    setMedSales(response.data);
  };

  const fetchMedicines = async () => {
    try {
      const response = await axios.get<Medicine[]>(
        `${config.API_URL}/medicines`
      );
      setMedicines(response.data);
    } catch (err) {
      console.error("Error fetching medicines:", err);
    }
  };

  const handleSearch = async (searchTerm: string, searchCollection: string) => {
    try {
      let responseData = await goSearch(searchTerm, searchCollection);
      setMedicines(responseData);
    } catch (err: any) {
      if (err.response?.status === 400) {
        fetchMedicines();
        return;
      }
      if (err.response?.status === 404) {
        setMedicines([]);
      } else {
        console.log(err);
      }
    }
  };

  const handleShowMoreClick = () => {
    setShowMore(true);
  };

  const handleShowLessClick = () => {
    setShowMore(false);
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
    <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6">Filter by usages</Typography>

        {(showMore ? filterOptions : filterOptions.slice(0, 10)).map(
          (option) => (
            <Box marginBottom={-1} key={option}>
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
            </Box>
          )
        )}

        {!showMore && filterOptions.length > 10 && (
          <Button onClick={handleShowMoreClick} color="secondary">
            Show more
          </Button>
        )}

        {showMore && (
          <Button onClick={handleShowLessClick} color="secondary">
            Show less
          </Button>
        )}
      </Box>

      <Box>
        <NameSearchBar
          searchCollection="medicines"
          onSearch={handleSearch}
          initialValue="(or leave empty for all)"
        />
        {filteredMedicines.length === 0 && <p>No medicines found.</p>}
        <Box
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "start" }}
        >
          {filteredMedicines.map((medicine) => (
            <div
              key={medicine._id}
              style={{
                padding: "0rem",
                boxSizing: "border-box",
                marginRight: "1rem",
                marginBottom: "1rem",
              }}
            >
              <MedicineCard
                medicine={medicine}
                canBuy={canBuy}
                canEdit={canEdit}
                canViewSales={canViewSales}
                canViewQuantity={canViewQuantity}
                sales={medSales[medicine._id]}
              />
            </div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MedicineList;
