

import { forgotPassword } from "../src/utils/auth";
export async function ForgotPasswordPresenter({ 
    email, 
    setLoading, 
    setMessage, 
    setError 
}) {
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const successMessage = await forgotPassword(email);
      setMessage(successMessage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
}
