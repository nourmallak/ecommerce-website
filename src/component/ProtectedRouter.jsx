import { Navigate, useNavigate } from "react-router-dom";

export default function ProtectedRouter({ children }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("user token");
    if (!token) {
        <Navigate to='/login' />
    }
    return children;
}