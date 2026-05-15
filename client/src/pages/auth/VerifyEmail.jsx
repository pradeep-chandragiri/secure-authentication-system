import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AppBanner from '../../components/AppBanner.jsx'

function VerifyEmail() {

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email || null;

    const [resendStatus, setResendStatus] = useState('idle'); // 'idle' | 'sending' | 'sent'

    const handleResend = async () => {
        if (resendStatus !== 'idle') return;
        setResendStatus('sending');

        // TODO: call resend verification email API
        await new Promise(resolve => setTimeout(resolve, 1000)); // remove when API is wired

        setResendStatus('sent');
    };

    const resendLabel = {
        idle:    'Resend verification email',
        sending: 'Sending...',
        sent:    'Email sent!',
    }[resendStatus];

    return (
        <div id="verifyEmailPage">

            <AppBanner />

            <div className="appContainer">
                <div className="verifyEmailContainer">

                    <div className="verifyEmailIcon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                    </div>

                    <div className="verifyEmailTop">
                        <h3>Check your inbox</h3>
                        <p>We've sent a verification link to</p>
                        {email && (
                            <span className="verifyEmailAddress">{email}</span>
                        )}
                        <p className="verifyEmailNote">
                            Click the link in that email to activate your account.
                            If you don't see it, check your spam folder.
                        </p>
                    </div>

                    <div className="verifyEmailActions">

                        <button
                            type="button"
                            className="authSwitchBtn"
                            onClick={() => navigate('/login')}
                        >
                            Back to Sign in
                        </button>

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

export default VerifyEmail