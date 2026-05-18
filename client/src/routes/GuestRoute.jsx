import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth.js"

const GuestRoute = ({ children }) => {

    const { loading, isLoggedIn } = useAuth()
    if (loading) {
        return <p>Loading...</p>
    }

    if (isLoggedIn) {
        return <Navigate to="/profile" />;
    }

    return children;
}

export default GuestRoute