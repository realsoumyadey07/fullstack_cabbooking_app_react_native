import { icons } from "@/constants";
import { InputFieldProps } from "@/types/type";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  Platform,
  Keyboard,
  TouchableOpacity,
} from "react-native";

const InputField = ({
  labelStyle,
  label,
  placeholder,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  isPassword,
  ...props
}: InputFieldProps) => {
  const [passwordHide, setPasswordHide] = useState(false);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}
            <TextInput
              className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
              secureTextEntry={!passwordHide && secureTextEntry}
              {...props}
              placeholder={placeholder}
            />
            {isPassword && (
              <TouchableOpacity onPress={()=> setPasswordHide(!passwordHide)}>
                <Image
                  source={icons.eyecross}
                  className="w-6 h-6 mr-4"
                  
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
