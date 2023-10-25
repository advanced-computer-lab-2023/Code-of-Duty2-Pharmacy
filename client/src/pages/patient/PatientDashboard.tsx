import { useEffect, useState } from "react";
import axios from "axios";

import config from "../../config/config";

import { MedicineUsages } from "../../data";
import MedicineList from "../../components/medicine/MedicineList";
import { Medicine } from "../../types";
import { NameSearchBar, goSearch } from "../../components/NameSearchBar";
import BasicTabs from "../../components/navigation/BasicTabs";

const PatientPage: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [usageFilter, setUsageFilter] = useState<string[]>([]);
  const [showMore, setShowMore] = useState(false);

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
      <BasicTabs tabNames={["View Medicines"]}>
        <div>
          <NameSearchBar
            searchCollection="medicines"
            onSearch={handleSearch}
            initialValue="(or leave empty for all)"
          />
          <MedicineList
            medicines={medicines}
            canBuy={true}
            canEdit={false}
            filterOptions={MedicineUsages}
            canViewSales={false}
            canViewQuantity={false}
            usageFilter={usageFilter}
            setUsageFilter={setUsageFilter}
            showMore={showMore}
            setShowMore={setShowMore}
          />
        </div>
      </BasicTabs>
    </div>
  );
};

export default PatientPage;
