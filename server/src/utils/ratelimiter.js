import rateLimit from 'express-rate-limit'

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: false,
    legacyHeaders: false,
    skipSuccessfulRequests: true,

    keyGenerator: (req) => {
        return req.ip
    },

    message: {
        success: false,
        message: 'Too many failed attempts, please try again after 15 minutes'
    }
})

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: false,
    legacyHeaders: false,
    skipSuccessfulRequests: true,

    keyGenerator: (req) => {
        const identifier = req.body.identifier?.trim().toLowerCase() || 'unknown'
        return `${identifier}-${req.ip}`
    },

    message: {
        success: false,
        message: 'Too many failed attempts, please try again after 15 minutes'
    }
})