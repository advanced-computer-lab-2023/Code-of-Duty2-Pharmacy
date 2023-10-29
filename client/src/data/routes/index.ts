import generalRoutes from "./generalRoutes";
import guestRoutes from "./guestRoutes";
import adminRoutes from "./adminRoutes";
import pharmacistRoutes from "./pharmacistRoutes";
import patientRoutes from "./patientRoutes";

export default guestRoutes
  .concat(patientRoutes)
  .concat(adminRoutes)
  .concat(pharmacistRoutes).concat(generalRoutes);
