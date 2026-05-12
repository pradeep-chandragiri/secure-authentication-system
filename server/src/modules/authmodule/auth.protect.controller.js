import db from '../../configs/mysqldb.js'

export const logout = async (req, res) => {
    
    try {

        const userId = req.user.userId
        const token = req.cookies.token

        if (!token){
            return res.status(401).json({
                success: false,
                message: 'Session expired.'
            })
        }

        // Insert token into blacklist
        await db.query(`INSERT INTO blacklisted_tokens (token) VALUES(?)`, [token])

        // Update user last login
        await db.query(`UPDATE users SET last_login_at = ? WHERE userId = ?`, [null, userId])

        // Insert activity in user log
        await db.query(`INSERT INTO user_activity_logs (userId, action_type, description, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)`, [userId, 'LOGGED_OUT', 'Session logged out successfully', req.ip || 'Unknown', req.headers['user-agent'] || 'Unknown'])

        res.clearCookie('token')

        res.status(200).json({
            success: true,
            message: "Logged out."
        })
        
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.clearCookie('token')

            return res.status(401).json({ 
                success: false,
                message: 'Token expired.' 
            })
        }

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const delete_account = async (req, res) => {
    
    try {

        const userId = req.user.userId
        const token = req.cookies.token

        if (!token){
            return res.status(401).json({
                success: false,
                message: 'Invalid token.'
            })
        }

        // check if token exists in the blacklist
        const [existing_token] = await db.query(`SELECT token FROM blacklisted_tokens WHERE token = ?`, [token])

        if(existing_token.length > 0){
            return res.status(401).json({
                success: false,
                message: 'Session Expired.'
            })
        }

        await db.query(`INSERT INTO user_activity_logs (userId, action_type, description, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)`, [userId, 'ACCOUNT_DELETION', 'Accound deleted successfully', req.ip || 'Unknown', req.headers['user-agent'] || 'Unknown'])

        await db.query(`DELETE FROM users WHERE userId = ?`, [userId])
        await db.query(`DELETE FROM user_activity_logs WHERE userId = ?`, [userId])
        
        res.clearCookie('token')

        return res.status(200).json({
            success: true,
            message: 'Account deleted successfully'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}