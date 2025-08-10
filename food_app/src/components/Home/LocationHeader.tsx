import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { FC } from 'react'
import { useSharedState } from '@features/tabs/SharedContext'
import { useStyles } from 'react-native-unistyles';
import { homeStyles } from '@unistyles/homeStyles';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '@components/global/Icon';
import CustomText from '@components/global/CustomText';

const LocationHeader: FC = () => {

    const { scrollYGlobal } = useSharedState();
    const { styles } = useStyles(homeStyles);
    const textColor = '#fff';
    const opacityFadingStyles = useAnimatedStyle(() => {
        const opacity = interpolate(scrollYGlobal.value, [0, 80], [1, 0]);
        return {
            opacity: opacity,
        };
    });

    return (
        <Animated.View style={opacityFadingStyles}>
            <SafeAreaView />
            <View style={styles.flexRowBetween}>
                {/* 1 */}
                <View style={styles.flexRowGap}>
                    <Icon
                        name="map-marker"
                        color={textColor}
                        iconFamily="MaterialCommunityIcons"
                        size={32}
                    />
                    <View>
                        <TouchableOpacity style={styles.flexRow}>
                            <CustomText variant="h5" color={textColor} fontFamily="Okra-Bold">
                                Garden, Defence
                            </CustomText>
                            <Icon
                                name="chevron-down"
                                color={textColor}
                                iconFamily="MaterialCommunityIcons"
                                size={18}
                            />
                        </TouchableOpacity>
                        <CustomText color={textColor} fontFamily="Okra-Medium">
                            Karachi, City Of lights
                        </CustomText>
                    </View>
                </View>
                {/* 2nd */}
                <View style={styles.flexRowGap}>
                    <TouchableOpacity style={styles.translation}>
                         <Image source={require('@assets/icons/translation.png')}
                         style={styles.translationIcon} />
                        </TouchableOpacity>

                     <TouchableOpacity style={styles.profileAvatar}>
                         <Image source={require('@assets/icons/golden_circle.png')}
                         style={styles.goldenCircle} />
                          <Image source={require('@assets/images/user.jpg')}
                         style={styles.profileImage} />
                        </TouchableOpacity>
                </View>

            </View>
        </Animated.View>
    )
}

export default LocationHeader