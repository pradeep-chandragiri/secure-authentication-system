import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserActivity } from '../../services/userService.js';

import AvatarUpload from '../../components/AvatarUpload.jsx';
import useAuth from '../../hooks/useAuth.js';
import SplashScreen from '../splashscreen/SplashScreen.jsx';

function Profile() {
    const navigate = useNavigate();
    const { user, setUser, loading } = useAuth();
    const [activities, setActivities] = useState([]);

    // Loading state
    if (loading) {
        return <SplashScreen />;
    }

    // Safety check
    if (!user) {
        return <p>User not found.</p>;
    }

    const [previewImage, setPreviewImage] = useState(user.profilePic || 'https://i.pravatar.cc/200?img=12');

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const data = await getUserActivity();
                setActivities(data.data || []);
            } catch (error) {
                console.error(error);
            }
        }
        fetchActivities();
    }, []);

    const formattedDate = `${(d => d + (d > 3 && d < 21 ? 'th' : ['th','st','nd','rd'][d % 10] || 'th'))(new Date(user.created_at).getDate())} ${new Date(user.created_at).toLocaleString('en-US', { month: 'long' })}`

    return (
        <div id="profilePage">

            <div className="appContainer">
                <div className="profileContainer">
                    {/* Hero */}
                    <div className="profileHero">

                        <AvatarUpload
                            user={user}
                            setUser={setUser}
                            previewImage={previewImage}
                            setPreviewImage={setPreviewImage}
                        />

                        <div className="profileIdentity">
                            <h1>{user.name}</h1>
                            <p>@{user.username}</p>
                            <div className="profileMeta">
                                <span className="verifiedPill">
                                    <span className="verifiedDot"></span>
                                    Verified Account
                                </span>
                                <span className="metaDivider"></span>
                                <span> Joined {formattedDate} </span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="profileActions">
                        <button onClick={() => navigate('/profile/edit') }>
                            Edit Profile
                        </button>

                        <button onClick={() => navigate('/profile/password') }>
                            Change Password
                        </button>
                    </div>

                    {/* Information */}
                    <div className="profileSection">
                        <div className="sectionTop">
                            <h3>Account Information</h3>
                            <p>Your primary account details and identity information.</p>
                        </div>

                        <div className="infoGroup">
                            <div className="infoRow">
                                <span>Email</span>
                                <strong>{user.email}</strong>
                            </div>

                            <div className="infoRow">
                                <span>Username</span>
                                <strong>@{user.username}</strong>
                            </div>
                        </div>
                    </div>

                    {/* Activity */}
                    <div className="profileSection">

                        <div className="sectionTop">
                            <h3>Recent Activity</h3>
                            <p>Security events and recent account actions.</p>
                        </div>

                        <div className="activityTimeline">

                            {activities.map((activity, index) => (
                                <div className="activityItem" key={index}>
                                    <div className="timelineLine">
                                        <span className="timelineDot"></span>
                                    </div>

                                    <div className="activityContent">
                                        <div className="activityRow">
                                            <h4>{activity.action}</h4>
                                            <span className="activityTime">{activity.initiated_at}</span>
                                        </div>
                                        <p>{activity.description}</p>
                                        <p>{activity.user_agent}</p>
                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>

                    {/* Newsletter */}
                    <div className="profileSection">

                        <div className="sectionTop">
                            <h3>Newsletter</h3>
                            <p>Stay updated with Verixa releases and security improvements.</p>
                        </div>

                        <form className="newsletterForm">
                            <input type="email" placeholder="Enter your email"/>
                            <button type="submit">Subscribe</button>
                        </form>

                    </div>

                    {/* Footer */}
                    <p className="signature">
                        crafted with <span>❤️</span><br />
                        by <strong>Pradeep Chandragiri</strong>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Profile