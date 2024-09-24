import { GoogleInputProps } from "@/types/type";
import { Text, View } from "react-native";

export default function GoogleTextInput({
     icon, 
     initialLocation, 
     containerStyle, 
     textStyle, 
     onChangeText, 
     textInputBackgroundColor,
     handlePress}: GoogleInputProps){

     return (
          <View className={`flex flex-row items-center justify-center relative x-50 rounded-xl mb-5 ${containerStyle}`}>
               <Text>Search</Text>
          </View>
     )
}