const OtpModal = ({
  otp,
  setOtp,
  onVerify,
  onResend,
  isLoading,
  error,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60">
      <div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-2xl">
        <h2 className="text-xl font-bold text-center mb-2">
          Verify Identity
        </h2>

        {error && (
          <p className="text-sm text-red-600 text-center mb-3">{error}</p>
        )}

        <input
          type="text"
          maxLength={6}
          className="w-full border rounded-xl px-4 py-4 text-center text-xl"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <div className="flex justify-between mt-4 text-sm">
          <button
            onClick={onResend}
            disabled={isLoading}
            className="text-blue-600 font-semibold"
          >
            Resend OTP
          </button>

          <button
            onClick={onClose}
            className="text-gray-500 font-semibold"
          >
            Cancel
          </button>
        </div>

        <button
          onClick={onVerify}
          disabled={otp.length !== 6 || isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl mt-6"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default OtpModal;
