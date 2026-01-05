import { useState, useRef } from "react";
import { uploadProfilePicture } from "../services/userService";

const ProfilePictureUpload = ({ currentImage, onUploadSuccess }) => {
    const [image, setImage] = useState(currentImage || null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleIconClick = () => {
        if (image) {
            // Remove image
            setImage(null);
            setError(null);
            if (onUploadSuccess) {
                onUploadSuccess(null);
            }
        } else {
            // Trigger file input
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError("File size must be less than 5MB");
            return;
        }

        // Validate file type
        const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
        if (!validTypes.includes(file.type)) {
            setError("Only image files are allowed (JPEG, PNG, GIF, WebP)");
            return;
        }

        setError(null);
        setUploading(true);

        try {
            const data = await uploadProfilePicture(file);

            if (data.success) {
                const imageUrl = `http://localhost:5000${data.profileImageUrl}`;
                setImage(imageUrl);

                if (onUploadSuccess) {
                    onUploadSuccess(imageUrl);
                }
            } else {
                setError(data.message || "Upload failed");
            }
        } catch (err) {
            console.error("Upload error:", err);
            setError(err.response?.data?.message || "Upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Profile Picture Circle */}
            <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-4 border-white shadow-lg">
                    {image ? (
                        <img
                            src={image}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <svg
                            className="w-16 h-16 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}
                </div>

                {/* Upload/Delete Icon Button */}
                <button
                    onClick={handleIconClick}
                    disabled={uploading}
                    className={`absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 ${uploading
                        ? "bg-gray-400 cursor-not-allowed"
                        : image
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    title={image ? "Remove picture" : "Upload picture"}
                >
                    {uploading ? (
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    ) : image ? (
                        // Delete Icon
                        <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    ) : (
                        // Upload Icon
                        <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    )}
                </button>

                {/* Hidden File Input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            {/* Status Messages */}
            {uploading && (
                <p className="text-sm text-gray-600 animate-pulse">Uploading...</p>
            )}

            {error && (
                <p className="text-sm text-red-500 text-center max-w-xs">{error}</p>
            )}

            {!uploading && !error && image && (
                <p className="text-sm text-green-600">Profile picture updated!</p>
            )}
        </div>
    );
};

export default ProfilePictureUpload;
