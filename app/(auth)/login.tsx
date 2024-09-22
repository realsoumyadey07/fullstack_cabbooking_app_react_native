import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";

export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const onLoginPress = useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, form.email, form.password]);
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
            onChange={(value) => setForm({ ...form, email: value.nativeEvent.text })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            labelStyle=""
            value={form.password}
            secureTextEntry
            onChange={(value) => setForm({ ...form, password: value.nativeEvent.text })}
            isPassword
          />
          <CustomButton
            onPress={onLoginPress}
            title="Login"
            className="mt-8"
          />
          {/* OAuth */}
          <OAuth />
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

