import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

export const AdminRouteWrapper = ({ children }) => {
    const adminId = localStorage.getItem('id');

    if (!adminId) {
        return <Navigate to="/admin/signIn" replace />;
    }

    return children;
};

AdminRouteWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export const ProtectedRoute = ({ children }) => {
    const isLoggedAdmin = localStorage.getItem("token");
    return isLoggedAdmin ? children : <Navigate to="admin/signIn" />;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};