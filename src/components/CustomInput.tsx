import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CustomInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  iconName?: keyof typeof Ionicons.glyphMap; // icon bên trái
  suffixIconName?: keyof typeof Ionicons.glyphMap; // icon bên phải
  onSuffixIconPress?: () => void;
}

export default function CustomInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  iconName,
  suffixIconName,
  onSuffixIconPress,
}: CustomInputProps) {
  return (
    <View style={styles.container}>
      {iconName && (
        <Ionicons
          name={iconName}
          size={20}
          color="gray"
          style={styles.iconLeft}
        />
      )}

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />

      {suffixIconName && (
        <TouchableOpacity onPress={onSuffixIconPress}>
          <Ionicons
            name={suffixIconName}
            size={20}
            color="gray"
            style={styles.iconRight}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  iconLeft: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  iconRight: {
    marginLeft: 8,
  },
});
