import { View, Text, StatusBar, Image, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { useStyles } from 'react-native-unistyles'
import { splashStyles } from '@unistyles/authStyles'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { resetAndNavigate } from '@utils/NavigationUtils'
const SplashScreen = () => {
  const { styles } = useStyles(splashStyles);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      resetAndNavigate('LoginScreen');
    }, 3000)

    return () => clearTimeout(timeoutId);
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar hidden={Platform.OS !== 'android'} />
      <Image
        source={require('@assets/images/khanjiFood_t.png')}
        style={styles.logoImage}
      />
      <Animated.View style={styles.animatedContainer}
        entering={FadeInDown.delay(400).duration(800)}
      >
        <Image
          source={require('@assets/images/tree.png')}
          style={styles.treeImage}
        />
        <Text
          style={styles.msgText}
        >
          From our kitchen to your home cravings served fresh!
        </Text>
      </Animated.View>
    </View>
  )
}

export default SplashScreen;