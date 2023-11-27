import ChangePassword from "../../components/common/ChangePassword";
import { patientDashboardRoute } from '../../data/routes/patientRoutes';

const PatientChangePasswordPage = () => {
    return (
        <ChangePassword dashBoardpath={patientDashboardRoute.path} />
    );
};

export default PatientChangePasswordPage;