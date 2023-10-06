import { Medicine } from "../types";

interface Props {
  medicines: Medicine[];
}

const MedicineList: React.FC<Props> = ({ medicines }) => (
  <div>
    {medicines.map((medicine) => (
      <div key={medicine._id}>
        <img src={medicine.pictureUrl} alt={medicine.name} />
        <h2>{medicine.name}</h2>
        <p>{medicine.description}</p>
        <p>{medicine.price}</p>
      </div>
    ))}
  </div>
);

export default MedicineList;
