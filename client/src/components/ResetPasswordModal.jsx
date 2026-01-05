const ResetPasswordModal = ({
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    onReset,
    isLoading,
    error,
    onClose,
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4">
            <div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
                <p className="text-gray-500 text-sm mb-6">
                    Enter your new password below.
                </p>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-100">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    onClick={onReset}
                    disabled={!password || !confirmPassword || isLoading}
                    className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-semibold mt-8 hover:bg-black transition-all active:scale-[0.98] disabled:opacity-70"
                >
                    {isLoading ? "Resetting..." : "Reset Password"}
                </button>
            </div>
        </div>
    );
};

export default ResetPasswordModal;
