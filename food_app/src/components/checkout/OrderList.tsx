import { View, Text, Image, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import CustomText from '@components/global/CustomText';
import MiniFoodCard from '@components/restaurant/MiniFoodCard';
import NonCustomizableCard from './NonCustomizableCard';
import { Colors } from '@unistyles/Constants';

const OrderList: FC<{
    restaurant: any,
    cartItems: any;
    totalItems: number
}> = ({ cartItems, restaurant, totalItems }) => {
    return (
        <View style={styles.container}>
            <View style={styles.flexRow}>
                <View style={styles.imgContainer}>
                    <Image source={require('@assets/icons/clock.png')} style={styles.img} />
                </View>
                <View>
                    <CustomText fontSize={12} fontFamily="Okra-Bold">
                        Delivery in 30 minutes
                    </CustomText>
                    <CustomText style={{ opacity: 0.5 }} variant='h6' fontFamily="Okra-Medium">
                        Shipment of {totalItems} item
                    </CustomText>
                </View>
            </View>

            {cartItems?.map((item: any, index: any) => {
                return (
                     <View key={index} style={styles.subContainer}>
                        { item?.isCustomizable ? (
                            <>
                                {item?.customizations?.map((cus: any, idx: number) => {
                                    return (
                                        <MiniFoodCard
                                            cus={cus}
                                            item={item}
                                            key={idx}
                                            restaurant={restaurant}
                                        />
                                    );
                                })}
                            </>
                        ) : (
                            <NonCustomizableCard item={item} restaurant={restaurant} />
                        )}
                    </View>
                );
            })}

        </View>
    )
}

export default OrderList;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 15
    },
    subContainer: {
        margin: 10,
    },
    img: {
        width: 30,
        height: 30,
    },
    imgContainer: {
        backgroundColor:Colors.background_light,
        padding:10,
        borderRadius:15,
    },
    flexRow:{
        alignItems:'center',
        flexDirection:'row',
        gap:12,
        paddingHorizontal:10,
        paddingVertical:12,
    },
});