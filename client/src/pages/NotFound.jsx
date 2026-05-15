import { useNavigate } from 'react-router-dom'

function NotFound() {

    const navigate = useNavigate()

    return (
        <div id="notFoundPage">

            {/* Grid */}
            <div className="nfGrid"></div>

            {/* Huge 404 */}
            <div className="bg404">

                <span>4</span>
                <span>0</span>
                <span>4</span>

            </div>

            {/* Glow */}
            <div className="nfGlow"></div>

            {/* Content */}
            <div className="notFoundContent">

                <h1>
                    Page not found
                </h1>

                <p>
                    We can’t find the page that you’re looking for.
                    Probably the link is broken.
                </p>

                <button
                    onClick={() => navigate('/')}
                >
                    Take me home
                </button>

            </div>

        </div>
    )
}

export default NotFound