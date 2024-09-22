import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal"

export default function Signup() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: ""
  })
  const onSignupPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setVerification({
        ...verification,
        state: "pending"
      })
    } catch (err: any) {
      Alert.alert("Error: ", err.errors[0].longMessage);
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      })

      if (completeSignUp.status === 'complete') {
        //TODO: create a database user!
        await fetchAPI('(api)/user', {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId
          })
        })
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: "success"
        });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed",
          state: "failed"
        })
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed"
      });
    }
  }

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
            Create Your Account
          </Text>
        </View>
        <View className="px-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            labelStyle=""
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.nativeEvent.text })}
          />
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
            onPress={onSignupPress}
            title="Signup"
            className="mt-8"
          />
          {/* OAuth */}
          <OAuth />
          <Link href={"/login"} className=" text-center mt-4">
            <Text>Already have an account? </Text>
            <Text className="text-blue-400 font-bold">Login</Text>
          </Link>
        </View>
        {/* Verification Modal */}
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() =>{ 
            if(verification.state === "success") setShowSuccessModal(true);
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaExtraBold mb-2">
              Verification
            </Text>
            <Text className="font-Jakarta mb-5">
              We've sent a verification code to {form.email}
            </Text>
            <InputField
             label="Code"
             icon={icons.lock}
             placeholder="123456"
             value={verification.code}
             onChange={(e)=> setVerification({...verification, code: e.nativeEvent.text})}
             keyboardType="numeric"
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}
            <CustomButton
            title="Verify Email"
            onPress={onPressVerify}
            className="mt-4 bg-success-500"
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[60px] h-[60px] mx-auto my-5"
            />
            <Text className="text-2xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-600 font-Jakarta text-center">
              You have successfully verified verified your account.
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => {
                setShowSuccessModal(false);
                router.push("/(root)/(tabs)/home")}}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
      <StatusBar style="dark" />
    </ScrollView>
  );
};

