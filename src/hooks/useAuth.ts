import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { validateEmailOrPhone, validatePassword } from "src/utils/validation";
import { authService } from "src/services/auth.service";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "src/types/navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function useAuth() {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const login = async (username: string, password: string) => {
    setErrorMsg("");
    const usernameError = validateEmailOrPhone(username);
    if (usernameError) return setErrorMsg(usernameError);
    const passwordError = validatePassword(password);
    if (passwordError) return setErrorMsg(passwordError);

    try {
      setLoading(true);
      const res = await authService.login(username, password);
      await AsyncStorage.setItem("userId", res.userId);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigation.replace("Onboarding");
      }, 1000);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setErrorMsg("Tài khoản hoặc mật khẩu không đúng");
      } else if (err.message?.includes("Network")) {
        setErrorMsg("Không thể kết nối đến máy chủ, vui lòng thử lại");
      } else {
        setErrorMsg("Đăng nhập thất bại, vui lòng thử lại");
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, password: string) => {
    try {
      setLoading(true);
      const res = await authService.register(username, password);
      await AsyncStorage.setItem("userId", res.userId);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigation.replace("Onboarding");
      }, 1000);
    } catch (err: any) {
      if (err.response?.status === 409) {
        setErrorMsg("Tài khoản đã tồn tại");
      } else {
        setErrorMsg("Đăng ký thất bại, vui lòng thử lại");
      }
    } finally {
      setLoading(false);
    }
  };

  return { login, register, loading, success, errorMsg, setErrorMsg };
}
