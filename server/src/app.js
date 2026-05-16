import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import authrouter from './modules/authmodule/auth.routes.js'
import userrouter from './modules/usermodule/user.routes.js'

const app = express()

app.use(express.json())
app.use(cors({
    origin: [ process.env.CLIENT_URL ],
    credentials: true
}))
app.use(helmet())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Api working fine!')
})

// auth
app.use('/api/v1/auth/accounts', authrouter)

// accounts
app.use('/api/accounts', userrouter)

export default app