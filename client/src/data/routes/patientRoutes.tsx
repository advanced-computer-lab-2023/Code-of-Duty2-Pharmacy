import PatientLayout from "../../layouts/PatientLayout";
import PatientDashboard from "../../pages/patient/PatientDashboard";
import PatientViewMedicinesPage from "../../pages/patient/PatientViewMedicinesPage";
import { Route } from "../../types";

export const patientDashboardRoute: Route = {
  path: "/patient/dashboard",
  component: (
    <PatientLayout>
      <PatientDashboard />
    </PatientLayout>
  ),
};

export const viewMedicinesRoute: Route = {
  path: "/patient/view-medicines",
  component: (
    <PatientLayout>
      <PatientViewMedicinesPage />
    </PatientLayout>
  ),
};

const patientRoutes: Route[] = [patientDashboardRoute, viewMedicinesRoute];

export default patientRoutes;
