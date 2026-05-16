import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBanner from '../../components/AppBanner.jsx'
import GlobalError from '../../components/GlobalError.jsx'
import { validateRegister } from '../../validators/RegisterValidator.js'
import { registerUser } from '../../services/authService.js'

function Register() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    })

    const [errors, setErrors]     = useState({})
    const [isLoading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validate = () => {

        const newErrors = validateRegister(formData);

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) return;
        setLoading(true);

        try {
            
            // Payload
            const payload = {
                name: formData.name.trim(),
                username: formData.username.trim(),
                email: formData.email.trim(),
                password: formData.password
            }

            // API Call
            const data = await registerUser(payload)

            navigate('/verify-email', {
                state: { 
                    email: formData.email 
                }
            })

        } catch (err) {
            
            console.error(err);
            const field = err.response?.data?.field;
            const message = err.response?.data?.message || "Something went wrong";
            
            if (field) {
                setErrors((prev) => ({
                    ...prev,
                    [field]: message
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    api: message
                }));
            }

        } finally {
            setLoading(false);
        }

    }

    return (
        <div id="registerPage">
            <GlobalError message={errors.api} onHide={() => setErrors(prev => ({ ...prev, api: '' }))} />
            <AppBanner />

            <div className="appContainer">
                <div className="registerContainer">

                    <div className="registerTop">
                        <h3>Create account</h3>
                        <p>Join Verixa securely and protect your digital identity.</p>
                    </div>

                    <form className="registerForm" onSubmit={handleSubmit}>

                        <div className={`field ${errors.name ? "error" : ""}`}>
                            <label>Full name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                autoCapitalize="off"
                                autoComplete="off"
                                autoCorrect="off"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            {errors.name && <span className="errorMsg">{errors.name}</span>}
                        </div>

                        <div className={`field ${errors.username ? "error" : ""}`}>
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter username"
                                autoCapitalize="off"
                                autoComplete="off"
                                autoCorrect="off"
                                value={formData.username}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            {errors.username && <span className="errorMsg">{errors.username}</span>}
                        </div>

                        <div className={`field ${errors.email ? "error" : ""}`}>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email address"
                                autoCapitalize="off"
                                autoComplete="off"
                                autoCorrect="off"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            {errors.email && <span className="errorMsg">{errors.email}</span>}
                        </div>

                        <div className={`field ${errors.password ? "error" : ""}`}>
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Set a password"
                                autoCapitalize="off"
                                autoComplete="off"
                                autoCorrect="off"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            {errors.password && <span className="errorMsg">{errors.password}</span>}
                        </div>

                        <button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="btnSpinner" />
                                    <span>Creating account...</span>
                                </>
                            ) : 'Create Account'}
                        </button>

                        <div className="box r--3">
                            <span className="divider"></span>
                            <span>OR</span>
                            <span className="divider"></span>
                        </div>

                        <button
                            type="button"
                            className="authSwitchBtn"
                            onClick={() => navigate('/login')}
                            disabled={isLoading}
                        >
                            Already have an account?
                        </button>

                    </form>

                    <p className="termsText">
                        By continuing, you agree to our <a href="#">Terms</a> &amp; <a href="#">Privacy Policy</a>.
                    </p>

                    <p className="signature">
                        crafted with <span>❤️</span><br />
                        by <strong>Pradeep Chandragiri</strong>
                    </p>

                </div>
            </div>

        </div>
    );
}

export default Register