import { useEffect } from "react"


const SplashScreen = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete?.();
        }, 2400);

        return () => clearTimeout(timer);
    }, [onComplete]);


  return (
        <div className="splashScreen">
            <div className="appleLoader"></div>
        </div>
  );
};

export default SplashScreen;