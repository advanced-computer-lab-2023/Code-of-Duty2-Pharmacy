import ChangePassword from "../../components/common/ChangePassword";
import { pharmacistDashboardRoute } from "../../data/routes/pharmacistRoutes";

const PharmacistChangePasswordPage = () => {
    return (
        <ChangePassword dashBoardpath={pharmacistDashboardRoute.path} />
    );
};

export default PharmacistChangePasswordPage;