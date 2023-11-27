import ChangePassword from "../../components/common/ChangePassword";
import { adminDashboardRoute } from "../../data/routes/adminRoutes";

const AdminChangePasswordPage = () => {
    return (
        <ChangePassword dashBoardpath={adminDashboardRoute.path} />
    );
};

export default AdminChangePasswordPage;