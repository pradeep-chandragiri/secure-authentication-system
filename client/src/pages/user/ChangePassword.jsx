import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChangePass } from '../../services/userService.js'

function ChangePassword() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: ''
    })
    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState('')
    const [isLoading, setLoading] = useState(false)

    const handleChange = (e) => {

        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        setErrors(prev => ({ ...prev, [name]: '' }))
        setSuccess('')
    }

    const validate = () => {

        const newErrors = {}

        if (!formData.oldPassword.trim()) {
            newErrors.oldPassword = 'Old password is required'
        }
        if (!formData.newPassword.trim()) {
            newErrors.newPassword = 'New password is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        if (!validate()) return
        setLoading(true)
        setErrors({})
        setSuccess('')

        try {

            const payload = {
                password: formData.oldPassword,
                newPassword: formData.newPassword
            }

            // API
            const data = await ChangePass(payload)

            if (data.success) {

                setSuccess(data.message)

                setFormData({
                    oldPassword: '',
                    newPassword: ''
                })

                setTimeout(() => {
                    navigate('/profile')
                }, 1500)
            }
        } catch (err) {
            const message =
                err.response?.data?.message ||
                'Something went wrong'

            // Backend message handling
            if (message.toLowerCase().includes('current password')) {

                setErrors({
                    oldPassword: message
                })

            } else if (
                message.toLowerCase().includes('new password')
            ) {

                setErrors({
                    newPassword: message
                })

            } else {

                setErrors({
                    general: message
                })
            }

        } finally {
            setLoading(false)
        }
    }

    return (
        <div id="changePasswordPage">
            <div className="appContainer">
                <div className="changePasswordContainer">
                    <div className="changePasswordTop">
                        <h1>Change Password</h1>
                        <p>Update your password to keep your account secure.</p>
                    </div>
                    <form className="changePasswordForm" onSubmit={handleSubmit}>

                        <div className={`field ${errors.oldPassword ? 'error' : ''}`}>
                            <label>Old Password</label>
                            <input
                                type="password"
                                name="oldPassword"
                                placeholder="Enter old password"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            {
                                errors.oldPassword &&
                                <span className="errorMsg">
                                    {errors.oldPassword}
                                </span>
                            }
                        </div>

                        <div className={`field ${errors.newPassword ? 'error' : ''}`}>
                            <label>New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="Enter new password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            {
                                errors.newPassword &&
                                <span className="errorMsg">
                                    {errors.newPassword}
                                </span>
                            }
                        </div>

                        <button type="submit" disabled={isLoading}>
                            {
                                isLoading
                                    ? 'Updating...'
                                    : 'Update Password'
                            }
                        </button>

                        <button
                            type="button"
                            className="secondaryBtn"
                            onClick={() => navigate('/profile')}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword