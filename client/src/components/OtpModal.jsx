const OtpModal = ({
  otp,
  setOtp,
  onVerify,
  onResend,
  isLoading,
  error,
  onClose,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 6 && !isLoading) {
      onVerify();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 transition-opacity">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-2xl transform transition-all scale-100"
      >
        <h2 className="text-xl font-bold text-center mb-2">
          Verify Identity
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          Enter the 6-digit code sent to your email
        </p>

        {error && (
          <p className="text-sm text-red-600 text-center mb-4 bg-red-50 p-2 rounded-lg border border-red-100">{error}</p>
        )}

        <input
          type="text"
          maxLength={6}
          className="w-full border rounded-xl px-4 py-4 text-center text-3xl font-bold tracking-widest focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
          placeholder="000000"
          value={otp}
          autoFocus
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, ""); // Only allow digits
            setOtp(val);
          }}
        />

        <div className="flex justify-between mt-6 text-sm">
          <button
            type="button"
            onClick={onResend}
            disabled={isLoading}
            className="text-blue-600 font-bold hover:text-blue-700 transition-colors disabled:opacity-50"
          >
            Resend OTP
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 font-semibold hover:text-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>

        <button
          type="submit"
          disabled={otp.length !== 6 || isLoading}
          className="w-full bg-blue-600 text-white py-4 rounded-xl mt-8 font-bold text-lg hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default OtpModal;
