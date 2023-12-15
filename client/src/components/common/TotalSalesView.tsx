import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import UserRole from "../../types/enums/UserRole";
import { Medicine, Order } from "../../types";
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
  CircularProgress
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface groupedMedicinesData {
  name: string;
  price: number;
  totalQuantitySold: number;
  totalPrice: number;
}
interface MedicineInOrder {
  name: string;
  id: string;
  price: number;
}
const SalesReport = () => {
  const [month, setMonth] = useState("");
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [searchedMedicine, setSearchedMedicine] = useState("");
  const [filteredMedicineNames, setFilteredMedicineNames] = useState<string[]>([]);

  const [orders, setOrders] = useState<Order[]>([]);
  const [medicinesInOrders, setMedicinesInOrders] = useState<MedicineInOrder[]>([]);
  const [medicineIndices, setMedicineIndices] = useState<Record<string, number>>({});
  const [tableData, setTableData] = useState<groupedMedicinesData[]>([]);
  const [tatalPrice, setTotalPrice] = useState<number>(0);
  const [checked, setChecked] = useState<boolean[]>([]);

  const [fechedMedicines, setFetchedMedicines] = useState(false);

  ///////////////////////////////////////// get all orders
  useEffect(() => {
    axios
      .get(`${config.API_URL}/${role}/orders`)
      .then((response) => {
        setOrders(response.data);
        // console.log("orders", response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders: ", error);
      });
  }, []);
  ///////////////////////////////////////// get all medicines in orders
  useEffect(() => {
    axios
      .get(`${config.API_URL}/${role}/medicines-in-orders`)
      .then((response) => {
        setMedicinesInOrders(response.data);
        setFilteredMedicineNames(response.data.map((medicine: MedicineInOrder) => medicine.name));
        setFetchedMedicines(true);
      })
      .catch((error) => {
        console.error("Error fetching sold medicines names: ", error);
      });
  }, []);
  ////////////////////////////////////////// get total sales
  useEffect(() => {
    axios
      .get(`${config.API_URL}/${role}/total-sales`)
      .then((response) => {
        setTableData(response.data);
        setTotalPrice(
          response.data.reduce((total: number, item: { totalPrice: number }) => total + item.totalPrice, 0)
        );
        // console.log("table data", response.data as groupedMedicinesData[]);
      })
      .catch((error) => {
        console.error("Error fetching grouped medicine data: ", error);
      });
  }, []);

  /////////////////////////////////////////// set the medicine indices
  useEffect(() => {
    const indices = medicinesInOrders.reduce((acc: Record<string, number>, medicine: MedicineInOrder, index) => {
      acc[medicine.name] = index;
      return acc;
    }, {});

    setMedicineIndices(indices);
  }, [medicinesInOrders]);
  // ////////////////////////// set checked array
  useEffect(() => {
    setChecked(new Array(medicinesInOrders.length).fill(true));
  }, [medicinesInOrders]);

  useEffect(() => {
    console.log("checked :", checked);
  }, [checked]);

  const { authState } = useContext(AuthContext);

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
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedMedicine(e.target.value);
    const filteredMedicineNames = medicinesInOrders
      .filter((medicine) => medicine.name.toLowerCase().includes(e.target.value.toLowerCase()))
      .map((medicine) => medicine.name);
    setFilteredMedicineNames(filteredMedicineNames);
    // console.log("checked after search", checked);
    // console.log("filtered medicine names", filteredMedicineNames);
  };

  const handleCheckboxChange = (index: number) => {
    const newChecked = [...checked];
    newChecked[index] = !checked[index];

    setChecked(newChecked);
    // console.log("checked after checkbox change", checked);
  };

  // get filtered orders using orders and medicinesInOrders , and filter using month, startDate, endDate ,
  return (
    // put a margin to the left
    <div style={{ padding: "2.0rem" }}>
      <h1>Sales Report</h1>
      <label>
        Month:
        <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
      </label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disableFuture
          label="start date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          slotProps={{
            textField: {
              fullWidth: true,
              margin: "normal"
              // helperText: dateOfBirthErrorMessage !== "" ? dateOfBirthErrorMessage : "",
              // error: dateOfBirthErrorMessage !== "" ? true : false
            }
          }}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disableFuture
          label="End date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          slotProps={{
            textField: {
              fullWidth: true,
              margin: "normal"
              // helperText: dateOfBirthErrorMessage !== "" ? dateOfBirthErrorMessage : "",
              // error: dateOfBirthErrorMessage !== "" ? true : false
            }
          }}
        />
      </LocalizationProvider>

      <TextField
        label="Search for a medicine"
        variant="outlined"
        value={searchedMedicine}
        onChange={handleSearchChange}
      />
      {!fechedMedicines ? (
        <div>
          <br />
          <br />
          <CircularProgress />
        </div>
      ) : (
        filteredMedicineNames.map((medicineName, index) => (
          <Box key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(checked[medicineIndices[medicineName]])}
                  name={medicineName}
                  onChange={() => handleCheckboxChange(medicineIndices[medicineName])}
                />
              }
              label={`${medicineName}`}
            />
          </Box>
        ))
      )}

      <hr />

      <h2>Orders for the chosen medicine and date:</h2>
      <TableContainer component={Paper} style={{ width: "50%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Price ($)</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">SubTotal</TableCell>
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
      </TableContainer>
      <h2>Total Sales: {tatalPrice}</h2>
    </div>
  );
};

export default SalesReport;
