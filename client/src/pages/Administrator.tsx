import { useEffect, useState } from "react";
import axios from "axios";
import MedicineList from "../components/MedicineList";
import PatientList from "../components/PatientList";

import config from "../config/config";
import { Medicine, Patient } from "../types";
import { NameSearchBar, goSearch } from "../components/NameSearchBar";
import AddAdminByAdminForm from "../components/AddAdminByAdminForm";
import ViewRegistrationRequests from "../components/ViewRegistrationRequests";
import BasicTabs, { CustomTabPanel } from "../components/BasicTabs";
import React from "react";

const AdministratorPage: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [usageFilter, setUsageFilter] = useState<string | null>(null);

  useEffect(() => {
    fetchMedicines();
    fetchPatients();
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

  const fetchPatients = async () => {
    try {
      const response = await axios.get<Patient[]>(`${config.API_URL}/patients`);
      setPatients(response.data);
    } catch (err) {
      console.error("Error fetching patients:", err);
    }
  };

  const deletePatient = async (id: string) => {
    try {
      await axios.delete(`${config.API_URL}/patients/${id}`);
      fetchPatients();
    } catch (err) {
      console.error("Error deleting patient:", err);
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [value, setValue] = React.useState(0);

  return (
    <div>
      <h1>Administrator Page</h1>
      <BasicTabs
        tabNames={[
          "Medicines",
          "Patients List",
          "Add Admin Form",
          "Pharmacists Registration Requests",
        ]}
      >
        {/* each child/component/tag is a tab */}
        <div>
          <NameSearchBar
            searchCollection="medicines"
            onSearch={handleSearch}
            initialValue="(or leave empty for all)"
          />
          <MedicineList
            medicines={medicines}
            canEdit={false}
            usageFilter={usageFilter}
            setUsageFilter={setUsageFilter}
          />
        </div>
        <PatientList
          patients={patients}
          canDelete={true}
          onDelete={deletePatient}
        />
        <AddAdminByAdminForm />
        <ViewRegistrationRequests />
      </BasicTabs>
    </div>
  );
};
export default AdministratorPage;
