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

// GET USER LISTINGS
export const getUserListings = async (userId) => {
    const res = await axiosInstance.get(`/api/listing/user/${userId}`);
    return res.data;
};

// GET ALL LISTINGS
export const getAllListings = async (params = {}) => {
    const res = await axiosInstance.get(`/api/listing/all`, { params });
    return res.data;
};

// DELETE LISTING
export const deleteListing = async (listingId) => {
    const res = await axiosInstance.delete(`/api/listing/delete/${listingId}`);
    return res.data;
};

// UPDATE LISTING
export const updateListing = async (listingId, data) => {
    const res = await axiosInstance.post(`/api/listing/update/${listingId}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

// GET SINGLE LISTING
export const getListing = async (listingId) => {
    const res = await axiosInstance.get(`/api/listing/get/${listingId}`);
    return res.data;
};
