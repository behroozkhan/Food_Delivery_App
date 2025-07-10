import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useStyles } from 'react-native-unistyles';
import { homeStyles } from '@unistyles/homeStyles';
import CustomText from '@components/global/CustomText';
import { Colors } from '@unistyles/Constants';
import Icon from '@components/global/Icon';
import BreakerText from '@components/ui/BreakerText';
import RecommendedList from './RecommendedList';
import RegularFoodList from './RegularFoodList';

const ExploreList = () => {
  const [tabSelected, setSelected] = useState(1);
  const { styles } = useStyles(homeStyles);

  return (
    <View style={styles.topHidingContainer}>
      <View style={styles.flexRowCenter}>
        <Pressable style={styles.leftTab(tabSelected === 1)}
          onPress={() => setSelected(1)}
        >
          <CustomText
            color={tabSelected == 1 ? Colors.text : Colors.lightText}
            fontFamily="Okra-Medium"
          >
            Recommeded
          </CustomText>
        </Pressable>

        <Pressable style={styles.leftTab(tabSelected == 2)}
          onPress={() => setSelected(2)}
        >
          <Icon
            name="bookmark-outline"
            iconFamily="Ionicons"
            color={tabSelected == 2 ? Colors.text : Colors.lightText}
            size={14}
          />
          <CustomText
            color={tabSelected == 2 ? Colors.text : Colors.lightText}
            fontFamily="Okra-Medium"
          >
            Collection
          </CustomText>
        </Pressable>
      </View>

      <RecommendedList />
      <BreakerText text="WHATS'S ON YOUR MIND" />
      <RegularFoodList />
      <BreakerText text="ALL RESTAURANTS" />

    </View>
  )
}

export default ExploreList


