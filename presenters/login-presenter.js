import { loginUser } from "../src/utils/auth";

export async function handleLoginSubmit({
  email,
  password,
  navigate,
  onError,
}) {
  try {
    const data = await loginUser(email, password);

    let accessToken = null;
    let refreshToken = null;

    if (
      data.response &&
      data.response.accessToken &&
      data.response.refreshToken
    ) {
      accessToken = data.response.accessToken;
      refreshToken = data.response.refreshToken;
    } else if (data.accessToken && data.refreshToken) {
      accessToken = data.accessToken;
      refreshToken = data.refreshToken;
    }

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }
    navigate("/");
  } catch (error) {
    onError(error.message || "Login failed");
  }
}