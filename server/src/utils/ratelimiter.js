import rateLimit, { ipKeyGenerator } from 'express-rate-limit'

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: false,
    legacyHeaders: false,
    skipSuccessfulRequests: true,

    keyGenerator: (req) => ipKeyGenerator(req),

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
        return `${identifier}-${ipKeyGenerator(req)}`
    },

    message: {
        success: false,
        message: 'Too many failed attempts, please try again after 15 minutes'
    }
})

export const forgotLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: false,
    legacyHeaders: false,
    skipSuccessfulRequests: true,

    keyGenerator: (req) => {
        const identifier = req.body.identifier?.trim().toLowerCase() || 'unknown'
        return `${identifier}-${ipKeyGenerator(req)}`
    },

    message: {
        success: false,
        message: 'Too many password reset attempts. Please try again after 15 minutes.'
    }
})

export const resetLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: false,
    legacyHeaders: false,
    skipSuccessfulRequests: true,

    keyGenerator: (req) => {
        ipKeyGenerator(req)
    },

    message: {
        success: false,
        message: 'Too many reset attempts. Please try again after 15 minutes.'
    }
})