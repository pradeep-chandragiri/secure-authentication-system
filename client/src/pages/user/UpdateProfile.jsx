import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function UpdateProfile() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: ''
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setLoading] = useState(false)

    const handleChange = (e) => {

        const { name, value } = e.target

        setFormData(prev => ({ ...prev, [name]: value }))
        setErrors(prev => ({ ...prev, [name]: '' }))
    }

    const validate = () => {

        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        }
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required'
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        if (!validate()) return
        setLoading(true)
        try {

            // API

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div id="updateProfilePage">
            <div className="appContainer">
                <div className="updateProfileContainer">
                    <div className="updateProfileTop">
                        <h1>Update Profile</h1>
                        <p>Update your account information and identity details.</p>
                    </div>
                    <form className="updateProfileForm" onSubmit={handleSubmit}>
                        <div className={`field ${errors.name ? 'error' : ''}`}>
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            {
                                errors.name &&
                                <span className="errorMsg">
                                    {errors.name}
                                </span>
                            }
                        </div>

                        <div className={`field ${errors.username ? 'error' : ''}`}>
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            {
                                errors.username &&
                                <span className="errorMsg">
                                    {errors.username}
                                </span>
                            }
                        </div>

                        <div className={`field ${errors.email ? 'error' : ''}`}>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            {
                                errors.email &&
                                <span className="errorMsg">
                                    {errors.email}
                                </span>
                            }
                        </div>

                        <button type="submit" disabled={isLoading}>
                            {
                                isLoading
                                    ? 'Saving...'
                                    : 'Save Changes'
                            }
                        </button>

                        <button type="button" className="secondaryBtn" onClick={() => navigate('/profile')}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile