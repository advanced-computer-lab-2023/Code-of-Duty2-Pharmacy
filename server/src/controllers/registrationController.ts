
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import Patient from '../models/patients/Patient'; 
import PharmacistRegistrationRequest from '../models/pharmacist_registration_requests/PharmacistRegistrationRequest';
import Pharmacist from '../models/pharmacists/Pharmacist';

export const registerPatient = async (req: Request, res: Response) => {
  try {
    const { username, name, email, password, dateOfBirth, gender, mobileNumber, emergencyContact } = req.body;

    // TODO: Check for username duplication
    // in users collection.

    const existingUserName = await Patient.findOne({ username });
    if (existingUserName) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'username already exists' });
    }
    const existingMail = await Patient.findOne({ email });
    if (existingMail) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'email already exists' });
    }
    

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newPatient = new Patient({
      username,
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      gender,
      mobileNumber,
      emergencyContact: {
        fullname: emergencyContact.fullname,
        mobileNumber: emergencyContact.mobileNumber,
        relationToPatient: emergencyContact.relationToPatient,
      },
    });

    const savedPatient = await newPatient.save();
    res.status(StatusCodes.CREATED).json(savedPatient);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
  }  
};

export const registerPharmacist = async (req: Request, res: Response) => {
  try {
    const { username, name, email, password, dateOfBirth, hourlyRate, affiliation, educationalBackground } = req.body;

    // TODO: Check for username , email, phone number ,etc duplication <----------------------------------------------------
    // in users collection.

    const existingUserName = await PharmacistRegistrationRequest.findOne({ username });
    if (existingUserName) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'username already exists' });
    }
    const existingMail = await PharmacistRegistrationRequest.findOne({ email });
    if (existingMail) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'email already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

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

    const savedRegistrationRequest = await newRequest.save();
    res.status(StatusCodes.CREATED).json(savedRegistrationRequest);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
  }
};
export const acceptPharmacistRegistrationRequest = async (req: Request, res: Response) => {
  const request = await PharmacistRegistrationRequest.findOne({username: req.params.username});
  if(!request){
    return res.status(StatusCodes.NOT_FOUND).json({message: 'request not found'});
  }
  const newPharmacist = new Pharmacist({username: request.username, password: request.password, 
                                      email: request.email, name: request.name, dateOfBirth: request.dateOfBirth, 
                                      hourlyRate: request.hourlyRate, affiliation: request.affiliation, 
                                      educationalBackground: request.educationalBackground});
  const savedPharmacist = await newPharmacist.save();
  await PharmacistRegistrationRequest.findOneAndDelete({username: req.params.username});

  //TODO: send an email to the pharmacist with the acceptance message and ask them to complete their info


  // return the saved pharmacist
  return res.status(StatusCodes.OK).json(savedPharmacist);
};

export const rejectPharmacistRegistrationRequest = async (req: Request, res: Response) => {
  //delete the request from the database by username
  const deletedRequest = await PharmacistRegistrationRequest.findOneAndDelete({username: req.params.username});

  //TODO: send an email to the pharmacist with the reason of rejection


  // return the deleted request and deletion message
  res.status(StatusCodes.OK).json(deletedRequest);

};