import { useState } from "react";
import ProfilePictureUpload from "../components/ProfilePictureUpload";

const ProfilePage = () => {
    const [profileImageUrl, setProfileImageUrl] = useState(null);

    const handleUploadSuccess = (imageUrl) => {
        setProfileImageUrl(imageUrl);
        console.log("Profile picture updated:", imageUrl);
        // You can also update Redux state here if needed
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
                    Profile Settings
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Upload or update your profile picture
                </p>

                <div className="flex justify-center mb-6">
                    <ProfilePictureUpload
                        currentImage={profileImageUrl}
                        onUploadSuccess={handleUploadSuccess}
                    />
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mt-8">
                    <h3 className="font-semibold text-gray-700 mb-2">Instructions:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Click the <span className="text-blue-600">+</span> icon to upload a picture</li>
                        <li>• Accepted formats: JPEG, PNG, GIF, WebP</li>
                        <li>• Maximum file size: 5MB</li>
                        <li>• Click the <span className="text-red-600">trash</span> icon to remove</li>
                    </ul>
                </div>

                {profileImageUrl && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-green-700 font-medium">
                            ✓ Profile picture saved successfully!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
