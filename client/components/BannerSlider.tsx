import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

type Banner = {
  image: string;
  title: string;
  subtitle: string;
};

type Props = {
  banners: Banner[];
};

const BannerSlider = ({ banners }: Props) => {
  const router = useRouter();
  const scrollRef = useRef<ScrollView | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (activeIndex + 1) % banners.length;

      scrollRef.current?.scrollTo({
        x: nextIndex * (width - 28),
        animated: true,
      });

      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <View className="mb-6">
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        className="w-full h-48 rounded-xl"
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const index = Math.round(offsetX / (width - 28));
          setActiveIndex(index);
        }}
      >
        {banners.map((banner, index) => (
          <View
            key={index}
            style={{ width: width - 28 }}
            className="relative h-48 bg-gray-200 overflow-hidden"
          >
            <Image
              source={{ uri: banner.image }}
              className="w-full h-full"
              resizeMode="cover"
            />

            <View className="absolute inset-0 bg-black/40" />

            <View className="absolute bottom-4 left-4">
              <Text className="text-2xl font-bold text-white">
                {banner.title}
              </Text>
              <Text className="text-sm text-white">{banner.subtitle}</Text>

              <TouchableOpacity
                className="mt-2 bg-white px-4 py-2 rounded-full self-start"
                onPress={() => router.push("/(tabs)/favorites")}
              >
                <Text className="text-sm font-semibold text-primary">
                  Shop Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Pagination */}
      <View className="flex-row justify-center mt-3 gap-2">
        {banners.map((_, index) => {
          const isActive = index === activeIndex;

          return (
            <View
              key={index}
              style={{
                height: 10,
                width: isActive ? 24 : 10,
                borderRadius: 5,
                backgroundColor: isActive ? "#FF6C00" : "#D1D5DB",
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default BannerSlider;
