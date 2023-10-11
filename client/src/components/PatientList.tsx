import { Patient } from "../types";

interface Props {
  patients: Array<Patient>;
}

const PatientList: React.FC<Props> = ({ patients }) => {
 
  return (
    <div>
      <h2>Patient Information</h2>
      {patients.map((patient) => (
        <div >
          <p>Name: {patient.name}</p>
          <p>Email: {patient.email}</p>
          <p>Phone: {patient.mobileNumber}</p>
          <p>Emergency Contact Name: {patient.emergencyContact.fullname}</p>
          <p>Emergency Contact Mobile Number: {patient.emergencyContact.mobileNumber}</p>
          <p>Emergency Contact Relation To Patient: {patient.emergencyContact.relationToPatient}</p>
          {/* Display other basic information as needed */}
          <br></br>
        </div>
      ))}
    </div>
  );
};

export default PatientList;
