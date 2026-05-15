import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBanner from '../../components/AppBanner.jsx'

function ResetPassword() {

    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const handleChange = (e) => {
        setPassword(e.target.value);
        setError('');
    };

    const validate = () => {

        if (!password.trim()) {
            setError('New password is required');
            return false;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {

            // TODO:
            // Send reset token + new password to backend

            navigate('/login');

        } catch (err) {
            setError('Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="resetPasswordPage">

            <AppBanner />

            <div className="appContainer">
                <div className="resetPasswordContainer">
                    <div className="resetPasswordTop">
                        <h3>Create new password</h3>
                        <p>Your new password must be secure and different from previously used passwords.</p>
                    </div>
                    <form className="resetPasswordForm" onSubmit={handleSubmit}>
                        <div className={`field ${error ? 'error' : ''}`}>
                            <label>New Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter new password"
                                autoComplete="new-password"
                                value={password}
                                onChange={handleChange}
                                disabled={isLoading}
                            />

                            {error && (
                                <span className="errorMsg">{error}</span>
                            )}
                        </div>

                        <button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="btnSpinner" />
                                    <span>Updating...</span>
                                </>
                            ) : 'Reset Password'}
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
                            Back to Sign in
                        </button>
                    </form>
                    <p className="termsText">
                        By continuing, you agree to our <a href="#">Terms</a>
                        {' '} &amp; {' '}
                        <a href="#">Privacy Policy</a>.
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

export default ResetPassword