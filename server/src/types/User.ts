import UserRole from "./enums/UserRole";
import VerificationStatus from "./enums/VerificationStatus";

export type User = {
  id: string;
  role: UserRole;
  verificationStatus?: VerificationStatus;
};
