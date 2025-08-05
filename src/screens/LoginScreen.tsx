import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CustomInput from "src/components/CustomInput";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "src/types/navigation";
import { useAuth } from "src/hooks/useAuth";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function LoginScreen() {
  const { login, loading, success, errorMsg } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const navigation = useNavigation<NavigationProp>();

  if (success) {
    return (
      <View style={styles.successContainer}>
        <AntDesign name="checkcircle" size={80} color="green" />
        <Text style={styles.successText}>Đăng nhập thành công!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào mừng bạn</Text>
      <Text style={styles.subtitle}>Đăng nhập để tiếp tục</Text>

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

      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => login(username, password)}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Bạn chưa có tài khoản?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.signupLink}> Đăng ký ngay</Text>
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
  loginButton: {
    backgroundColor: "#27ae60",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  loginButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  errorText: { color: "red", textAlign: "center", marginTop: 8 },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  signupText: { fontSize: 14, color: "gray" },
  signupLink: { fontSize: 14, color: "#3498db", fontWeight: "bold" },
});
