const routes = {
    // public
    home: "/",
    register: "/register",
    verifyEmail: "/verify-email",
    emailVerified: "/email-verified",
    login: "/login",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",

    // protected
    profile: "/profile",
    updateProfile: "/profile/edit",
    changePassword: "/profile/password",
    deleteAccount: "/profile/delete",
}

export default routes;