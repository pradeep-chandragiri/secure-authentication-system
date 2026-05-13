import express from 'express'
import { protect } from '../../middlewares/auth.middleware.js'
import { change_password, delete_profile_picture, get_profile, get_user_activity, update_profile, upload_profile_picture } from './user.controller.js'
import upload from '../../configs/mutler.js'

const userrouter = express.Router()

// GET api/accounts/profile
userrouter.get('/profile', protect, get_profile)

// PUT api/accounts/profile
userrouter.put('/profile', protect, update_profile)

// GET api/accounts/activity
userrouter.get('/activity', protect, get_user_activity)

// PUT api/accounts/profile-picture
userrouter.put('/new/dp', protect, upload.single('dp'), upload_profile_picture)

// DELETE api/accounts/profile-picture
userrouter.delete('/delete/dp', protect, delete_profile_picture)

// PUT api/accounts/password/change
userrouter.put('/password/change', protect, change_password)

export default userrouter