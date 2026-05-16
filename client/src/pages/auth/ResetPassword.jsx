import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBanner from '../../components/AppBanner.jsx'
import GlobalError from '../../components/GlobalError.jsx';
import { passwordValidate } from '../../validators/RegisterValidator.js';
import { resetPassword } from '../../services/authService.js';

function ResetPassword() {

    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setPassword(e.target.value);
        setError('');
    };

    const validate = () => {

        const validationError = passwordValidate(password.trim());
        if (validationError) {
            setError(validationError);
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cleanedPassword = password.trim();
        const validationError = passwordValidate(cleanedPassword);

        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);

        try {

            await resetPassword({ password: cleanedPassword });
            setSuccess('Password reset successfully! Redirecting to sign in...');

        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div id="resetPasswordPage">

            <GlobalError
                message={error}
                onHide={() => setError('')}
            />

            <GlobalError
                message={success}
                type="success"
                onHide={() => navigate('/login')}
            />
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