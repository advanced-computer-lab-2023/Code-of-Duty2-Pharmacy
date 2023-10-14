import Button from "@mui/material/Button";

import { Patient } from "../types";

interface Props {
  patients: Patient[];
  onDelete: (id: string) => void;
  canDelete: boolean;
}

const PatientList: React.FC<Props> = ({ patients, onDelete, canDelete }) => {
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
            <strong>Emergency Contact Name:</strong>
            {patient.emergencyContact.fullname}
          </p>
          <p>
            <strong>Emergency Contact Mobile Number:</strong>
            {patient.emergencyContact.mobileNumber}
          </p>
          <p>
            <strong>Emergency Contact Relation To Patient:</strong>
            {patient.emergencyContact.relationToPatient}
          </p>
          {canDelete && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => onDelete(patient._id)}
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
