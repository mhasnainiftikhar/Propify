import brevo from "@getbrevo/brevo";

export const sendEmail = async (toEmail, subject, textContent) => {
  try {
    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const emailData = {
      sender: {
        email: "hasnainiftikhar930@gmail.com",
        name: "Propify",
      },
      to: [{ email: toEmail }],
      subject,
      textContent,
    };

    await apiInstance.sendTransacEmail(emailData);
  } catch (error) {
    console.error("Brevo Email Error:", error?.response?.data || error.message);
    throw error;
  }
};
