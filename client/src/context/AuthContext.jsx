import { createContext, useEffect, useState } from 'react';
import { getUser } from '../services/userService.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // check auth on app load
    useEffect(() => {

        const fetchUser = async () => {
            try {
                const data = await getUser();
                setUser(data.user);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }

        }

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;