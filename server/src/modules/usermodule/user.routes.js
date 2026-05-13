import express from 'express'
import { protect } from '../../middlewares/auth.middleware.js'
import { change_password, delete_profile_picture, get_profile, update_profile, upload_profile_picture } from './user.controller.js'

const userrouter = express.Router()

// GET api/accounts/profile
userrouter.get('/profile', protect, get_profile)

// PUT api/accounts/profile
userrouter.put('/profile', protect, update_profile)

// PUT api/accounts/profile-picture
userrouter.put('/profile-picture', protect, upload_profile_picture)

// DELETE api/accounts/profile-picture
userrouter.delete('/profile-picture', protect, delete_profile_picture)

// PUT api/accounts/password/change
userrouter.put('/password/change', protect, change_password)

export default userrouter