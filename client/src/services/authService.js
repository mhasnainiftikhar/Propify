import axiosInstance from "../utils/axiosInstance";
import API_PATHS from "../utils/apiPath";

// SIGNUP
export const signupUser = async (data) => {
  const res = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, data);
  return res.data;
};

// LOGIN
export const loginUser = async (data) => {
  const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, data);
  return res.data;
};

// LOGOUT
export const logoutUser = async () => {
  const res = await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
  return res.data;
};

// VERIFY SELLER OTP
export const verifySellerOtp = async (data) => {
  const res = await axiosInstance.post(API_PATHS.AUTH.VERIFY_OTP, data);
  return res.data;
};

// RESEND SELLER OTP
export const resendSellerOtp = async (data) => {
  const res = await axiosInstance.post(API_PATHS.AUTH.RESEND_OTP, data);
  return res.data;
};

// FORGOT PASSWORD
export const forgotPassword = async (data) => {
  const res = await axiosInstance.post(API_PATHS.AUTH.FORGOT_PASSWORD, data);
  return res.data;
};

// RESET PASSWORD
export const resetPassword = async (data) => {
  const res = await axiosInstance.post(API_PATHS.AUTH.RESET_PASSWORD, data);
  return res.data;
};

// GOOGLE AUTH
export const googleAuth = async (data) => {
  const res = await axiosInstance.post(API_PATHS.AUTH.GOOGLE_AUTH, data);
  return res.data;
};
