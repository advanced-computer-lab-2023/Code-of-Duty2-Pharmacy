import { useEffect, useState } from "react";
import axios from "axios";

import config from "../config/config";

import { Medicine } from "../types";
import MedicineList from "../components/MedicineList";
import AddMedicineForm from "../components/AddMedicineForm";
import { NameSearchBar, goSearch } from "../components/NameSearchBar";

const PharmacistPage: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);

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
      <h1>Pharmacist Page</h1>
      <NameSearchBar
        searchCollection="medicines"
        onSearch={handleSearch}
        initialValue="(or leave empty for all)"
      />
      <AddMedicineForm onMedicineAdded={fetchMedicines} />
      <MedicineList
        medicines={medicines}
        onUpdated={handleUpdated}
        canEdit={true}
      />
    </div>
  );
};

export default PharmacistPage;
