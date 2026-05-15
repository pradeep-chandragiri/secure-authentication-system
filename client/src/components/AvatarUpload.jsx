import { useRef, useState } from 'react'

function AvatarUpload({ user, previewImage, setPreviewImage }) {

    const fileInputRef = useRef(null)
    const [showPhotoSheet, setShowPhotoSheet] = useState(false)

    // File Select
    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const imageUrl = URL.createObjectURL(file)
        setPreviewImage(imageUrl)
    }

    // Remove Profile
    const handleRemoveProfile = () => {
        setPreviewImage(user.profilePic)
    }

    return (
        <>

            {/* Avatar */}
            <div className="profileAvatarWrapper">
                <img src={previewImage} alt={user.name} className="profileAvatar" />
                <button className="changePhotoBtn" onClick={() => setShowPhotoSheet(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/> <circle cx="12" cy="13" r="3"/></svg>
                </button>
            </div>

            {/* Overlay */}
            <div className={`profileSheetOverlay ${showPhotoSheet ? 'show' : ''}`} onClick={() =>  setShowPhotoSheet(false)} />

            {/* Apple Sheet */}
            <div className={`profilePhotoSheet ${showPhotoSheet ? 'show' : ''}`}>
                <div className="sheetDrag"></div>
                <button className="sheetCloseBtn" onClick={() => setShowPhotoSheet(false)}>✕</button>

                <div className="sheetContent">
                    <div className="sheetPreview">
                        <img src={previewImage} alt={user.name} />
                    </div>

                    <div className="sheetActions">
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            hidden
                        />
                        <button type="button" onClick={() => fileInputRef.current.click()}>
                            Browse Computer
                        </button>
                        <button type="button">Upload Photo</button>
                        <button type="button" className="removePhotoBtn" onClick={handleRemoveProfile}>
                            Remove Profile
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AvatarUpload