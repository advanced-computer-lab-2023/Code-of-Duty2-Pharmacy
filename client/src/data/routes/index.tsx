import guestRoutes from "./guestRoutes";
import patientRoutes from "./patientRoutes";
import adminRoutes from "./adminRoutes";
import pharmacistRoutes from "./pharmacistRoutes";

export default guestRoutes
  .concat(patientRoutes)
  .concat(adminRoutes)
  .concat(pharmacistRoutes);
