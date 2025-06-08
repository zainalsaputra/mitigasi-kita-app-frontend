import { registerUser } from "../src/utils/auth";

export async function handleRegister(form, onSuccess, onError) {
  if (form.password !== form.confirmPassword) {
    onError("Password dan Konfirmasi Password harus sama!");
    return;
  }

  try {
    await registerUser({
      name: form.name,
      email: form.email,
      password: form.password,
    });
    
    onSuccess();
  } catch (error) {
    onError(error.message || "Registration failed");
  }
}
