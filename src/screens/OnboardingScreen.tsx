import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Chào mừng đến với NutriMate",
    description:
      "Ứng dụng giúp bạn quản lý chế độ ăn uống và sức khoẻ dễ dàng.",
  },
  {
    id: "2",
    title: "Theo dõi chế độ ăn",
    description: "Ghi lại bữa ăn hằng ngày và theo dõi lượng calo tiêu thụ.",
  },
  {
    id: "3",
    title: "Nhận đề xuất cá nhân",
    description:
      "AI sẽ gợi ý thực đơn phù hợp với sức khỏe và mục tiêu của bạn.",
  },
];

export default function OnboardingScreen({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace("Home"); // Hoặc màn hình chính của bạn
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={flatListRef}
      />

      {/* Indicator */}
      <View style={styles.indicatorContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index && styles.activeIndicator,
            ]}
          />
        ))}
      </View>

      {/* Nút Tiếp */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextText}>
          {currentIndex === slides.length - 1 ? "Bắt đầu" : "Tiếp"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  slide: {
    width,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 10,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  indicator: {
    width: 20,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: "#27ae60",
  },
  nextButton: {
    backgroundColor: "#27ae60",
    paddingVertical: 12,
    marginHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 40,
  },
  nextText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
