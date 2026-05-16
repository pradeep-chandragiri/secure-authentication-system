import { useState } from 'react'
import AppRouter from './routes/AppRouter.jsx'
import SplashScreen from './pages/splashscreen/SplashScreen.jsx';

function App() {
    const [loading, setLoading] = useState(true);
    return (
        <>
            {loading && (
                <SplashScreen onComplete={() => setLoading(false)} />
            )}
            <div className="appWrapper">
                <AppRouter />
            </div>
        </>
    )
}

export default App