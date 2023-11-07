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

// -----------------------------------------

// // DUMMY DATA PATIENT

// import Pharmacist from './models/pharmacists/Pharmacist';

// // Create a new instance of the Pharmacist model
// let pharmacist = new Pharmacist({
//   username: 'tempUsername5',
//   password: 'tempPassword',
//   email: 'tempEmail5@example.com',
//   name: 'tempName5',
//   dateOfBirth: new Date('1990-01-01'),
//   gender: 'male',
//   mobileNumber: '1234567890',
//   hourlyRate: 150,
//   affiliation: 'tempAffiliation',
//   educationalBackground: 'tempEducationalBackground'
// });

// // Save the new pharmacist to the database
// pharmacist.save();
