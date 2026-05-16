import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import AppBanner from '../../components/AppBanner.jsx'
import { verifyEmail } from '../../services/authService.js'

const REDIRECT_DELAY = 10;

function EmailVerified() {

    const navigate  = useNavigate();

    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(REDIRECT_DELAY);
    const [status, setStatus] = useState({
        success: false,
        message: ""
    });

    // Verify Logic
    const { token } = useParams();

    useEffect(() => {
        const handleVerification = async () => {
            setLoading(true)
            
            try {
                const data = await verifyEmail(token);
                
                setStatus({
                    success: true,
                    message: response.data.message || "Email verified successfully"
                });

            } catch (err) {
                setStatus({ success: false, message: err.response?.data?.message || "Verification failed" });
            } finally {
                setLoading(false);
            }
        }

        if (token) {
            handleVerification();
        }
    }, [token]);

    useEffect(() => {

        if (count === 0) {
            navigate('/login');
            return;
        }

        const timer = setTimeout(() => {
            setCount(c => c - 1);
        }, 1000);

        return () => clearTimeout(timer);

    }, [count, navigate]);

    return (
        <div id="emailVerifiedPage">

            <AppBanner />

            <div className="appContainer">
                <div className="emailVerifiedContainer">

                    <div className="emailVerifiedIcon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /> </svg>
                    </div>

                    <div className="emailVerifiedTop">
                        <h3>You're all set!</h3>
                        <p>Your email has been verified. Your Verixa account is now active and ready to use.</p>
                    </div>

                    <div className="emailVerifiedCountdown">
                        <p>
                            Redirecting to sign in in{' '}
                            <span className="countdownNum">{count}</span>{' '}
                            {count === 1 ? 'second' : 'seconds'}…
                        </p>
                        <div className="countdownBar">
                            <div
                                className="countdownBarFill"
                                style={{ width: `${(count / REDIRECT_DELAY) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className="emailVerifiedActions">
                        <Link to="/login" className="goToLoginBtn">
                            Go to Sign in
                        </Link>
                    </div>

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

export default EmailVerified