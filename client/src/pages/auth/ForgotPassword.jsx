import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBanner from '../../components/AppBanner.jsx'

function ForgotPassword() {

    const navigate = useNavigate();

    const [identifier, setIdentifier] = useState('');
    const [error,      setError]      = useState('');
    const [isLoading,  setLoading]    = useState(false);

    const handleChange = (e) => {
        setIdentifier(e.target.value);
        setError('');
    };

    const validate = () => {
        if (!identifier.trim()) {
            setError('Email or username is required');
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
            // Generate reset token from backend
            

            // Redirect to reset password page
            navigate('/reset-password', {
                state: {
                    identifier
                    // token: response.data.token
                }
            });

        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="forgotPasswordPage">

            <AppBanner />

            <div className="appContainer">
                <div className="forgotPasswordContainer">

                    <div className="forgotPasswordTop">
                        <h3>Forgot password?</h3>
                        <p>Enter your email or username to continue resetting your password.</p>
                    </div>

                    <form className="forgotPasswordForm" onSubmit={handleSubmit}>

                        <div className={`field ${error ? 'error' : ''}`}>
                            <label>Email or Username</label>
                            <input
                                type="text"
                                name="identifier"
                                placeholder="Enter email or username"
                                autoCapitalize="off"
                                autoComplete="off"
                                autoCorrect="off"
                                value={identifier}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            {error && (
                                <span className="errorMsg">
                                    {error}
                                </span>
                            )}
                        </div>

                        <button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="btnSpinner" />
                                    <span>Processing...</span>
                                </>
                            ) : 'Continue'}
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

export default ForgotPassword