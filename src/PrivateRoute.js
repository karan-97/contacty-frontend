import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ auth, children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!auth) {
            navigate('/login',{replace: true})
        }
    },[])
    return children;
};

export { PrivateRoute };
