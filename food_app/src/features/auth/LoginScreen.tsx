import { View, Text, StatusBar, Platform, Image, Animated, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useStyles } from 'react-native-unistyles'
import { loginStyles } from '@unistyles/authStyles'
import CustomText from '@components/global/CustomText'
import BreakerText from '@components/ui/BreakerText'
import PhoneInput from '@components/ui/PhoneInput'
import { resetAndNavigate } from '@utils/NavigationUtils'
import SocialLogin from '@components/ui/SocialLogin'
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight'

const LoginScreen: FC = () => {

  const { styles } = useStyles(loginStyles)
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const keyboardOffsetHeight = useKeyboardOffsetHeight();

  useEffect(() => {
    if (keyboardOffsetHeight == 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start()
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.25,
        duration: 500,
        useNativeDriver: true
      }).start()
    }
  }, [keyboardOffsetHeight])

  const handleLogin = async () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      resetAndNavigate('UserBottomTab')
    }, 2000)
  };

  return (
    // <View style={styles.container}>

    //   <StatusBar hidden={Platform.OS !== 'android'} />
    //   <Image source={require('@assets/images/login.png')}
    //     style={styles.cover}
    //   />
    //   <Animated.ScrollView
    //     style={{ transform: [{ translateY: animatedValue }] }}
    //     keyboardDismissMode="on-drag"
    //     bounces={false}
    //     keyboardShouldPersistTaps="handled"
    //     contentContainerStyle={styles.bottomContainer}
    //   >
    //     <CustomText fontFamily="Okra-Bold" variant="h2" style={styles.title}>
    //       Pakista's #1 Food Delivery And App Dining App
    //     </CustomText>
    //     <BreakerText text='log in or sign up' />
    //     <PhoneInput
    //       onFocus={() => { }}
    //       onBlur={() => { }}
    //       value={phone}
    //       onChangeText={setPhone}
    //     />
    //     <TouchableOpacity
    //       style={styles.buttonContainer}
    //       disabled={loading}
    //       onPress={handleLogin}
    //       activeOpacity={0.8}

    //     >
    //       {
    //         loading ? (
    //           <ActivityIndicator size="small" color="#fff" />
    //         ) : (
    //           <CustomText color="#fff" fontFamily="Okra-Medium" variant="h5">Continue</CustomText>
    //         )
    //       }
    //     </TouchableOpacity>

    //     <BreakerText text='or' />
    //     <SocialLogin />
    //   </Animated.ScrollView>

    //   {/* <View style={styles.footer}>
    //     <CustomText>By continuing, you agree to our</CustomText>
    //     <View style={styles.footerTextContainer}>
    //       <CustomText style={styles.footerText}>Terms Of Service</CustomText>
    //       <CustomText style={styles.footerText}>Privacy Policy</CustomText>
    //       <CustomText style={styles.footerText}>Content Policies</CustomText>
    //     </View>
    //   </View> */}
    //   {keyboardOffsetHeight === 0 && (
    //     <View style={styles.footer}>
    //       <CustomText>By continuing, you agree to our</CustomText>
    //       <View style={styles.footerTextContainer}>
    //         <CustomText style={styles.footerText}>Terms Of Service</CustomText>
    //         <CustomText style={styles.footerText}>Privacy Policy</CustomText>
    //         <CustomText style={styles.footerText}>Content Policies</CustomText>
    //       </View>
    //     </View>
    //   )}

    // </View>

    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0} // fine-tune if needed
    >
      <View style={styles.container}>

        <StatusBar hidden={Platform.OS !== 'android'} />
        <Image source={require('@assets/images/login.png')}
          style={styles.cover}
        />
        <Animated.ScrollView
          style={{ transform: [{ translateY: animatedValue }] }}
          keyboardDismissMode="on-drag"
          bounces={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.bottomContainer}
        >
          <CustomText fontFamily="Okra-Bold" variant="h2" style={styles.title}>
            Pakista's #1 Food Delivery And App Dining App
          </CustomText>
          <BreakerText text='log in or sign up' />
          <PhoneInput
            onFocus={() => { }}
            onBlur={() => { }}
            value={phone}
            onChangeText={setPhone}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            disabled={loading}
            onPress={handleLogin}
            activeOpacity={0.8}

          >
            {
              loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <CustomText color="#fff" fontFamily="Okra-Medium" variant="h5">Continue</CustomText>
              )
            }
          </TouchableOpacity>

          <BreakerText text='or' />
          <SocialLogin />
        </Animated.ScrollView>

        {keyboardOffsetHeight === 0 && (
          <View style={styles.footer}>
            <CustomText>By continuing, you agree to our</CustomText>
            <View style={styles.footerTextContainer}>
              <CustomText style={styles.footerText}>Terms Of Service</CustomText>
              <CustomText style={styles.footerText}>Privacy Policy</CustomText>
              <CustomText style={styles.footerText}>Content Policies</CustomText>
            </View>
          </View>
        )}

      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen