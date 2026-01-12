import axiosInstance from "../utils/axiosInstance";
import API_PATHS from "../utils/apiPath";

// CREATE LISTING
export const createListing = async (data) => {
    const res = await axiosInstance.post(
        API_PATHS.LISTING.CREATE_LISTING,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return res.data;
};
