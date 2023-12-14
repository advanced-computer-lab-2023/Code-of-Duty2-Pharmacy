import PharmacistDashboard from "../../pages/pharmacist/PharmacistDashboard";
import { Route } from "../../types";
import PharmacistViewMedicinesPage from "../../pages/pharmacist/PharmacistViewMedicinesPage";
import PharmacistAddMedicinePage from "../../pages/pharmacist/PharmacistAddMedicinePage";
import PharmacistAdditionalInfo from "../../pages/pharmacist/PharmacistAdditionalInfo";
import PharmacistChangePasswordPage from "../../pages/pharmacist/PharmacistChangePasswordPage";
import ChatPage from "../../pages/chat/ChatPage";
import ViewChat from "../../pages/chat/ViewChat";

export const pharmacistDashboardRoute: Route = {
  path: "/pharmacist/dashboard",
  element: <PharmacistDashboard />
};

export const viewMedicinesRoute: Route = {
  path: "/pharmacist/view-medicines",
  element: <PharmacistViewMedicinesPage />
};

export const addMedicineRoute: Route = {
  path: "/pharmacist/add-medicine",
  element: <PharmacistAddMedicinePage />
};

export const changePharmacistPasswordsRoute: Route = {
  path: "/pharmacist/change-password",
  element: <PharmacistChangePasswordPage />
};
export const PharmacistAdditionalInfoRoute: Route = {
  path: "/pharmacist/complete-additional-info",
  element: <PharmacistAdditionalInfo />
};
export const pharmacistChatPageRoute: Route = {
  path: "/pharmacist/chats",
  element: <ChatPage />
};
export const pharmacistChatViewRoute: Route = {
  path: "/pharmacist/current-chat",
  element: <ViewChat />
};

const pharmacistRoutes: Route[] = [
  pharmacistDashboardRoute,
  viewMedicinesRoute,
  addMedicineRoute,
  changePharmacistPasswordsRoute,
  PharmacistAdditionalInfoRoute,
  pharmacistChatPageRoute,
  pharmacistChatViewRoute
];

export default pharmacistRoutes;
