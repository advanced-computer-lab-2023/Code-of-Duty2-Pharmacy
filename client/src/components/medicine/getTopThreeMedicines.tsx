import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config";
import { Paper, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

interface Medicine {
  medicineName: string;
  price: number;
  sales: number;
}

const TopMedicines = () => {
  const [topMedicines, setTopMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    const fetchTopMedicines = async () => {
      try {
        const response = await axios.get<Medicine[]>(`${config.API_URL}/medicines/top-three`);
        setTopMedicines(response.data);
      } catch (error) {
        console.error("Error fetching top medicines:", error as any);
      }
    };

    fetchTopMedicines();
  }, []);

  const pieChartData = topMedicines.map((medicine) => ({
    id: medicine.medicineName,
    value: medicine.sales,
    label: medicine.medicineName
  }));

  return (
    <Paper elevation={3} style={{ padding: "16px", margin: "16px", maxWidth: "600px" }}>
      <Typography align="center" variant="h6">
        Top Three Medicines Sales
      </Typography>
      <PieChart series={[{ data: pieChartData }]} width={600} height={200} />
    </Paper>
  );
};

export default TopMedicines;
