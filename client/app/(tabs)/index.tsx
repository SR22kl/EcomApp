import { BANNERS, dummyProducts } from "@/assets/assets";
import Header from "@/components/Header";
import BannerSlider from "@/components/BannerSlider";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CATEGORIES } from "@/constants";
import CategoryItem from "@/components/CategoryItem";
import { router, useRouter } from "expo-router";
import { Product } from "@/constants/types";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/NewsLetter";

const Home = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const categories = [{ id: "all", name: "All", icon: "grid" }, ...CATEGORIES];

  const fetchProducts = async () => {
    setProducts(dummyProducts);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      {/* Header */}
      <Header showMenu showCart showLogo title="Forever" />

      <ScrollView className="flex-1 px-4">
        {/* Banner Slider */}
        <BannerSlider banners={BANNERS} />

        {/* Categories */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-primary">Categories</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat: any) => (
              <CategoryItem
                key={cat.id}
                item={cat}
                isSelected={false}
                onPress={() =>
                  router.push({
                    pathname: "/",
                    params: { category: cat.id === "all" ? "" : cat.name },
                  })
                }
              />
            ))}
          </ScrollView>
        </View>

        {/* Popular Products */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-primary">Popular</Text>
            <TouchableOpacity onPress={() => router.push("/shop")}>
              <Text className="text-sm text-secondary">See All</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size={"large"} />
          ) : (
            <View className="flex-row justify-between flex-wrap">
              {products.slice(0, 4).map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </View>
          )}
        </View>

        {/* NewsLetter CTA  */}
        <Newsletter />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
