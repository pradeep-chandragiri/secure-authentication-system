import db from '../../configs/mysqldb.js'

export const logout = async (req, res) => {
    
    try {
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const delete_account = async (req, res) => {
    
    try {
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}