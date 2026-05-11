import express from 'express'
import { protect } from '../../middlewares/auth.middleware.js'
import { forgot_password, login, register, reset_password, verify_email } from './auth.public.controller.js'
import { delete_account, logout } from './auth.protect.controller.js'
import { authLimiter, loginLimiter } from '../../utils/ratelimiter.js'

const authrouter = express.Router()

// auth public routes
// POST api/auth/v1/accounts/new
authrouter.post('/new', register)

// PUT api/auth/v1/accounts/verify/email
authrouter.put('/verify/email', verify_email)

// POST api/auth/v1/accounts/login
authrouter.post('/login', authLimiter, loginLimiter, login)

// POST api/auth/v1/accounts/password/forgot
authrouter.post('/password/forgot', forgot_password)

// POST api/auth/v1/accounts/password/reset
authrouter.post('/password/reset', reset_password)


// auth protect routes
// POST api/auth/v1/accounts/logout 
authrouter.post('/logout', protect, logout)

// DELETE api/auth/v1/accounts
authrouter.delete('/', protect, delete_account)

export default authrouter