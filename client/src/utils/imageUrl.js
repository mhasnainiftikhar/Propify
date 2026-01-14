import { API_BASE_URL } from "./axiosInstance";

export const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/400x300";
    if (typeof url !== 'string') return "https://via.placeholder.com/400x300";

    if (url.startsWith('http')) return url;

    // Ensure the path starts with a slash
    const normalizedPath = url.startsWith('/') ? url : `/${url}`;

    // Ensure API_BASE_URL doesn't end with a slash to avoid double slashes
    const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;

    return `${baseUrl}${normalizedPath}`;
};
