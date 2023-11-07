import { IUserBaseInfo } from "../../users/interfaces/IUserBaseInfo";

export interface IPharmacistRegistrationRequest extends IUserBaseInfo {
  hourlyRate: number;
  affiliation: string;
  educationalBackground: string;
  status: "pending" | "accepted" | "rejected";
}
