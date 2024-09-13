import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native"

const Signup = ()=> {
     const [form, setForm] = useState({
          name: "",
          email: "",
          password: "",
     })
     return (
          <ScrollView className="flex-1 bg-white">
               <View className="flex-1 bg-white">
                    <View className="relative w-full h-[250px]">
                         <Image
                         source={images.signUpCar}
                         className="z-0 w-full h-[250px]"
                         resizeMode="cover"
                         />
                         <Text className="text-2xl text-gray-600 font-JakartaSemiBold font-bold bottom-10 left-5">Create Your Account</Text>
                    </View>
                    <View className="p-5">
                         <InputField
                          label="Name"
                          placeholder="Enter your name"
                          icon={icons.person}
                          labelStyle=""
                          value={form.name}
                          onChange={(value)=> setForm({...form, name: value})}
                          />
                         <InputField
                          label="Name"
                          placeholder="Enter your name"
                          icon={icons.person}
                          labelStyle=""
                          value={form.name}
                          onChange={(value)=> setForm({...form, name: value})}
                          />
                         <InputField
                          label="Name"
                          placeholder="Enter your name"
                          icon={icons.person}
                          labelStyle=""
                          value={form.name}
                          onChange={(value)=> setForm({...form, name: value})}
                          />
                    </View>
               </View>
               <StatusBar style="dark"/>
          </ScrollView>
     )
}

export default Signup;