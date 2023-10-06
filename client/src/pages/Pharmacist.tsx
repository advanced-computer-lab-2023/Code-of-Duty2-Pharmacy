import { useEffect, useState } from "react";
import axios from "axios";

import config from "../config/config";

import { Medicine } from "../types";
import MedicineList from "../components/MedicineList";
import AddMedicineForm from "../components/AddMedicineForm";

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

  return (
    <div>
      <h1>Pharmacist Page</h1>
      <MedicineList medicines={medicines} onUpdated={handleUpdated} />
      <AddMedicineForm />
    </div>
  );
};

export default PharmacistPage;
