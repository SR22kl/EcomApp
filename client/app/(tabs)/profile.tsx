import { dummyUser } from "@/assets/assets";
import Header from "@/components/Header";
import { COLORS, PROFILE_MENU } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const Profile = () => {
  const { user } = { user: dummyUser };
  const router = useRouter();

  const handleLogout = async () => {
    // router.replace("/singn-in");
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
        <Header title="Profile" showBack showCart />

        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={
            !user
              ? { flex: 1, justifyContent: "center", alignItems: "center" }
              : { paddingTop: 10 }
          }
        >
          {!user ? (
            // Guest user screen
            <>
              <View className="flex-1 justify-center items-center px-6">
                {/* Avatar */}
                <View className="w-28 h-28 rounded-full bg-gray-200 items-center justify-center mb-2 shadow-sm">
                  <Ionicons name="person" size={40} color={COLORS.secondary} />
                </View>

                {/* Title */}
                <Text className="text-xl font-bold text-gray-800 mb-2">
                  Guest User
                </Text>

                {/* Subtitle */}
                <Text className="text-gray-500 text-center mb-6 leading-5">
                  Log in to access your profile, track orders, and manage your
                  wishlist.
                </Text>

                {/* Login Button */}
                <TouchableOpacity
                  // onPress={() => router.push("/singn-in")}
                  className="w-full bg-primary py-4 rounded-full items-center shadow-md"
                >
                  <Text className="text-white text-base font-semibold">
                    Login / Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              {/* Profile info */}
              <View className="bg-white rounded-2xl p-5 shadow-sm mb-4">
                {/* Top Section*/}
                <View className="items-center">
                  <View className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-gray-200">
                    <Image
                      source={{ uri: user.imageUrl }}
                      className="w-full h-full"
                    />
                  </View>

                  <Text className="text-lg font-bold text-gray-800">
                    {user.firstName} {user.lastName}
                  </Text>

                  <Text className="text-gray-500 text-sm">{user.email}</Text>

                  {/* Admin panel button if user is admin */}
                  {user.publicMetadata?.role === "admin" && (
                    <TouchableOpacity
                      activeOpacity={0.85}
                      // onPress={() => router.push("/admin")}
                      className="mt-4 rounded-full overflow-hidden"
                    >
                      <LinearGradient
                        colors={["#8e2de2", "#4a00e0"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }} // vertical
                        className="py-3 px-6 items-center rounded-full shadow-lg"
                      >
                        <Text className="text-white font-bold text-base">
                          Admin Panel 🚀
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Divider */}
                <View className="h-[1px] bg-gray-100 my-4" />

                {/* Info Rows */}
                <View className="gap-4">
                  {/* User ID */}
                  <View className="flex-row items-center justify-between">
                    <Text className="text-gray-500">User ID</Text>
                    <Text className="text-gray-800 font-medium">
                      {user._id.slice(-6)}
                    </Text>
                  </View>

                  {/* Role */}
                  <View className="flex-row items-center justify-between">
                    <Text className="text-gray-500">Role</Text>
                    <Text className="text-gray-800 font-medium capitalize">
                      {user.role}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Menu */}
              <View className="bg-white rounded-2xl p-1 shadow-sm">
                {PROFILE_MENU.map((item, index) => {
                  const isLast = index === PROFILE_MENU.length - 1;
                  return (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => router.push(item.route as any)}
                      className={`flex-row items-center justify-between px-3 py-4 rounded-xl ${
                        !isLast ? "border-b border-gray-100" : ""
                      }`}
                    >
                      {/* Left Side */}
                      <View className="flex-row items-center gap-3">
                        <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center border border-gray-300 shadow-md">
                          <Ionicons
                            name={item.icon as any}
                            size={18}
                            color={COLORS.primary}
                          />
                        </View>

                        <Text className="text-gray-800 font-medium text-[15px]">
                          {item.title}
                        </Text>
                      </View>

                      {/* Right Arrow */}
                      <Ionicons name="chevron-forward" size={18} color="#bbb" />
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Logout Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleLogout}
                className="w-full mt-4 mb-4 rounded-full overflow-hidden"
              >
                <LinearGradient
                  colors={["#8e2de2", "#4a00e0"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  className="py-4 rounded-full items-center flex-row justify-center gap-2"
                >
                  <Ionicons name="log-out-outline" size={18} color="#fff" />

                  <Text className="text-white text-base font-semibold">
                    Logout
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Profile;
