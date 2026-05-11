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

        const verify_token_expires_at = new Date(Date.now() + 15 * 60 * 1000);

        // inserting into db
        const [result] = await db.query(`INSERT INTO users (userId, name, username, email, password, verify_token, verify_token_expires_at) VALUES (?, ?, ?, ?, ?, ?, ?)`, [userId, name, sanitized_username, sanitized_email, hashedPassword, verify_token, verify_token_expires_at]);

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

    try {
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const login = async (req, res) => {
    
    try {
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const forgot_password = async (req, res) => {
    
    try {
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const reset_password = async (req, res) => {
    
    try {
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}