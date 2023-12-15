import UserRole from "./enums/UserRole";

export type LoginResponse = {
  accessToken: string;
  role: UserRole;
  info: {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
  } | null;
};
