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
    let user = null;

    if (
      data.response &&
      data.response.accessToken &&
      data.response.refreshToken
    ) {
      accessToken = data.response.accessToken;
      refreshToken = data.response.refreshToken;
      user = { ...data.response };
      delete user.accessToken;
      delete user.refreshToken;
    } else if (data.accessToken && data.refreshToken) {
      accessToken = data.accessToken;
      refreshToken = data.refreshToken;
      user = data.response || {};
    } else if (data.response) {
      user = data.response;
    }

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    navigate("/");
  } catch (error) {
    onError(error.message || "Login failed");
  }
}