import { Typography, Box, Card, CardContent, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../config/config";
// import { BarChart } from "@mui/x-charts/BarChart";
// import { PieChart } from "@mui/x-charts/PieChart";
// import { axisClasses } from "@mui/x-charts";

const PatientDashboard = () => {
  // const chartSetting = {
  //   yAxis: [
  //     {
  //       label: "Amount bought"
  //     }
  //   ],
  //   width: 500,
  //   height: 300
  // };
  // const dataset = [
  //   {
  //     Painkillers: 3,
  //     Antibiotics: 2,
  //     Vitamins: 1,
  //     Others: 2,
  //     month: "Oct"
  //   },
  //   {
  //     Painkillers: 2,
  //     Antibiotics: 3,
  //     Vitamins: 4,
  //     Others: 5,
  //     month: "Nov"
  //   },
  //   {
  //     Painkillers: 1,
  //     Antibiotics: 2,
  //     Vitamins: 3,
  //     Others: 4,
  //     month: "Dec"
  //   }
  // ];

  // const valueFormatter = (value: number) => `${value}`;

  return (
    <Box ml={"3%"}>
      <Typography variant="h4" gutterBottom component="div" color="primary">
        Patient Dashboard
      </Typography>

      <Typography variant="subtitle1" gutterBottom component="div" color="primary">
        We're here to support your health journey every step of the way.
      </Typography>

      {/* <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: "1", marginLeft: "20%", marginTop: "1%" }}>
          <LatestPrescriptionCard />
        </div>
      </div> */}

      {/* <Box mt={"2%"}>
        <Typography variant="h6" gutterBottom component="div" color="primary">
          Medicine Purchases
        </Typography>

        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            { dataKey: "Painkillers", label: "Painkillers", valueFormatter },
            { dataKey: "Antibiotics", label: "Antibiotics", valueFormatter },
            { dataKey: "Vitamins", label: "Vitamins", valueFormatter },
            { dataKey: "Others", label: "Others", valueFormatter }
          ]}
          {...chartSetting}
        />
      </Box>

      <Box>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: "series A" },
                { id: 1, value: 15, label: "series B" },
                { id: 2, value: 20, label: "series C" }
              ]
            }
          ]}
          width={400}
          height={200}
        />
      </Box> */}
    </Box>
  );
};

export default PatientDashboard;
