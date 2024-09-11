import { onboarding } from "@/constants";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const OnBoarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeItem, setActiveItem] = useState(0);
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/signup")}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black  font-JakartaBold font-bold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#e2e8f0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286ff] rounded-full" />
        }
        onIndexChanged={(index) => setActiveItem(index)}
      >
        {onboarding.map((item: any) => (
          <View>
               <Text>{item.title}</Text>
          </View>
        ))}
      </Swiper>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default OnBoarding;
