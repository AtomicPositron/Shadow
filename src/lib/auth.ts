// Unified localStorage auth helper
export interface User {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  role?: string;
  education?: string;
  experience?: string;
}

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';
const AUTH_TOKEN_KEY = 'authToken';

export const getAllUsers = (): User[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
};

export const registerUser = (userData: { fullName: string; email: string; password: string; role?: string }): { success: boolean; error?: string; user?: User } => {
  if (!userData.fullName.trim()) {
    return { success: false, error: 'Full name is required' };
  }
  if (!userData.email.includes('@')) {
    return { success: false, error: 'Invalid email format' };
  }
  if (userData.password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters' };
  }

  const users = getAllUsers();
  if (users.some(u => u.email === userData.email)) {
    return { success: false, error: 'Email already registered' };
  }

  const newUser: User = {
    id: Date.now().toString(),
    fullName: userData.fullName,
    email: userData.email,
    role: userData.role || 'Web Developer',
    education: '',
    experience: ''
  };

  users.push({ ...newUser, password: userData.password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  localStorage.setItem(AUTH_TOKEN_KEY, newUser.id);

  return { success: true, user: newUser };
};

export const loginUser = (email: string, password: string): { success: boolean; error?: string; user?: User } => {
  if (!email.includes('@')) return { success: false, error: 'Invalid email format' };
  if (!password) return { success: false, error: 'Password is required' };

  const users = getAllUsers();
  const user = users.find((u: User) => u.email === email && u.password === password);
  if (!user) return { success: false, error: 'Invalid email or password' };

  const { password: _pwd, ...userWithoutPassword } = user;
  void _pwd;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  localStorage.setItem(AUTH_TOKEN_KEY, user.id);

  return { success: true, user: userWithoutPassword };
};

export const logoutUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const getCurrentUser = (): User | null => {
  try {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
};

export const updateUserProfile = (userId: string, updates: Partial<User>): { success: boolean; user?: User } => {
  const users = getAllUsers();
  const idx = users.findIndex(u => u.id === userId);
  if (idx === -1) return { success: false };

  const updated = { ...users[idx], ...updates };
  users[idx] = updated;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  const current = getCurrentUser();
  if (current?.id === userId) {
    const { password, ...userWithoutPassword } = updated as User;
    void password;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  }

  const { password, ...userWithoutPassword } = updated as User;
  void password;
  return { success: true, user: userWithoutPassword };
};

export const deleteUserAccount = (userId: string, password: string): { success: boolean; error?: string } => {
  const users = getAllUsers();
  const idx = users.findIndex(u => u.id === userId);
  if (idx === -1) return { success: false, error: 'User not found' };
  if (users[idx].password !== password) return { success: false, error: 'Invalid password' };

  users.splice(idx, 1);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  const current = getCurrentUser();
  if (current?.id === userId) logoutUser();

  return { success: true };
};
