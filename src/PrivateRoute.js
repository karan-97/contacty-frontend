import { Navigate } from "react-router-dom";

const PrivateRoute = ({ auth, children }) => {
    if(!auth){
        <Navigate to="/login" replace />
    }
    return children;
};

export { PrivateRoute };
