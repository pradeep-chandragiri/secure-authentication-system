import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AvatarUpload from '../../components/AvatarUpload.jsx';

function Profile() {
    const navigate = useNavigate();

    const user = {
        name: 'Pradeep Chandragiri',
        username: 'pradeep',
        email: 'pradeep@example.com',
        joinedAt: 'May 2026',
        verified: true,
        profilePic: 'https://i.pravatar.cc/200?img=12'
    }
    
    const [previewImage, setPreviewImage] = useState(user.profilePic)

    const activities = [
        {
            title: 'Password changed',
            description: 'Your account password was updated successfully.',
            time: '2h ago'
        },
        {
            title: 'Logged in from Chrome on Windows',
            description: 'A new login session was detected from Vijayawada.',
            time: 'Yesterday'
        },
        {
            title: 'Updated profile information',
            description: 'Your profile details were edited and saved.',
            time: '3 days ago'
        },
        {
            title: 'Email address verified',
            description: 'Your email verification process was completed.',
            time: 'Last week'
        }
    ]

    return (
        <div id="profilePage">

            <div className="appContainer">
                <div className="profileContainer">
                    {/* Hero */}
                    <div className="profileHero">

                        <AvatarUpload
                                user={user}
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
                                <span> Joined {user.joinedAt} </span>
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
                                            <h4>{activity.title}</h4>
                                            <span className="activityTime">{activity.time}</span>
                                        </div>
                                        <p>{activity.description}</p>
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