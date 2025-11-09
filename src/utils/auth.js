// Simulasi autentikasi tanpa backend
const users = [
  { email: 'guru@example.com', password: '123', role: 'guru' },
  { email: 'siswa@example.com', password: '123', role: 'siswa' },
];

export const login = (email, password, role) => {
  return users.some(user => user.email === email && user.password === password && user.role === role);
};

export const logout = () => {
  // Hapus session jika ada
};