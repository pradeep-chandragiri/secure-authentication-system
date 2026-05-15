import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBanner from '../../components/AppBanner.jsx'

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        identifier: "",
        password: ""
    });

    const [errors, setErrors]     = useState({});
    const [isLoading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.identifier.trim()) newErrors.identifier = "Email or username is required";
        if (!formData.password.trim())   newErrors.password   = "Password is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            // TODO: call login API
            navigate('/dashboard');
        } catch (err) {
            // TODO: handle API errors
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="LoginPage">

            <AppBanner />

            <div className="appContainer">
                <div className="loginContainer">

                    <div className="loginTop">
                        <h3>Sign in</h3>
                        <p>Welcome back. Sign in to access your account.</p>
                    </div>

                    <form className="loginForm" onSubmit={handleSubmit}>

                        <div className={`field ${errors.identifier ? "error" : ""}`}>
                            <label>Email or Username</label>
                            <input
                                type="text"
                                name="identifier"
                                placeholder="Enter email or username"
                                autoCapitalize="off"
                                autoComplete="off"
                                autoCorrect="off"
                                value={formData.identifier}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            {errors.identifier && <span className="errorMsg">{errors.identifier}</span>}
                        </div>

                        <div className={`field ${errors.password ? "error" : ""}`}>
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter password"
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
                                    <span>Signing in...</span>
                                </>
                            ) : 'Sign In'}
                        </button>

                        <div className="authExtras">
                            <span>
                                Forgot password?{' '}
                                <a href="/forgot-password" className="forgotPasswordLink">Click here</a>
                            </span>
                        </div>

                        <div className="box r--3">
                            <span className="divider"></span>
                            <span>OR</span>
                            <span className="divider"></span>
                        </div>

                        <button
                            type="button"
                            className="authSwitchBtn"
                            onClick={() => navigate('/register')}
                            disabled={isLoading}
                        >
                            Create Account
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

export default Login