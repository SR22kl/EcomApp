import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Product } from "@/constants/types";
import { useWishlist } from "@/context/WishListContext";
import { dummyProducts } from "@/assets/assets";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import ProductImageSlider from "@/components/ProductImageSlider";
import { useCart } from "@/context/CartContext";
import Toast from "react-native-toast-message";

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart, cartItems, itemCount } = useCart();

  const fetchProduct = async () => {
    setProduct(dummyProducts.find((p) => p._id === id) as Product);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Product not found</Text>
      </SafeAreaView>
    );
  }

  const isLiked = isInWishlist(product._id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      Toast.show({
        type: "info",
        text1: "No Size Selected",
        text2: "Please select a size",
      });
      return;
    }

    addToCart(product, selectedSize || "");
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Product Image Slider */}
        <ProductImageSlider images={product.images} />

        {/* Header Actions */}
        <View className="absolute top-12 left-4 right-4 flex-row justify-between items-center z-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-white/60 rounded-full justify-center items-center"
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toggleWishlist(product)}
            className="w-10 h-10 bg-white/60 rounded-full justify-center items-center"
          >
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={isLiked ? COLORS.accent : COLORS.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Product info */}
        <View className="px-5">
          {/* Title & Ratings */}
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-2xl font-semibold text-primary flex-1 mr-4">
              {product.name}
            </Text>
            <View className="flex-row justify-between items-start mb-2">
              <Ionicons name="star" size={18} color={"#FF5F15"} />
              <Text className="text-md font-bold text-primary ml-1">4.8</Text>
              <Text className="text-md font-bold text-secondary ml-1">
                (20)
              </Text>
            </View>
          </View>
          {/* Price */}
          <Text className="text-2xl font-bold text-primary mb-6">
            ${product.price.toFixed(2)}
          </Text>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <View>
              <Text className="text-base font-bold text-gray-900 mb-1">
                Select Size
                {selectedSize && (
                  <Text className="text-base text-gray-500 mb-2">
                    {":"}
                    <Text className="font-semibold text-primary">
                      &nbsp;{selectedSize}
                    </Text>
                  </Text>
                )}
              </Text>

              <View className="flex-row flex-wrap gap-2 mb-4">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;

                  return (
                    <TouchableOpacity
                      key={size}
                      onPress={() =>
                        setSelectedSize((prev) => (prev === size ? null : size))
                      }
                      className={`px-4 py-2 rounded-md border ${
                        isSelected
                          ? "bg-primary border-primary"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      <Text
                        className={`text-sm font-semibold ${
                          isSelected ? "text-white" : "text-gray-700"
                        }`}
                      >
                        {size}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Description */}
          <Text className="text-base font-bold text-primary mb-2">
            Description
          </Text>
          <Text className="text-secondary leading-6 mb-6">
            {product.description}
          </Text>
        </View>
      </ScrollView>

      {/* Add to Cart */}
      <View className="absolute bottom-14 left-4 right-4 bg-white rounded-2xl px-3 py-3 shadow-lg border border-gray-100 flex-row items-center">
        {/* Add to Cart Button */}
        <TouchableOpacity
          onPress={handleAddToCart}
          className="flex-1 bg-primary flex-row py-4 rounded-xl justify-center items-center active:scale-95"
        >
          <Ionicons name="bag-outline" size={20} color="#fff" />
          <Text className="text-white text-base font-bold ml-2">
            Add to Cart
          </Text>
        </TouchableOpacity>

        {/* Cart Icon */}
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/cart")}
          className="ml-3 w-12 h-12 bg-gray-200 rounded-xl justify-center items-center active:scale-95"
        >
          <Ionicons name="cart-outline" size={24} color="#000" />

          {/* Badge */}
          {cartItems.length > 0 && (
            <View className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-primary rounded-full justify-center items-center">
              <Text className="text-white text-[10px] font-bold">
                {itemCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetails;
