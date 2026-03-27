import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/context/WishListContext";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Favorites = () => {
  const { wishlist } = useWishlist();
  const router = useRouter();
  return (
    <>
      <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
        <Header showBack title="Favorites" showCart />

        {wishlist.length > 0 ? (
          <ScrollView
            className="flex-1 px-4 mt-4"
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-row flex-wrap justify-between">
              {wishlist.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </View>
          </ScrollView>
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text>Your wishlist is empty</Text>

            <TouchableOpacity onPress={() => router.push("/")} className="mt-4">
              <View className="bg-primary px-4 py-2 rounded-md">
                <Text className="text-white font-bold">Shop Now</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default Favorites;
