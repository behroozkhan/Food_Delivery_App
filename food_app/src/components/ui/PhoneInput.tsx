import { View, Text, Pressable, TextInput } from 'react-native'
import React, { FC } from 'react'
import { useStyles } from 'react-native-unistyles';
import { phoneStyles } from '@unistyles/phoneStyles';
import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import { Colors } from 'react-native/Libraries/NewAppScreen';


interface PhoneInputprops {
    value: string;
    onChangeText: (text:string) => void;
    onFocus?: ()=> void;
    onBlur?: ()=> void;
}

const PhoneInput: FC<PhoneInputprops> = ({
    value,
    onChangeText,
    onBlur,
    onFocus,
}) => {
    const {styles} = useStyles(phoneStyles)
  return (
    <View style={styles.container}>
     <Pressable style={styles.countryPickerContainer}>

        <CustomText variant="h2">🇵🇰</CustomText>
        <Icon
        iconFamily="Ionicons"
        name="caret-down-sharp"
        color={Colors.lightText}
        size={18}
        />
     </Pressable>
     <View style={styles.phoneInputContainer}>
        <CustomText fontFamily="Okra-Bold">+92</CustomText>
    <TextInput
    placeholder="Enter Mobile Number"
    keyboardType="phone-pad"
    value={value}
    maxLength={10}
    placeholderTextColor={Colors.lightText}
    onChangeText={onChangeText}
    onFocus={onFocus}
    style={styles.input}
    />
     </View>
    </View>
  )
}

export default PhoneInput