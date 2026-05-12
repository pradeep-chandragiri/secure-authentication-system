import jwt from 'jsonwebtoken'
import db from '../configs/mysqldb.js'

export const protect = async (req, res, next) => {
    
    try {
        
        const token = req.cookies.token

        // 1. Token checking
        if(!token){
            return res.status(401).json({
                success: false,
                message: 'Access denied, please login again to continue'
            })
        }

        // 2. verifying blacklisted Token
        const [blacklisted_token] = await db.query(`SELECT * FROM blacklisted_tokens WHERE token = ?`, [token])

        if(blacklisted_token.length > 0){
            return res.status(401).json({
                success: false,
                message: 'Token is invalid, please login again'
            })
        }

        // 3. decoding Token
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

        // 4. attaching info to req.user
        req.user = decode

        // 5. move to next
        next()

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false,
                message: 'Token expired, please login again' 
            })
        }

        return res.status(401).json({ 
            success: false,
            message: 'Invalid token' 
        })
    }

}