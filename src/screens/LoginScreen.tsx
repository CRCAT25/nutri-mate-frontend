import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { authService } from "src/services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [success, setSuccess] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const handleLogin = async () => {
    try {
      console.log("📤 Sending login request:", username, password);
      const res = await authService.login(username, password);
      console.log("✅ Login success:", res);

      await AsyncStorage.setItem("userId", res.userId);

      setSuccess(true); // chuyển sang trạng thái thành công

      // Sau 1.5 giây điều hướng sang trang khác (vd: Home hoặc Register)
      setTimeout(() => {
        setSuccess(false);
        navigation.navigate("Register");
      }, 1500);
    } catch (err: any) {
      console.error("❌ Login failed:", err);
      Alert.alert("❌ Lỗi", err.message);
    }
  };

  if (success) {
    return (
      <View style={styles.successContainer}>
        <AntDesign name="checkcircle" size={80} color="green" />
        <Text style={{ marginTop: 16, fontSize: 18, fontWeight: "bold" }}>
          Đăng nhập thành công!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào mừng bạn</Text>
      <Text style={styles.subtitle}>Đăng nhập để tiếp tục</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email hoặc số điện thoại"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          key={secureText ? "secure" : "visible"}
          placeholder="Mật khẩu"
          secureTextEntry={secureText}
          style={[styles.input, { flex: 1 }]}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Ionicons
            name={secureText ? "eye-off" : "eye"}
            size={22}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.forgotButton}>
        <Text style={styles.forgotText}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Hoặc đăng nhập với</Text>

      <View style={styles.oauthContainer}>
        <TouchableOpacity style={styles.oauthButton}>
          <FontAwesome name="google" size={20} color="#DB4437" />
          <Text style={styles.oauthText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.oauthButton}>
          <FontAwesome name="apple" size={20} color="#000" />
          <Text style={styles.oauthText}>Apple</Text>
        </TouchableOpacity>
      </View>

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
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotText: {
    color: "#3498db",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#27ae60",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    color: "gray",
    marginBottom: 12,
  },
  oauthContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  oauthButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  oauthText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "500",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  signupText: {
    fontSize: 14,
    color: "gray",
  },
  signupLink: {
    fontSize: 14,
    color: "#3498db",
    fontWeight: "bold",
  },
});
