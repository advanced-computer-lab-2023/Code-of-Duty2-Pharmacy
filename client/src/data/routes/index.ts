import generalRoutes from "./generalRoutes";
import guestRoutes from "./guestRoutes";
import adminRoutes from "./adminRoutes";
import pharmacistRoutes from "./pharmacistRoutes";
import patientRoutes from "./patientRoutes";
import loginRoutes from "./loginRoutes";
import doctorRoutes from "./doctorRoutes";

export default loginRoutes
  .concat(guestRoutes)
  .concat(patientRoutes)
  .concat(adminRoutes)
  .concat(pharmacistRoutes)
  .concat(doctorRoutes)
  .concat(generalRoutes);
