import { View, Text, Platform } from 'react-native'
import React, { FC } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useStyles } from 'react-native-unistyles';
import { homeStyles } from '@unistyles/homeStyles';
import { useSharedState } from '@features/tabs/SharedContext';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Graphics from '@components/Home/Graphics';
import HeaderSection from '@components/Home/HeaderSection';

const DeliveryScreen: FC = () => {
  const insects = useSafeAreaInsets();
  const { styles } = useStyles(homeStyles);
  const { scrollYGlobal } = useSharedState();

  const backgroundColorChanges = useAnimatedStyle(() => {
    const opacity = interpolate(scrollYGlobal.value, [1, 50], [0, 1]);
    return {
      backgroundColor: `rgba(255,255,255,${opacity})`
    };
  });

  const moveUpStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollYGlobal.value,
      [0, 50],
      [0, -50],
      Extrapolate.CLAMP
    )
    return {
      transform: [{ translateY: translateY }]
    }
  })


  const moveUpStylNoExtrapolate = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollYGlobal.value,
      [0, 50],
      [0, -50],
    )
    return {
      transform: [{ translateY: translateY }]
    }
  })

  return (
    <View style={styles.container}>
      <View style={{ height: Platform.OS === 'android' ? insects.top : 0 }} />
      
      <Animated.View style={moveUpStyle}>
      
        <Animated.View style={moveUpStylNoExtrapolate}>
          <Graphics />
        </Animated.View>
      
        <Animated.View style={[backgroundColorChanges, styles.topHeader]}>
          <HeaderSection />
        </Animated.View>
        
      </Animated.View>
      
      <Animated.View style={moveUpStyle}></Animated.View>
    </View>
  )
}

export default DeliveryScreen;