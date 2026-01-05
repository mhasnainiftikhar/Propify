import axiosInstance from "../utils/axiosInstance";
import API_PATHS from "../utils/apiPath";

// UPDATE USER
export const updateUser = async (data) => {
    const res = await axiosInstance.put(API_PATHS.USER.UPDATE_USER, data);
    return res.data;
};

// UPLOAD PROFILE PICTURE
export const uploadProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("profilePicture", file);

    const res = await axiosInstance.post(
        API_PATHS.USER.UPLOAD_PROFILE_PICTURE,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return res.data;
};
