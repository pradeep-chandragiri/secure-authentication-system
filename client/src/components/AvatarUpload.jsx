import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DeleteProfilePic, UpdateProfilePic } from '../services/userService.js'

function AvatarUpload({ user, setUser, previewImage, setPreviewImage }) {

    const fileInputRef = useRef(null)
    const navigate = useNavigate()

    const [showPhotoSheet, setShowPhotoSheet] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // File Select
    const handleFileSelect = (e) => {

        const file = e.target.files[0]

        if (!file) return

        // Save original file
        setSelectedFile(file)

        // Preview URL
        const imageUrl = URL.createObjectURL(file)
        setPreviewImage(imageUrl)
    }

     // Upload Photo
    const handleUploadPhoto = async () => {

        // Clear old error
        setError('')


        if (!selectedFile) {
            setError('Please select an image.')
            return
        }

        try {

            setLoading(true)

            // Form Data
            const formData = new FormData()
            formData.append('dp', selectedFile)

            // API Call
            const data = await UpdateProfilePic(formData)

            if (data.success) {
                setPreviewImage(data.user.dp)
                setShowPhotoSheet(false)
            }
            
            navigate('/profile')

        } catch (error) {

            setError(
                error.response?.data?.message ||
                'Upload failed.'
            )

        } finally {
            setLoading(false)
        }
    }

    // Remove Profile
    const handleRemoveProfile = async () => {
        try {
            const data = await DeleteProfilePic()

            if (data.success) {
                setPreviewImage(data.user.dp)
            }
            
            navigate('/profile')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

            {/* Avatar */}
            <div className="profileAvatarWrapper">
                <img src={user.dp ? user.dp : previewImage} alt={user.name} className="profileAvatar" />
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
                        <img src={user.dp ? user.dp : previewImage} alt={user.name} />
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
                        {
                            selectedFile &&
                            <button type="button" className="uploadPhotoBtn" onClick={handleUploadPhoto} disabled={loading}>
                                {
                                    loading
                                    ? 'Uploading...'
                                    : 'Upload Photo'
                                }
                            </button>
                        }
                        {
                            user.dp && 
                            <button type="button" className="removePhotoBtn" onClick={handleRemoveProfile}>
                                Remove Profile
                            </button>
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default AvatarUpload