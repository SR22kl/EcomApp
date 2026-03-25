import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

const { width } = Dimensions.get("window");

type Props = {
  images: string[];
};

const ProductImageSlider = ({ images }: Props) => {
  const scrollRef = useRef<ScrollView | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // Start auto scroll
  const startAutoScroll = () => {
    stopAutoScroll();

    intervalRef.current = setInterval(() => {
      let nextIndex = (activeIndex + 1) % images.length;

      scrollRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });

      setActiveIndex(nextIndex);
    }, 3000);
  };

  // Stop auto scroll
  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startAutoScroll();

    return () => stopAutoScroll();
  }, [activeIndex]);

  // Detect manual swipe
  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveIndex(index);
  };

  return (
    <View className="relative h-[450px] bg-gray-100 mb-6">
      {/* Slider */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        onTouchStart={stopAutoScroll}
        onTouchEnd={startAutoScroll}
      >
        {images.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={{ width: width, height: 450 }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* Pagination */}
      <View className="absolute bottom-4 left-1/2 -translate-x-1/2 flex-row">
        {images.map((_, index) => {
          const isActive = index === activeIndex;

          return (
            <View
              key={index}
              style={{
                height: 6,
                width: isActive ? 20 : 6,
                borderRadius: 3,
                marginHorizontal: 4,
                backgroundColor: isActive ? "#FF6C00" : "#D1D5DB",
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default ProductImageSlider;
