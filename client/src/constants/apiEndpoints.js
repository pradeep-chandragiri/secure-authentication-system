export const apiEndpoints = {
    auth: {
        register: '/v1/auth/accounts/new',
        verifyEmail: '/v1/auth/accounts/verify/email',
        login: '/v1/auth/accounts/login',
        forgotPassword: '/v1/auth/accounts/password/forgot',
        resetPassword: '/v1/auth/accounts/password/reset',
        logout: '/v1/auth/accounts/logout'
    },

    user: {
        getUser: '/accounts/profile',
        getActivity: '/accounts/activity',
        updateUser: '/accounts/profile',
        updateDp: '/accounts/new/dp',
        deleteDp: '/accounts/delete/dp',
        changePassword: '/accounts/password/change',
        deleteAccount: '/v1/auth/accounts/'
    }
}

export default apiEndpoints