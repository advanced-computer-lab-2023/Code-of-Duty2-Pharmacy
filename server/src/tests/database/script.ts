// import Medicine from "../../models/Medicine";

// Medicine.deleteMany({})
//   .then(() => console.log("All medicines deleted successfully"))
//   .catch((err: any) => console.log(err));

// Medicine.syncIndexes()
//   .then(() => console.log("Indexes synced successfully"))
//   .catch((err: any) => console.log(err));

// -----------------------------------------

// // DUMMY DATA MEDICINE

// import Medicine from './models/Medicine';

// const addMedicine = async () => {
//   const newMedicine = new Medicine({
//     name: 'Test Medicine',
//     activeIngredients: ['Ingredient 1', 'Ingredient 2'],
//     price: 10.99,
//     availableQuantity: 100,
//   });

//   try {
//     await newMedicine.save();
//     console.log('Medicine saved successfully');
//   } catch (error) {
//     console.error('Error saving medicine:', error);
//   }
// };

// addMedicine();