import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { FC, memo } from 'react'
import { useStyles } from 'react-native-unistyles';
import { foodStyles } from '@unistyles/foodStyles';
import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import { Colors } from '@unistyles/Constants';
import AddButton from './AddButton';

const FoodCard: FC<{ item: any; restaurant: any }> = ({ item, restaurant }) => {
    const { styles } = useStyles(foodStyles);
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Image
                    source={
                        item?.isVeg
                            ? require('@assets/icons/veg.png')
                            : require('@assets/icons/non_veg.png')
                    }
                    style={styles.vegIcon}
                />
                <CustomText fontFamily="Okra-Medium" numberOfLines={1} fontSize={12}>{item?.name}</CustomText>
                <CustomText fontFamily="Okra-Medium" numberOfLines={2} fontSize={10}>{item?.description}</CustomText>
                <CustomText fontFamily="Okra-Medium" numberOfLines={1} fontSize={11}><Text>Rs</Text>{item?.price}</CustomText>
                <TouchableOpacity style={styles.addToCollectionContainer}>
                    <Icon
                        name="bookmark-outline"
                        iconFamily="Ionicons"
                        size={16}
                        color={Colors.primary}
                    />
                    <CustomText fontFamily="Okra-Medium" color="#888" fontSize={9.5}>Add to Collection</CustomText>
                </TouchableOpacity>
            </View>

            <View style={styles.imageContainer}>
                <View style={styles.image}>
                    <Image source={{ uri: item?.image }} style={styles.foodImage} />
                    <AddButton item={item} restaurant={restaurant} />
                </View>
            </View>
        </View>
    );
};

export default memo(FoodCard);