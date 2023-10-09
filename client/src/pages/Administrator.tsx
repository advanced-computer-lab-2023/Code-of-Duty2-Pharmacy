import { useEffect, useState } from "react";
import axios from "axios";

import config from "../config/config";

import MedicineList from "../components/MedicineList";
import { Medicine } from "../types";
import NameSearchBar from "../components/NameSearchBar";

const AdministratorPage: React.FC = () => {
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

  const goSearch = async (searchTerm: string, searchCollection: string) => {
    // console.log("search");
    try {
      const response = await axios.get(
        `${config.API_URL}/${searchCollection}/search/?name=${searchTerm}`
      );
      console.log("searching for " + searchTerm + " in " + searchCollection);
      console.log(response.data);
      setMedicines(response.data);
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
      <h1>Administrator Page</h1>
      <NameSearchBar
        searchCollection="medicines"
        onSearch={goSearch}
        initialValue="(or leave empty for all)"
      />
      <MedicineList medicines={medicines} canEdit={false} />
    </div>
  );
};

export default AdministratorPage;
