import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return;
    }

    Alert.alert("Subscribed 🎉", "You are now subscribed!");
    setEmail("");
  };

  return (
    <View className="mb-8 bg-white rounded-2xl p-5 shadow-md">
      {/* Title */}
      <Text className="text-xl font-bold text-gray-900">Stay Updated ✨</Text>

      {/* Subtitle */}
      <Text className="text-gray-500 mt-1">
        Get the latest deals, trends & exclusive offers directly in your inbox.
      </Text>

      {/* Input */}
      <View className="mt-4 flex-row items-center bg-gray-100 rounded-full px-4">
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          className="flex-1 py-3 text-gray-800"
          keyboardType="email-address"
        />
      </View>

      {/* Button */}
      <TouchableOpacity
        onPress={handleSubscribe}
        className="mt-4 bg-primary py-3 rounded-full items-center"
      >
        <Text className="text-white font-semibold text-base">Subscribe Now!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Newsletter;
