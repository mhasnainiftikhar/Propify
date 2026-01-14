import { API_BASE_URL } from "./axiosInstance";

export const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/400x300";
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
};
