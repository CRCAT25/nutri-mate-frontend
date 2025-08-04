import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Welcome">;

export default function WelcomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Chào mừng đến với <Text style={{ color: "green" }}>NutriMate</Text>
      </Text>

      <Text
        style={{
          color: "gray",
          textAlign: "center",
          paddingHorizontal: 24,
          marginTop: 8,
          marginBottom: 24,
        }}
      >
        Gợi ý thực đơn cá nhân hóa với AI, giúp bạn sống khỏe mỗi ngày.
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: "green",
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 999,
        }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Bắt đầu</Text>
      </TouchableOpacity>
    </View>
  );
}
