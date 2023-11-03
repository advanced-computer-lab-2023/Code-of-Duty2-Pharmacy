/* Likely for all user types EXCEPT Admin */


export interface IUserBaseInfo {  
    username: string;
    name: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    gender: 'male' | 'female';
    mobileNumber: string;
    imageUrl?: string;
}