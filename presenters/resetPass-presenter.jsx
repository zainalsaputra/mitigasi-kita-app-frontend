import { resetPassword } from "../src/utils/auth";

export async function ResetPasswordPresenter({
  token,
  password,
  setLoading,
  setMessage,
  setError,
}) {
  setLoading(true);
  setMessage("");
  setError("");

  try {
    const successMessage = await resetPassword(token, password);
    setMessage(successMessage);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}
