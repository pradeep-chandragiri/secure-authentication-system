import { useEffect, useMemo, useState } from "react"
import AuthContext from "../context/AuthContext.jsx"
import { getUser } from "../services/userService.js"

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {

        const fetchUser = async () => {
            try {

                const data = await getUser();

                if (data.success) {
                    setUser(data.user)
                    setIsLoggedIn(true)
                } else {
                    setUser(null)
                    setIsLoggedIn(false)
                }
                
            } catch (error) {
                setUser(null)
                setIsLoggedIn(false)
            } finally {
                setLoading(false)
            }
        }

        fetchUser();

    }, [])

    const value = useMemo(() => ({
        user, setUser, loading, isLoggedIn, setIsLoggedIn
    }), [user, loading, isLoggedIn])

    return (
        <AuthContext.Provider value={ value }>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider