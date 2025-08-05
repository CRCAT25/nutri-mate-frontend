import { API_URL, PORT_EXPO_CLI } from '@env';

export const authService = {
  async register(emailOrPhone: string, password: string) {
    const res = await fetch(`${PORT_EXPO_CLI}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailOrPhone.includes("@") ? emailOrPhone : undefined,
        phone: !emailOrPhone.includes("@") ? emailOrPhone : undefined,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Đăng ký thất bại");
    }
    return data;
  },

  async login(emailOrPhone: string, password: string) {
    const res = await fetch(`${PORT_EXPO_CLI}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailOrPhone.includes("@") ? emailOrPhone : undefined,
        phone: !emailOrPhone.includes("@") ? emailOrPhone : undefined,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Đăng nhập thất bại");
    }
    return data;
  },
};
