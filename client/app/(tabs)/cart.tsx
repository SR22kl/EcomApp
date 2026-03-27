import Header from "@/components/Header";
import CartItem from "@/components/CartItem"; // 👈 NEW
import { useCart } from "@/context/CartContext";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Cart = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();
  const shipping = 2.99;
  const Total = cartTotal + shipping;
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <Header showBack showCart title="My Cart" />

      {cartItems.length > 0 ? (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="px-4 mt-4"
          >
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={() => removeFromCart(item.id, item.size)}
                onUpdateQuantity={(q) => updateQuantity(item.id, q, item.size)}
              />
            ))}
          </ScrollView>

          <View className="px-4 pb-6 pt-2 bg-white border-t border-gray-200 rounded-t-2xl">
            {/* Summary Card */}
            <View className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              {/* Subtotal */}
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-sm text-gray-500">Subtotal</Text>
                <Text className="text-sm font-medium text-gray-800">
                  ${cartTotal.toFixed(2)}
                </Text>
              </View>

              {/* Shipping */}
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-sm text-gray-500">Shipping</Text>
                <Text className="text-sm font-medium text-gray-800">
                  ${shipping.toFixed(2)}
                </Text>
              </View>

              {/* Divider */}
              <View className="h-[1px] bg-gray-200 my-3" />

              {/* Total */}
              <View className="flex-row justify-between items-center">
                <Text className="text-base font-semibold text-gray-800">
                  Total
                </Text>
                <Text className="text-xl font-bold text-primary">
                  ${Total.toFixed(2)}
                </Text>
              </View>
            </View>

            {/* Checkout Button */}
            <TouchableOpacity
            // onPress={()=> router.push("/checkout")}
              activeOpacity={0.85}
              className="bg-primary mt-4 py-4 rounded-full items-center justify-center shadow-md"
            >
              <Text className="text-white text-base font-bold">
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text>Your cart is empty</Text>

          <TouchableOpacity onPress={() => router.push("/")} className="mt-4">
            <View className="bg-primary px-4 py-2 rounded-md">
              <Text className="text-white font-bold">Shop Now</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;
