export const generateOTP = (): string => {
    return Math.floor(Math.pow(10, 6) + Math.random() * 9 * Math.pow(10, 6)).toString();
}
export const getOTPExpirationDate = (): Date => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 10); //time in minutes
    return date;
}