import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CustomInput from "src/components/CustomInput";
import { useAuth } from "src/hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "src/types/navigation";
import { validateEmailOrPhone, validatePassword } from "src/utils/validation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Register">;

export default function RegisterScreen() {
  const { register, loading, success, errorMsg, setErrorMsg } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const navigation = useNavigation<NavigationProp>();

  const handleRegister = () => {
    setErrorMsg("");

    const usernameError = validateEmailOrPhone(username);
    if (usernameError) return setErrorMsg(usernameError);

    const passwordError = validatePassword(password);
    if (passwordError) return setErrorMsg(passwordError);

    if (password !== confirmPassword) {
      return setErrorMsg("Mật khẩu xác nhận không khớp");
    }

    register(username, password);
  };

  if (success) {
    return (
      <View style={styles.successContainer}>
        <AntDesign name="checkcircle" size={80} color="green" />
        <Text style={styles.successText}>Đăng ký thành công!</Text>
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text style={styles.backToLogin}>Quay lại đăng nhập</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tạo tài khoản mới</Text>
      <Text style={styles.subtitle}>Nhập thông tin để tiếp tục</Text>

      <CustomInput
        placeholder="Email hoặc số điện thoại"
        value={username}
        onChangeText={setUsername}
        iconName="person-outline"
      />
      <CustomInput
        placeholder="Mật khẩu"
        value={password}
        secureTextEntry={secureText}
        onChangeText={setPassword}
        iconName="lock-closed-outline" // icon khóa bên trái
        suffixIconName={secureText ? "eye-off" : "eye"} // con mắt bên phải
        onSuffixIconPress={() => setSecureText(!secureText)}
      />

      <CustomInput
        placeholder="Xác nhận mật khẩu"
        value={confirmPassword}
        secureTextEntry={secureText}
        onChangeText={setConfirmPassword}
        iconName="lock-closed-outline" // icon khóa bên trái
        suffixIconName={secureText ? "eye-off" : "eye"} // con mắt bên phải
        onSuffixIconPress={() => setSecureText(!secureText)}
      />

      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.registerButtonText}>
          {loading ? "Đang xử lý..." : "Đăng ký"}
        </Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Bạn đã có tài khoản?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}> Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 24,
  },
  successContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  successText: { marginTop: 16, fontSize: 18, fontWeight: "bold" },
  backToLogin: { color: "#3498db", marginTop: 12, fontWeight: "bold" },
  registerButton: {
    backgroundColor: "#27ae60",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  registerButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  errorText: { color: "red", textAlign: "center", marginTop: 8 },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  loginText: { fontSize: 14, color: "gray" },
  loginLink: { fontSize: 14, color: "#3498db", fontWeight: "bold" },
});
