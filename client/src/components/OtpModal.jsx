const OtpModal = ({ otp, setOtp, onVerify }) => {
  return (
    <div style={{ background: "#eee", padding: "20px" }}>
      <h3>Verify Seller OTP</h3>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={onVerify}>Verify OTP</button>
    </div>
  );
};

export default OtpModal;
