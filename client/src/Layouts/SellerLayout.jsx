import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    LayoutDashboard,
    Home,
    MessageSquare,
    User,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { signOutStart, signOutSuccess } from "../redux/user/userSlice";
import { logoutUser } from "../services/authService";
import { toast } from "react-hot-toast";

const SellerLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            dispatch(signOutStart());
            await logoutUser();
            localStorage.removeItem("token");
            dispatch(signOutSuccess());
            toast.success("Logged out successfully");
            navigate("/sign-in");
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    const navItems = [
        { name: "Dashboard", path: "/seller/dashboard", icon: LayoutDashboard },
        { name: "Properties", path: "/seller/properties", icon: Home },
        { name: "Messages", path: "/seller/messages", icon: MessageSquare },
        { name: "Profile", path: "/seller/profile", icon: User },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200 fixed h-full">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-900">Propify</h1>
                    <p className="text-sm text-gray-500 mt-1">Seller Portal</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                    ? "bg-blue-50 text-blue-600 font-semibold"
                                    : "text-gray-700 hover:bg-gray-50"
                                }`
                            }
                        >
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <img
                            src={currentUser?.profileImageUrl || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                                {currentUser?.fullName}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            <div
                className={`lg:hidden fixed inset-0 z-50 bg-gray-900/50 transition-opacity ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setSidebarOpen(false)}
            >
                <aside
                    className={`fixed left-0 top-0 h-full w-64 bg-white transform transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Propify</h1>
                            <p className="text-sm text-gray-500 mt-1">Seller Portal</p>
                        </div>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
                            <X size={24} className="text-gray-500" />
                        </button>
                    </div>

                    <nav className="flex-1 p-4 space-y-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                        ? "bg-blue-50 text-blue-600 font-semibold"
                                        : "text-gray-700 hover:bg-gray-50"
                                    }`
                                }
                            >
                                <item.icon size={20} />
                                <span>{item.name}</span>
                            </NavLink>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-gray-200">
                        <div className="flex items-center gap-3 px-4 py-3 mb-2">
                            <img
                                src={currentUser?.profileImageUrl || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">
                                    {currentUser?.fullName}
                                </p>
                                <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </aside>
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:ml-64">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white border-b border-gray-200 p-4 sticky top-0 z-40">
                    <div className="flex items-center justify-between">
                        <button onClick={() => setSidebarOpen(true)}>
                            <Menu size={24} className="text-gray-900" />
                        </button>
                        <h1 className="text-lg font-bold text-gray-900">Propify</h1>
                        <div className="w-6" /> {/* Spacer for alignment */}
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SellerLayout;
