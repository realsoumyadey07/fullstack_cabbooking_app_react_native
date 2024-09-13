import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const onLoginPress = async () => {};
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[200px]">
          <Image
            source={images.signUpCar}
            className="z-0 w-full h-[200px]"
            resizeMode="cover"
          />
          <Text className="text-2xl text-gray-600   font-bold bottom-10 left-5">
            Signin with Your Account
          </Text>
        </View>
        <View className="px-5">
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            labelStyle=""
            value={form.email}
            onChange={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            labelStyle=""
            value={form.password}
            secureTextEntry
            onChange={(value) => setForm({ ...form, password: value })}
            isPassword
          />
          <CustomButton
            onPress={onLoginPress}
            title="Login"
            className="mt-8"
          />
          {/* OAuth */}
          <OAuth/>
          <Link href={"/signup"} className=" text-center mt-4">
               <Text>Don't have an account? </Text>
               <Text className="text-blue-400 font-bold">Sign Up</Text>
          </Link>
        </View>
        {/* Verification Modal */}
      </View>
      <StatusBar style="dark" />
    </ScrollView>
  );
};

export default Login;
