// src/utils/validation.ts

export const validateEmailOrPhone = (value: string): string | null => {
  if (!value.trim()) {
    return "Vui lòng nhập email hoặc số điện thoại";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(0|\+84)\d{9}$/; // Việt Nam: 10 số, bắt đầu bằng 0 hoặc +84

  if (!emailRegex.test(value) && !phoneRegex.test(value)) {
    return "Email hoặc số điện thoại không hợp lệ";
  }

  return null; // hợp lệ
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return "Vui lòng nhập mật khẩu";
  }
  if (password.length < 6) {
    return "Mật khẩu phải có ít nhất 6 ký tự";
  }
  return null; // hợp lệ
};
