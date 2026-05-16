import { useEffect, useRef } from 'react'

function GlobalError({ message, onHide, type = 'error', duration = 3000 }) {

    const timerRef = useRef(null);

    useEffect(() => {
        if (!message) return;

        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            onHide?.();
        }, duration);

        return () => clearTimeout(timerRef.current);
    }, [message, duration, onHide]);

    if (!message) return null;

    const isSuccess = type === 'success';

    const icon = isSuccess ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
    );

    return (
        <div className={`globalError ${isSuccess ? 'globalSuccess' : ''}`} role="alert" aria-live="assertive">

            <span className="globalErrorIcon">{icon}</span>
            <span className="globalErrorText">{message}</span>
            <button type="button" className="globalErrorClose" onClick={onHide} aria-label="Dismiss">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>

        </div>
    );
}

export default GlobalError