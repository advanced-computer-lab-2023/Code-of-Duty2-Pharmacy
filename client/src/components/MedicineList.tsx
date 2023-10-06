import { Medicine } from "../types";

interface Props {
  medicines: Medicine[];
}

const MedicineList: React.FC<Props> = ({ medicines }) => (
  <div>
    {medicines.map((medicine) => (
      <div key={medicine._id}>
        <img src={medicine.pictureUrl} alt={medicine.name} />
        <h2>Name: {medicine.name}</h2>
        <p>Description: {medicine.description}</p>
        <p>Price: {medicine.price}</p>
      </div>
    ))}
  </div>
);

export default MedicineList;
