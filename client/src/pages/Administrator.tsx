import { useEffect, useState } from "react";
import axios from "axios";
import MedicineList from "../components/MedicineList";
import PatientList from "../components/PatientList";

import config from "../config/config";
import { Medicine, Patient } from "../types";
import { NameSearchBar, goSearch } from "../components/NameSearchBar";
import AddAdminForm from "../components/AddAdminForm";
import ViewRegistrationRequests from "../components/ViewRegistrationRequests";
import BasicTabs from "../components/BasicTabs";
import React from "react";
import PharmacistListModal from "../components/PharmacistListModal";
import Pharmacist from "../types/Pharmacist";

const AdministratorPage: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [usageFilter, setUsageFilter] = useState<string | null>(null);
  const [pharmacists, setPharmacists] = useState<Pharmacist[]>([]);

  useEffect(() => {
    fetchMedicines();
    fetchPatients();
    fetchPharmacists();
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

  const fetchPharmacists = async () => {
    try {
      const response = await goSearch("", "pharmacists", "username");
      setPharmacists(response);
      console.log("---------" + response);
    } catch (err) {
      console.error("Error fetching pharmacists:", err);
    }
  };
  const handlePharmacistSearch = async (
    searchTerm: string,
    searchCollection: string,
    attribute?: string
  ) => {
    try {
      let responseData = await goSearch(
        searchTerm,
        searchCollection,
        attribute
      );
      console.log("========" + responseData);
      setPharmacists(responseData);
    } catch (err: any) {
      if (err.response?.status === 400) {
        console.log("Get All Meds");
        fetchPharmacists();
        return;
      }
      if (err.response?.status === 404) {
        console.log("No Pharmacists with this name");
        setPharmacists([]);
      } else {
        console.log(err);
      }
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

  const deletePharmacist = async (id: string) => {
    try {
      await axios.delete(`${config.API_URL}/pharmacists/${id}`);
      fetchPharmacists();
    } catch (err) {
      console.error("Error deleting pharmacist:", err);
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
      <h1>Administrator Page</h1>
      <BasicTabs
        tabNames={[
          "Medicines",
          "Patients List",
          "Pharmacists List",
          "Pharmacists Registration Requests",
          "Add Admin Form",
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
            canViewSales={false}
            canViewQuantity={false}
            usageFilter={usageFilter}
            setUsageFilter={setUsageFilter}
          />
        </div>
        <PatientList
          patients={patients}
          canDelete={true}
          onDelete={deletePatient}
        />
        <div>
          <NameSearchBar
            searchCollection="pharmacists"
            onSearch={handlePharmacistSearch}
            attribute="username"
            initialValue="(or leave empty for all)"
          />
          <h3> OR </h3>
          <NameSearchBar
            searchCollection="pharmacists"
            attribute="email"
            onSearch={handlePharmacistSearch}
            initialValue="(or leave empty for all)"
          />
          <PharmacistListModal
            pharmacists={pharmacists}
            canDelete={true}
            onDelete={deletePharmacist}
          />
        </div>
        <ViewRegistrationRequests />
        <AddAdminForm />
      </BasicTabs>
    </div>
  );
};
export default AdministratorPage;
