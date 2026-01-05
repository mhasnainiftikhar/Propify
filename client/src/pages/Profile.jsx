import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";
import { updateUser, uploadProfilePicture } from "../services/userService";
import { toast } from "react-hot-toast";
import { Camera, Mail, User as UserIcon, Shield, Loader2 } from "lucide-react";

const Profile = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    fullName: currentUser?.fullName || "",
    email: currentUser?.email || "",
    password: "",
    profileImageUrl: currentUser?.profileImageUrl || currentUser?.photoURL || "",
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setForm({
        fullName: currentUser.fullName,
        email: currentUser.email,
        password: "",
        profileImageUrl: currentUser.profileImageUrl || currentUser.photoURL || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const data = await uploadProfilePicture(file);
      setForm({ ...form, profileImageUrl: data.profileImageUrl });
      toast.success("Image uploaded! Don't forget to save changes.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    try {
      const data = await updateUser({
        fullName: form.fullName,
        profileImageUrl: form.profileImageUrl,
        password: form.password || undefined,
      });
      dispatch(updateUserSuccess(data.user));
      toast.success("Profile updated successfully!");
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Update failed";
      dispatch(updateUserFailure(errorMsg));
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl">
          {/* Header/Cover */}
          <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 sm:left-12 sm:translate-x-0">
              <div className="relative group">
                <img
                  src={
                    form.profileImageUrl
                      ? (form.profileImageUrl.startsWith('http') ? form.profileImageUrl : `http://localhost:5000${form.profileImageUrl}`)
                      : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover bg-white"
                />
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300">
                  {uploading ? (
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  ) : (
                    <Camera className="w-8 h-8 text-white" />
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="pt-20 px-8 pb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{currentUser?.fullName}</h1>
                <p className="text-gray-500 font-medium capitalize">{currentUser?.role} Account</p>
              </div>
              <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold border border-blue-100">
                Active Session
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Account Settings Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <UserIcon className="w-5 h-5 text-blue-600" />
                    Personal Information
                  </h3>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                    <div className="relative transform transition-all duration-300 focus-within:scale-[1.02]">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                      <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-0 rounded-2xl pl-11 pr-4 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 opacity-70 cursor-not-allowed">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        value={form.email}
                        disabled
                        className="w-full bg-gray-100 border-0 rounded-2xl pl-11 pr-4 py-4 cursor-not-allowed outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Security Settings
                  </h3>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">New Password (Optional)</label>
                    <div className="relative transform transition-all duration-300 focus-within:scale-[1.02]">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                      <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-0 rounded-2xl pl-11 pr-4 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                        placeholder="••••••••"
                      />
                    </div>
                    <p className="text-xs text-gray-500 ml-1">Minimum 8 characters to update security.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <p className="text-sm text-gray-500 italic max-w-xs text-center sm:text-left">
                  Last updated profile updates will reflect across all platforms instantly.
                </p>
                <button
                  type="submit"
                  disabled={loading || uploading}
                  className="w-full sm:w-auto bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all active:scale-95 disabled:opacity-70 shadow-lg shadow-gray-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
