import {
  adminSidebarItems,
  patientSidebarItems,
  pharmacistSidebarItems,
} from "../data/sidebar";

function getRequiredSidebarItems(firstPath: string) {
  switch (firstPath) {
    case "patient":
      return patientSidebarItems;
    case "pharmacist":
      return pharmacistSidebarItems;
    case "admin":
      return adminSidebarItems;
    default:
      return [];
  }
}

export default getRequiredSidebarItems;
