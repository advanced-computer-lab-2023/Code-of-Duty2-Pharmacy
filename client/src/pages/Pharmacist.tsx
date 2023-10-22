import { useEffect, useState } from "react";
import axios from "axios";

import config from "../config/config";
import MedicineUsages from "../data/MedicineUsages";

import { Medicine } from "../types";
import MedicineList from "../components/MedicineList";
import AddMedicineForm from "../components/AddMedicineForm";
import { NameSearchBar, goSearch } from "../components/NameSearchBar";
import BasicTabs from "../components/BasicTabs";

const PharmacistPage: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [usageFilter, setUsageFilter] = useState<string[]>([]);
  const [medSales, setMedSales] = useState<{ [key: string]: number }>({});

  const loadSales = async () => {
    const response = await axios.get<{ [key: string]: number }>(
      `${config.API_URL}/medicines/sales`
    );
    setMedSales(response.data);
  };

  useEffect(() => {
    loadSales();
  }, []);

  useEffect(() => {
    fetchMedicines();
  }, []);

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

  const handleUpdated = () => {
    fetchMedicines();
  };

  const handleSearch = async (searchTerm: string, searchCollection: string) => {
    try {
      let responseData = await goSearch(searchTerm, searchCollection);

      console.log(responseData);
      setMedicines(responseData);
    } catch (err: any) {
      if (err.response?.status === 400) {
        console.log("Get All Meds");
        fetchMedicines();
        return;
      }
      if (err.response?.status === 404) {
        console.log("No Medicine with this name");
        setMedicines([]);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <h1>Pharmacist Dashboard</h1>
      <BasicTabs tabNames={["View Medicines", "Add Medicine"]}>
        {/* each child/component/tag is a tab */}
        <div>
          <NameSearchBar
            searchCollection="medicines"
            onSearch={handleSearch}
            initialValue="(or leave empty for all)"
          />
          <MedicineList
            medicines={medicines}
            onUpdated={handleUpdated}
            filterOptions={MedicineUsages}
            canBuy={false}
            canEdit={true}
            canViewSales={true}
            canViewQuantity={true}
            usageFilter={usageFilter}
            setUsageFilter={setUsageFilter}
            medSales={medSales}
          />
        </div>
        <div>
          <AddMedicineForm onMedicineAdded={fetchMedicines} />
        </div>
      </BasicTabs>
    </div>
  );
};

export default PharmacistPage;
