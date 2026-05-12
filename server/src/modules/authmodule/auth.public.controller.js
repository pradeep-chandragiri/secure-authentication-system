import db from '../../configs/mysqldb.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { generate_user_id } from '../../utils/userIdgenerator.util.js'

export const register = async (req, res) => {
    
    const { name, username, email, password } = req.body

    if (!name || !username || !email || !password){
        return res.status(400).json({
            success: false,
            message: 'Required fields are missing.'
        })
    }

    try {

        const userId = generate_user_id();
        
        // Name format validation
        const name_regex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        if (!name_regex.test(name.trim())){
            return res.status(400).json({
                success: false,
                message: 'Name can only contain letters and spaces.'
            })
        }

        if (name.trim().length < 8){
            return res.status(400).json({
                success: false,
                message: 'Name must be at least 8 characters long.'
            })
        }


        // username sanitization
        const sanitized_username = username.trim().toLowerCase()
        const username_regex = /^[A-Za-z][A-Za-z0-9._]{6,}[A-Za-z]$/;
        if (!username_regex.test(sanitized_username)){
             return res.status(400).json({
                success: false,
                message: 'Username must start and end with a letter and be at least 8 characters long. Allowed ( _ , . )'
            })
        }

        // checking for existing username
        const [existing_username] = await db.query(`SELECT username FROM users WHERE username = ?`, [sanitized_username])
        if (existing_username.length > 0){
            return res.status(409).json({
                success: false,
                message: 'An account with this username already exists.'
            })
        }


        // email sanitization
        const sanitized_email = email.trim().toLowerCase();
        const email_regex = /^[A-Za-z0-9._]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!email_regex.test(sanitized_email)){
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            })
        }

        // check if it is already exists
        const [existing_email] = await db.query(`SELECT email FROM users WHERE email = ?`, [sanitized_email])
        if (existing_email.length > 0){
            return res.status(409).json({
                success: false,
                message: 'An account with this email already exists.'
            })
        }


        // password verification and hashing
        const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#^()[\]{}\-+=~`|:;"'<>,./\\])[A-Za-z\d@$!%*?&_#^()[\]{}\-+=~`|:;"'<>,./\\]{8,64}$/;
        if (!password_regex.test(password)){
            return res.status(400).json({
                success: false,
                message: 'Password must contain uppercase, lowercase, number, and special character.'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        
        // verify token preparation
        const verify_token = jwt.sign(
            { userId: userId, email: sanitized_email, username: sanitized_username },
            process.env.JWT_EMAIL_SECRET,
            { expiresIn: '15m' }
        )

        // inserting into db
        const [result] = await db.query(`INSERT INTO users (userId, name, username, email, password, verify_token) VALUES (?, ?, ?, ?, ?, ?)`, [userId, name, sanitized_username, sanitized_email, hashedPassword, verify_token]);

        // inserting user log activity
        const ip_address = req.id || 'Unknown'
        const user_agent = req.headers['user-agent'] || 'Unknown'
        await db.query(`INSERT INTO user_activity_logs (userId, action_type, description, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)`, [userId, 'ACCOUNT_CREATED', 'Account created successfully.', ip_address, user_agent])

        return res.status(201).json({
            success: true,
            message: 'Account created successfully. Please verify your email using the verification link sent to you.',
            data: {
                userId,
                name,
                username: sanitized_username,
                email: sanitized_email,
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal server error.'
        })
    }

}

export const verify_email = async (req, res) => {

    const { token } = req.query
    
    if (!token) {
        return res.status(400).json({
            success: false,
            message: 'Verification token is required.'
        })
    }

    try {
        
        // decoding jwt token
        const decoded = jwt.verify(token, process.env.JWT_EMAIL_SECRET)

        // assigning the values
        const { userId, email } = decoded
        
        // checking for existing user
        const [rows] = await db.query(`SELECT * FROM users WHERE userId = ? AND email = ?`, [userId, email])

        if (rows.length === 0){
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            })
        }

        // checking for verification status
        const user = rows[0]
        if (user.is_email_verified){
            return res.status(400).json({
                success: false,
                message: 'Email already verified.'
            })
        }

        await db.query(`UPDATE users SET is_email_verified = true, verify_token = NULL WHERE userId = ?`, [userId])

        const ip_address = req.ip || 'Unknown'
        const user_agent = req.headers['user-agent'] || 'Unknown'
        await db.query(`INSERT INTO user_activity_logs (userId, action_type, description, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)`, [userId, 'EMAIL_VERIFIED', 'Email verified successfully.', ip_address, user_agent])

        return res.status(200).json({
            success: true,
            message: 'Email verified successfully.'
        })

        
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({
                success: false,
                message: 'Verification link has expired.'
            })
        }

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const login = async (req, res) => {

    const { identifier, password } = req.body
    
    if (!identifier || !password){
        return res.status(400).json({
            success: false,
            message: 'Required fields are missing.'
        })
    }

    try {

        const sanitized_identifier = identifier.trim().toLowerCase()

        // check whether the user exists or not
        const [rows] = await db.query(`SELECT * FROM users WHERE email = ? OR username = ?`, [sanitized_identifier, sanitized_identifier])

        if (rows.length === 0){
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials. Verify your credentials and try again.'
            })
        }

        const user = rows[0]

        // Checking user ac verified or not
        if (!user.is_email_verified) {
            return res.status(403).json({
                success: false,
                message: 'Please verify your account before signing in.'
            })
        }

        // password checking
        const hashedPassword = user.password
        const isMatch = await bcrypt.compare(password, hashedPassword)
        if (!isMatch){
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials. Please try again.'
            })
        }

        // UPDATING USER LOGGED IN STATUS
        await db.query(`UPDATE users SET last_login_at = NOW() WHERE userId = ?`, [user.userId])

        // INSERTING USER LOG ACTIVITY
        await db.query(`INSERT INTO user_activity_logs (userId, action_type, description, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)`, [user.userId, 'LOGGED_IN', 'Logged in successfully', req.ip || 'Unknown', req.headers['user-agent'] || 'Unknown'])

        // TOKEN CREATION
        const token = jwt.sign(
            { userId: user.userId, username: user.username, email: user.email }, // PAYLOAD
            process.env.JWT_SECRET_KEY, // JWT SECRET
            { expiresIn: process.env.JWT_EXPIRES_IN } // EXPIRATION TIME
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        
        return res.status(200).json({
            success: true,
            message: 'Successfully signed in to your account.'
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const forgot_password = async (req, res) => {
    
    const { identifier } = req.body

    if (!identifier){
        return res.status(400).json({
            success: false,
            message: 'Required fields are missing.'
        })
    }

    try {

        // sanitize identifier
        const sanitized_identifier = identifier.trim().toLowerCase()

        // check for an account based on identifier
        const [rows] = await db.query(`SELECT userId, email, username FROM users WHERE username = ? OR email = ?`, [sanitized_identifier, sanitized_identifier])

        if (rows.length === 0){
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials. Verify your credentials and try again.'
            })
        }

        const user = rows[0]

        // Reset Password Token Creation
        const resetToken = jwt.sign(
            { userId: user.userId, email: user.email, username: user.username },
            process.env.JWT_PASSWORD_RESET_SECRET,
            { expiresIn: '15m' }
        )

        res.cookie('resetToken', resetToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            message: 'Account verified! Proceed to reset password.'
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const reset_password = async (req, res) => {
    
    const { password } = req.body

    if (!password){
        return res.status(400).json({
            success: false,
            message: 'Required fields are missing.'
        })
    }

    try {

        const resetToken = req.cookies.resetToken

        if (!resetToken){
            return res.status(401).json({
                success: false,
                message: 'Reset session not found or expired.'
            })
        }

        const [existing_token] = await db.query(`SELECT token from blacklisted_tokens WHERE token = ?`, [resetToken])

        if (existing_token.length > 0){
            return res.status(401).json({
                success: false,
                message: 'This password reset session has expired or has already been completed.'
            })
        }

        // decoding token
        const decoded = jwt.verify(resetToken, process.env.JWT_PASSWORD_RESET_SECRET)
        const user = decoded

        // validate password
        // password verification
        const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#^()[\]{}\-+=~`|:;"'<>,./\\])[A-Za-z\d@$!%*?&_#^()[\]{}\-+=~`|:;"'<>,./\\]{8,64}$/;
        if (!password_regex.test(password)){
            return res.status(400).json({
                success: false,
                message: 'Password must contain uppercase, lowercase, number, and special character.'
            })
        }

        // checking whether the stored and new password are same or not
        const [rows] = await db.query(`SELECT password FROM users WHERE userId = ?`, [user.userId])

        if (rows.length === 0){
            return res.status(404).json({
                success: false,
                message: 'Account not found.'
            })
        }

        const existingUser = rows[0]
        const isSamePassword = await bcrypt.compare(password, existingUser.password)

        if (isSamePassword){
            return res.status(400).json({
                success: false,
                message: 'New password cannot be the same as your current password.'
            })
        }

        // password hashing
        const hashedPassword = await bcrypt.hash(password, 10)

        // update password in user table
        await db.query(`UPDATE users SET password = ? WHERE userId = ?`, [hashedPassword, user.userId])
        
        // insert into activity log
        await db.query(`INSERT INTO user_activity_logs (userId, action_type, description, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)`, [user.userId, 'PASSWORD_CHANGE', 'Password changed successfully', req.ip || 'Unknown', req.headers['user-agent'] || 'Unknown'])

        // Inserting the used token into blacklist
        await db.query(`INSERT INTO blacklisted_tokens (token) VALUES (?)`, [resetToken])

        // token clearing from the cookies
        res.clearCookie('resetToken')
        res.clearCookie('token')
        

        res.status(200).json({
            success: true,
            message: 'Password updated. You can now log in with your new password.'
        })        

    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            res.clearCookie('resetToken')

            return res.status(401).json({ 
                success: false,
                message: 'Token expired, please follow the procedure again to reset your password.' 
            })
        }

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}