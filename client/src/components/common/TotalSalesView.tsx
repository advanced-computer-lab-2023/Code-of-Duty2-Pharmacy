import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import UserRole from "../../types/enums/UserRole";
import config from "../../config/config";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  FormControlLabel,
  Box,
  TextField,
  CircularProgress,
  Container,
  Stack,
  Button,
  Typography
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

interface tableData {
  name: string;
  price: number;
  totalQuantitySold: number;
  totalPrice: number;
}
interface OrderToReportData {
  medicines: Array<{ medicineName: string; medicinePrice: number; medicineQuantity: number }>;
  paidAmount: number;
  orderDate: Date;
}
const SalesReport = () => {
  const [month, setMonth] = useState<dayjs.Dayjs | null>(null);
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [searchedMedicine, setSearchedMedicine] = useState("");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const [orders, setOrders] = useState<OrderToReportData[]>([]);
  const [medicineNamessInOrders, setMedicinesInOrders] = useState<string[]>([]);
  const [filteredMedicineNamesByDates, setFilteredMedicineNamesByDates] = useState<string[]>([]);
  const [filteredMedicineNamesBySerachBar, setFilteredMedicineNamesBySerachBar] = useState<string[]>([]);

  const [tableData, setTableData] = useState<tableData[]>([]);
  const [tatalPrice, setTotalPrice] = useState<number>(0);

  const [fetchingOrders, setFechingOrders] = useState(true);

  ///////////////////////////////////////// get orders report data
  useEffect(() => {
    axios
      .get(`${config.API_URL}/${role}/orders-report-data`)
      .then((response) => {
        setOrders(response.data);
        setFechingOrders(false);
      })
      .catch((error) => {
        console.error("Error fetching orders: ", error);
      });
  }, []);
  ///////////////////////////////////////// extract medicine names
  useEffect(() => {
    const medicines = new Set<string>();
    orders.forEach((order) => {
      order.medicines.forEach((medicine) => {
        medicines.add(medicine.medicineName);
      });
    });
    setMedicinesInOrders(Array.from(medicines));
    setFilteredMedicineNamesBySerachBar(Array.from(medicines));
    // console.log("medicines names", Array.from(medicines));
  }, [orders]);
  /////////////////////////////////////////set checked
  useEffect(() => {
    setChecked(
      medicineNamessInOrders.reduce(
        (acc, medicineName) => {
          acc[medicineName] = true;
          return acc;
        },
        {} as Record<string, boolean>
      )
    );
  }, [medicineNamessInOrders]);
  ///////////////////////////////////////// set table data using the function groupData
  useEffect(() => {
    setTableData(groupData(filterOrders(orders)));
  }, [orders, month, startDate, endDate, checked]);

  ////////////////////////////////////////// set filteredMedicineNamesByDates based on month, startDate, endDate
  useEffect(() => {
    const filteredMedicineNames = Array.from(
      new Set(
        orders
          .filter((order) => {
            const orderDate = dayjs(order.orderDate);
            const orderMonth = orderDate.format("YYYY-MM");

            const monthMatch = !month || orderMonth === month.format("YYYY-MM");
            const startDateMatch = !startDate || orderDate.isSameOrAfter(dayjs(startDate).startOf("day"));
            const endDateMatch = !endDate || orderDate.isSameOrBefore(dayjs(endDate).endOf("day"));

            return monthMatch && startDateMatch && endDateMatch;
          })
          .flatMap((order) => order.medicines.map((medicine) => medicine.medicineName))
      )
    );
    console.log("filteredMedicineNames by date", filteredMedicineNames);
    setFilteredMedicineNamesByDates(filteredMedicineNames);
  }, [medicineNamessInOrders, month, startDate, endDate]);

  /////////////////////////////////////////// set filteredMedicineNamesBySerachBar based on filteredMedicineNamesByDates
  useEffect(() => {
    const filteredMedicineNames = filteredMedicineNamesByDates
      .filter((medicineName: string) => medicineName.toLowerCase().includes(searchedMedicine.toLowerCase()))
      .map((medicine) => medicine);
    setFilteredMedicineNamesBySerachBar(filteredMedicineNames);
  }, [filteredMedicineNamesByDates, searchedMedicine]);

  const { authState } = useContext(AuthContext);

  const handleCheckboxChange = (medicineName: string) => {
    setChecked({ ...checked, [medicineName]: !checked[medicineName] });
  };
  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = { ...checked };
    filteredMedicineNamesBySerachBar.forEach((medicineName) => {
      newChecked[medicineName] = e.target.checked;
    });
    setChecked(newChecked);
  };

  const getRole = () => {
    switch (authState.role) {
      case UserRole.PATIENT:
        return "patients";
      case UserRole.ADMIN:
        return "admins";
      case UserRole.PHARMACIST:
        return "pharmacists";
      default:
        return "";
    }
  };

  const role = getRole();

  function groupData(orders: OrderToReportData[]): tableData[] {
    let totalSales = 0;

    // First, flatten the array and map it to a simpler format
    const medicines = orders.flatMap((order) =>
      order.medicines.map((medicine) => ({
        name: medicine.medicineName,
        price: medicine.medicinePrice,
        quantity: medicine.medicineQuantity
      }))
    );

    // Then, group the medicines by name
    const grouped = medicines.reduce(
      (acc, medicine) => {
        if (!acc[medicine.name]) {
          acc[medicine.name] = {
            name: medicine.name,
            price: medicine.price,
            totalQuantitySold: 0,
            totalPrice: 0
          };
        }

        const totalPriceForThisMedicine = medicine.price * medicine.quantity;
        acc[medicine.name].totalQuantitySold += medicine.quantity;
        acc[medicine.name].totalPrice += totalPriceForThisMedicine;

        totalSales += totalPriceForThisMedicine;

        return acc;
      },
      {} as Record<string, tableData>
    );

    // Finally, return the grouped data as an array
    setTotalPrice(totalSales);
    return Object.values(grouped);
  }
  /// filter orders baesd on month, startDate, endDate and checked array
  function filterOrders(orders: OrderToReportData[]): OrderToReportData[] {
    const filteredOrders = orders
      .map((order) => {
        // Filter out unchecked medicines from each order
        const filteredMedicines = order.medicines.filter((medicine) => checked[medicine.medicineName]);

        return { ...order, medicines: filteredMedicines };
      })
      .filter((order) => {
        const orderDate = dayjs(order.orderDate);
        const orderMonth = orderDate.format("YYYY-MM");

        const monthMatch = !month || orderMonth === month.format("YYYY-MM");
        const startDateMatch = !startDate || orderDate.isSameOrAfter(dayjs(startDate).startOf("day"));
        const endDateMatch = !endDate || orderDate.isSameOrBefore(dayjs(endDate).endOf("day"));
        const medicineMatch = order.medicines.length > 0;

        return monthMatch && startDateMatch && endDateMatch && medicineMatch;
      });

    console.log("filteredOrders", filteredOrders);
    return filteredOrders;
  }
  if (fetchingOrders)
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
        <CircularProgress size={80} />
      </div>
    );

  return (
    <div>
      {/*/////////////////////////////////////////// father division*/}
      <h1 style={{ textAlign: "center" }}>Sales Report</h1>
      <Stack direction="row" spacing={2} style={{ padding: "2.0rem" }}>
        {/*/////////////////////////////////////////// left half division*/}
        {filteredMedicineNamesByDates.length > 0 ? (
          <Stack style={{ maxWidth: "17%" }}>
            <TextField
              label="Search for a medicine"
              variant="outlined"
              value={searchedMedicine}
              onChange={(e) => setSearchedMedicine(e.target.value)}
              fullWidth
            />

            {/* add a check box to select or deselect all medicines */}

            {filteredMedicineNamesBySerachBar.length > 0 ? (
              <FormControlLabel
                control={
                  <Checkbox checked={Object.values(checked).every((value) => value)} onChange={handleSelectAllChange} />
                }
                label="Select / Deselect All"
              />
            ) : (
              <Typography> No medicines matched your search text !</Typography>
            )}

            <br />
            {/*/////////////////// checkboxes division*/}
            <div>
              {filteredMedicineNamesBySerachBar.map((medicineName, index) => (
                <Box key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked[medicineName] !== undefined ? checked[medicineName] : true}
                        name={medicineName}
                        onChange={() => handleCheckboxChange(medicineName)}
                      />
                    }
                    label={`${medicineName}`}
                  />
                </Box>
              ))}
            </div>
          </Stack>
        ) : (
          <p style={{ maxWidth: "17%" }}>No medicines sold in the specified time peroid !</p>
        )}

        <hr />

        {/*////////////////////////////////////////////////////////////////////// table division */}
        <Container>
          <Stack direction={"row"} spacing={40}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack direction={"column"} spacing={1}>
                <DatePicker
                  disableFuture
                  label="filter by Month"
                  views={["month", "year"]}
                  value={month}
                  onChange={(newValue) => setMonth(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: "normal"
                    }
                  }}
                />
                <Button variant={month ? "contained" : "outlined"} onClick={() => setMonth(null)}>
                  Clear Month
                </Button>
              </Stack>

              <Stack direction={"row"} spacing={3}>
                <Stack direction={"column"} spacing={1}>
                  <DatePicker
                    disableFuture
                    label="filter by start date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: "normal"
                      }
                    }}
                  />
                  <Button variant={startDate ? "contained" : "outlined"} onClick={() => setStartDate(null)}>
                    Clear Start Date
                  </Button>
                </Stack>

                <Stack direction={"column"} spacing={1}>
                  <DatePicker
                    disableFuture
                    label="filter by End date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: "normal"
                      }
                    }}
                  />
                  <Button variant={endDate ? "contained" : "outlined"} onClick={() => setEndDate(null)}>
                    Clear End Date
                  </Button>
                </Stack>
              </Stack>
            </LocalizationProvider>
          </Stack>

          <div>
            <h2>Total Sales: {tatalPrice} $ </h2>

            <TableContainer component={Paper} style={{}}>
              {orders.length === 0 ? (
                <h2 style={{ textAlign: "center" }}>We didn't sell anything yet !</h2>
              ) : tableData.length === 0 ? (
                <h2 style={{ textAlign: "center" }}>No data matched your search parameters !</h2>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Price ($)</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {item.name}
                        </TableCell>
                        <TableCell align="right">{item.price}</TableCell>
                        <TableCell align="right">{item.totalQuantitySold}</TableCell>
                        <TableCell align="right">{item.totalPrice}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TableContainer>
          </div>
        </Container>
      </Stack>
    </div>
  );
};

export default SalesReport;
