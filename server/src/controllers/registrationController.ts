
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import Patient from '../models/patients/Patient'; 
import PharmacistRegistrationRequest from '../models/pharmacist_registration_requests/PharmacistRegistrationRequest';

export const registerPatient = async (req: Request, res: Response) => {
  try {
    const { username, name, email, password, dateOfBirth, gender, mobileNumber, emergencyContact } = req.body;

    // must check user in the future not only patient <---------------------------------------------------
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new patient
    const newPatient = new Patient({
      username,
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      gender,
      mobileNumber,
      emergencyContact: {
        fullName: emergencyContact.fullName,
        mobileNumber: emergencyContact.mobileNumber,
        relation: emergencyContact.relation,
      },
    });

    // Save the patient to the database
    await newPatient.save();

    // Return a success response
    res.status(StatusCodes.CREATED).json({ message: 'Patient registered successfully' });
    alert("Registration successful");
    

  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
    
  }  

  // must then redirect to login

  
};

export const registerPharmacist = async (req: Request, res: Response) => {
  try {
    const { username, name, email, password, dateOfBirth, hourlyRate, affiliation, educationalBackground } = req.body;

    // Check if a pharmacist registration request already exists with the same email
    const existingRequest = await PharmacistRegistrationRequest.findOne({ email });
    if (existingRequest) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Registration request already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new pharmacist registration request
    const newRequest = new PharmacistRegistrationRequest({
      username,
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      hourlyRate,
      affiliation,
      educationalBackground,
    });

    // Save the pharmacist registration request to the database
    await newRequest.save();

    // Return a success response
    res.status(StatusCodes.CREATED).json({ message: 'Pharmacist registration request successful' });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
  }
};