import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { CartItemProps } from "@/constants/types";
import { Ionicons } from "@expo/vector-icons";

const CartItem = ({ item, onRemove, onUpdateQuantity }: CartItemProps) => {
  const imageUrl = item?.product?.images?.[0];

  const isMinQty = item.quantity <= 1;

  return (
    <View className="bg-white rounded-xl p-3 mb-4 shadow-sm border border-gray-100 flex-row">
      {/* Product Image */}
      <View className="w-24 h-36 rounded-lg bg-gray-100 overflow-hidden mr-3">
        <Image
          source={{ uri: imageUrl || "https://via.placeholder.com/150" }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Details */}
      <View className="flex-1 justify-between">
        {/* Top Section */}
        <View>
          <Text
            numberOfLines={1}
            className="text-base font-semibold text-gray-800"
          >
            {item?.product.name}
          </Text>

          <Text className="text-sm text-gray-500 mt-1">
            Size: {item?.size ?? ""}
          </Text>

          {/* Quantity Stepper */}
          <View className="flex-row items-center mt-3">
            {/* Decrease */}
            <TouchableOpacity
              disabled={isMinQty}
              onPress={() =>
                onUpdateQuantity && onUpdateQuantity(item.quantity - 1)
              }
              activeOpacity={0.7}
              className={`w-9 h-9 rounded-full items-center justify-center ${
                isMinQty ? "bg-gray-200" : "bg-red-500"
              }`}
            >
              <Ionicons
                name="remove"
                size={18}
                color={isMinQty ? "#999" : "#fff"}
              />
            </TouchableOpacity>

            {/* Quantity */}
            <Text className="mx-4 text-base font-semibold text-gray-800">
              {item.quantity}
            </Text>

            {/* Increase */}
            <TouchableOpacity
              onPress={() =>
                onUpdateQuantity && onUpdateQuantity(item.quantity + 1)
              }
              activeOpacity={0.7}
              className="w-9 h-9 bg-green-500 rounded-full items-center justify-center"
            >
              <Ionicons name="add" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Section */}
        <View className="flex-row items-center justify-between mt-3">
          {/* Price */}
          <Text className="text-lg font-bold text-primary">
            ${item?.product?.price.toFixed(2)}
          </Text>

          {/* Remove */}
          <TouchableOpacity
            onPress={onRemove}
            activeOpacity={0.7}
            className="flex-row items-center bg-gray-800 px-3 py-2 rounded-lg"
          >
            <Ionicons name="trash-outline" size={18} color="red" />
            <Text className="text-white font-semibold ml-1">Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
