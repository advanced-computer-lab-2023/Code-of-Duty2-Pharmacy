import generalRoutes from "./generalRoutes";
import guestRoutes from "./guestRoutes";
import adminRoutes from "./adminRoutes";
import pharmacistRoutes from "./pharmacistRoutes";
import patientRoutes from "./patientRoutes";
import loginRoutes from "./loginRoutes";

export default loginRoutes
  .concat(guestRoutes)
  .concat(patientRoutes)
  .concat(adminRoutes)
  .concat(pharmacistRoutes)
  .concat(generalRoutes);
