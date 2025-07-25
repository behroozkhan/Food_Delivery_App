import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useAppSelector } from '@state/reduxHook';
import { selectRestaurantCartItem } from '@state/reducers/CartSlice';
import { useStyles } from 'react-native-unistyles';
import { modelStyles } from '@unistyles/modelStyles';
import CustomText from '@components/global/CustomText';
import MiniFoodCard from '@components/restaurant/MiniFoodCard';

const RemoveItemModal: FC<{
  item: any;
  restaurant: any;
  closeModal: () => void;
}> = ({ item, restaurant, closeModal }) => {
  const cartItem = useAppSelector(
    selectRestaurantCartItem(restaurant?.id, item?.id),
  );

  const { styles } = useStyles(modelStyles);


  useEffect(() => {
    if (!cartItem) {
      closeModal();
    };
  });

  return (
    <View>
      <View style={styles.noShadowHeaderContainer}>
        <View style={styles.flexRowGap}>
          <CustomText fontFamily="Okra-Bold" fontSize={13}>
            Customization for {item?.name}
          </CustomText>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles?.scrollContainerWhiteBackground} >
        {
          cartItem?.customizations?.map((cus, index) => {
            return (
              <MiniFoodCard
                item={item}
                cus={cus}
                key={cus?.id}
                restaurant={restaurant}
              />
            )
          })
        }
      </ScrollView>
      <SafeAreaView/>
    </View>
  )
}

export default RemoveItemModal