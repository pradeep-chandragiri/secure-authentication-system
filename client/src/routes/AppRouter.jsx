import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Auth pages
import Home from '../pages/auth/Home.jsx'
import Register from '../pages/auth/Register.jsx'
import VerifyEmail from '../pages/auth/VerifyEmail.jsx'
import EmailVerified from '../pages/auth/EmailVerified.jsx'
import Login from '../pages/auth/Login.jsx'
import ForgotPassword from '../pages/auth/ForgotPassword.jsx'
import ResetPassword from '../pages/auth/ResetPassword.jsx'

// User pages
import Profile from '../pages/user/Profile.jsx'
import UpdateProfile from '../pages/user/UpdateProfile.jsx'
import ChangePassword from '../pages/user/ChangePassword.jsx'

// NotFound page
import NotFound from '../pages/NotFound.jsx'

// Protected route
import ProtectedRoute from '../routes/ProtectedRoute.jsx'

// route constants
import routes from '../constants/routes.js'

function AppRouter() {
    return (
        <>

            <Routes>

                {/* Default Redirect */}
                <Route path="/" element={ <Home /> } />

                {/* Public Routes */}
                <Route path={ routes.register } element={ <Register /> } />
                <Route path={ routes.verifyEmail } element={ <VerifyEmail /> } />
                <Route path={ routes.emailVerified } element={ <EmailVerified /> } />
                <Route path={ routes.login } element={ <Login /> } />
                <Route path={ routes.forgotPassword } element={ <ForgotPassword /> } />
                <Route path={ routes.resetPassword } element={ <ResetPassword /> } />

                {/* Protect Routes */}
                <Route path={ routes.profile } element={ <ProtectedRoute><Profile /></ProtectedRoute> } />
                <Route path={ routes.updateProfile } element={ <ProtectedRoute><UpdateProfile /></ProtectedRoute> } />
                <Route path={ routes.changePassword } element={ <ProtectedRoute><ChangePassword /></ProtectedRoute> } />
                
                {/* $404 */}
                <Route path="*" element={ <NotFound /> } />

            </Routes>

        </>
    )
}

export default AppRouter