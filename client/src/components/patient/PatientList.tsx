import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

import { Patient } from "../../types";
import axios from "axios";
import config from "../../config/config";

interface Props {
  canDelete: boolean;
}

const PatientList: React.FC<Props> = ({ canDelete }) => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetchPatients();
  }, []);

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

  return (
    <div>
      <h2>Patient Information</h2>
      {patients.map((patient) => (
        <div key={patient._id}>
          <p>
            <strong>Name:</strong> {patient.name}{" "}
            <span style={{ color: "grey" }}>{`(${patient.username})`}</span>
          </p>
          <p>
            <strong>Gender:</strong> {patient.gender}
          </p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            {new Date(patient.dateOfBirth).toLocaleDateString()}
          </p>
          <p>
            <strong>Email:</strong> {patient.email}
          </p>
          <p>
            <strong>Mobile Number:</strong> {patient.mobileNumber}
          </p>
          <p>
            <strong>Emergency Contact Name:</strong>{" "}
            {patient.emergencyContact.fullname}
          </p>
          <p>
            <strong>Emergency Contact Mobile Number:</strong>{" "}
            {patient.emergencyContact.mobileNumber}
          </p>
          <p>
            <strong>Emergency Contact Relation To Patient:</strong>{" "}
            {patient.emergencyContact.relationToPatient}
          </p>
          {canDelete && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => deletePatient(patient._id)}
            >
              Delete Patient
            </Button>
          )}
          <br></br>
          <br></br>
          <br></br>
        </div>
      ))}
    </div>
  );
};

export default PatientList;
