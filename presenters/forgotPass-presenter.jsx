import { forgotPassword } from "../src/utils/auth";
export async function ForgotPasswordPresenter({
  email,
  setLoading,
  setMessage,
  setError,
}) {
  setLoading(true);
  setMessage("");
  setError("");
  try {
    const successMessage = await forgotPassword(email);
    setMessage(successMessage);
    return { success: true, message: successMessage };
  } catch (err) {
    setError(err.message);
    return { success: false, error: err.message };
  } finally {
    setLoading(false);
  }
}
