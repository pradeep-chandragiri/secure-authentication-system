import db from "../../configs/mysqldb.js"
import bcrypt from 'bcryptjs'
import { formatActivity } from "../../utils/formatActivity.js"

export const get_profile = async (req, res) => {
    
    try {

        const userId = req.user.userId

        const [rows] = await db.query(`SELECT name, username, email, dp, is_email_verified, is_account_active, last_login_at, created_at FROM users WHERE userId = ?`, [userId])

        // User not found
        if (rows.length === 0){
            return res.status(404).json({
                success: false,
                message: 'Requested user does not exist.'
            })
        }

        // Extracting user
        const user = rows[0]

        return res.status(200).json({
            success: true,
            data: user
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }

}

export const update_profile = async (req, res) => {

    let { name, username, email } = req.body

    try {
        
        const userId = req.user.userId

        // Fetch user
        const [rows] = await db.query(`SELECT * FROM users WHERE userId = ?`, [userId])

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Requested user does not exist."
            });
        }

        const user = rows[0]

        // Fallback values
        name = name ? name : user.name
        username = username ? username : user.username
        email = email ? email : user.email

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
        const [existing_username] = await db.query(`SELECT username FROM users WHERE username = ? AND userId != ?`, [sanitized_username, userId])
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
        const [existing_email] = await db.query(`SELECT email FROM users WHERE email = ? AND userId != ?`, [sanitized_email, userId])
        if (existing_email.length > 0){
            return res.status(409).json({
                success: false,
                message: 'An account with this email already exists.'
            })
        }


        await db.query(`UPDATE users SET name = ?, username = ?, email = ? WHERE userId = ?`, [name, sanitized_username, sanitized_email, userId])

        await db.query(`INSERT INTO user_activity_logs (userId, account_type, description, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)`, [userId, 'ACCOUNT_UPDATE', 'Account details updated successfully', req.ip ? req.ip : "Unknown", req.header['user-agent'] ? req.header['user-agent'] : "Unknown" ])

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                name,
                username: sanitized_username,
                email: sanitized_email,
            }
        })


    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }

}

export const get_user_activity = async (req, res) => {
    
    try {

        const userId = req.user.userId

        const [rows] = await db.query(`SELECT action_type, description, ip_address, user_agent, created_at FROM user_activity_logs WHERE userId = ?`, [userId])

        // User not found
        if (rows.length === 0){
            return res.status(404).json({
                success: false,
                message: 'Requested information does not exist.'
            })
        }

        // Extracting user
        const log_activity = rows

        return res.status(200).json({
            success: true,
            data: formatActivity(log_activity)
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }

}

export const upload_profile_picture = async (req, res) => {
    
    try {
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const delete_profile_picture = async (req, res) => {
    
    try {
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const change_password = async (req, res) => {
    
    let { password, newPassword } = req.body

    if (!password || !newPassword){
        return res.status(400).json({
            success: false,
            message: 'Required fields are missing.'
        })
    }

    try {

        password = password?.trim()
        newPassword = newPassword?.trim()

        const userId = req.user.userId

        // Fetech Information
        const [rows] = await db.query(`SELECT password FROM users WHERE userId = ?`, [userId])
        if (rows.length === 0){
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            })
        }

        // Extract user info
        const user = rows[0]

        // Comparing password
        const isCurrentPassword = await bcrypt.compare(password, user.password)
        if (!isCurrentPassword){
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect.'
            })
        }

        // Password validation
        const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#^()[\]{}\-+=~`|:;"'<>,./\\])[A-Za-z\d@$!%*?&_#^()[\]{}\-+=~`|:;"'<>,./\\]{8,64}$/;
        if (!password_regex.test(newPassword)){
            return res.status(400).json({
                success: false,
                message: 'New password must contain uppercase, lowercase, number, and special character.'
            })
        }

        const isSamePassword = await bcrypt.compare(newPassword, user.password)
        if (isSamePassword){
            return res.status(400).json({
                success: false,
                message: 'New password cannot be the same as your current password.'
            })
        }

        // Hashing new password
        const hashedPassword = await bcrypt.hash(newPassword, 10)

        // Update password
        await db.query(`UPDATE users SET password = ? WHERE userId = ?`, [hashedPassword, userId])

        // log activity
        await db.query(`INSERT INTO user_activity_logs (userId, action_type, description, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)`, [userId, 'PASSWORD_CHANGE', 'Password changed successfully', req.ip ? req.ip : 'Unknown', req.headers['user-agent'] ? req.headers['user-agent'] : 'Unknown'])

        return res.status(200).json({
            success: true,
            message: 'Password updated successfully.'
        })
        
    } catch (error) {
        console.error(error);
        
        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        })
    }

}