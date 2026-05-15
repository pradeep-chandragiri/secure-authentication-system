import React from 'react'
import { useNavigate } from 'react-router-dom'
import AppBanner from '../../components/AppBanner.jsx'

function Home() {

    const Navigate = useNavigate()

    return (
        <>
            <div id="home">

                {/** App Banner */}
                <AppBanner />

                {/** App Container */}
                <div className="appContainer">
                    <div className="containerBox">

                        <div className="box r--1 animate-fadeUp" style={{ animationDelay: "0.15s" }}>
                            <h2>Get started with Verixa.</h2>
                            <p>Sign in to your existing account or create a new one to get started.</p>
                        </div>

                        <div className="box r--2 animate-fadeUp" style={{ animationDelay: "0.25s" }}>
                            <button onClick={ () => Navigate('/login') }>Sign in</button>
                        </div>

                        <div className="box r--3">
                            <span className="divider"></span>
                            <span>OR</span>
                            <span className="divider"></span>
                        </div>

                        <div className="box r--4 animate-fadeUp" style={{ animationDelay: "0.35s" }}>
                            <button onClick={ () => Navigate('/register') }>Create an account</button>
                        </div>

                        <div className="box r--5 animate-fadeUp"  style={{ animationDelay: "0.45s" }}>
                            <span>
                                By continuing, you agree to Verixa's{" "}
                                <a href="#">Terms of Service</a> and{" "}
                                <a href="#">Privacy Policy</a>.
                            </span>
                            <p className="signature">
                                crafted with <span>❤️</span><br />
                                by <strong>Pradeep Chandragiri</strong>
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Home