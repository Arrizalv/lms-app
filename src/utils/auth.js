const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const login = async (email, password) => {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  // Save token to localStorage for later requests (optional)
  if (data.token) localStorage.setItem('token', data.token);
  // persist basic user info for the frontend
  try { localStorage.setItem('user', JSON.stringify({ id: data.id, email: data.email, role: data.role })); } catch (e) {}
  return data; // { id, email, role, token }
};

export const logout = async () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    // We don't decode here; callers should use stored user data returned from login/signup
    return { token };
  } catch (e) {
    return null;
  }
};

export const signUp = async (email, password, role = 'siswa') => {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Sign up failed');
  if (data.token) localStorage.setItem('token', data.token);
  try { localStorage.setItem('user', JSON.stringify({ id: data.id, email: data.email, role: data.role })); } catch (e) {}
  return data; // { id, email, role, token }
};
     