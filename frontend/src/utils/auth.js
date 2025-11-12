// src/utils/auth.js
const API_URL = "http://localhost:4000/api/auth"; // backend kamu

export const signup = async (data) => {
  try {
    const res = await fetch("http://localhost:4000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.error("Signup Error:", error);
    return { message: "Terjadi kesalahan koneksi server" };
  }
};

export const login = async (credentials) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    console.error("Login Error:", error);
    return { error: "Terjadi kesalahan saat login" };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
