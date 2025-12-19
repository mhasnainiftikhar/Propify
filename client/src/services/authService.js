import axiosInstance from "../utils/axiosInstance.js";
import API_PATHS from "../utils/apiPath.js";

export const signupUser = async (formData) => {
  const response = await axiosInstance.post(
    API_PATHS.AUTH.SIGNUP,
    formData
  );
  return response.data;
};

//VERIFY SELLER OTP
export const verifySellerOtp = async (otpData) => {
  const response = await axiosInstance.post(
    API_PATHS.AUTH.VERIFY_OTP,
    otpData
  );
  return response.data;
};
