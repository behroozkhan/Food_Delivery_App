import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '@unistyles/Constants';
import { retry } from '@reduxjs/toolkit/query';
import Icon from '@components/global/Icon';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/global/CustomText';


const ReportItem: FC<{
    iconName: string;
    underline?: boolean;
    title: string;
    price: number;
}> = ({ underline = false, iconName, title, price }) => {
    return (
        <View style={[styles.flexRowBetween, { marginBottom: 10 }]}>
            <View style={styles.flexRow}>
                <Icon
                    iconFamily="MaterialIcons"
                    name={iconName}
                    size={RFValue(12)}
                    color={Colors.lightText}
                />
                <CustomText
                    style={{
                        textDecorationLine: underline ? 'underline' : 'none',
                        textDecorationStyle: 'dashed',
                    }}
                    variant="h6"
                >
                    {title}
                </CustomText>
            </View>
            <CustomText variant="h6">Rs {price}</CustomText>
        </View>
    )
}

const BillDetails: FC<{ totalItemPrice: number }> = ({ totalItemPrice }) => {
    return (
        <View style={styles.container}>
            <CustomText style={styles.text} fontFamily="Okra-Bold">
                Bill Details
            </CustomText>

            <View style={styles.billContainer}>
                <ReportItem
                    iconName="article"
                    title="Items total"
                    price={totalItemPrice}
                />
                <ReportItem
                    iconName="pedal-bike"
                    title="Delivery Charge"
                    price={29}
                />
                <ReportItem
                    iconName="shopping-bag"
                    title="handling charge"
                    price={2}
                />
                <ReportItem
                    iconName="cloudy-showing"
                    title="Surge Charge"
                    price={3}
                />
            </View>

            <View style={[{ marginBottom: 15 }, styles.flexRowBetween]}>
                <CustomText variant="h6" style={styles.text} fontFamily="Okra-Bold">
                    Grand Total
                </CustomText>
                <CustomText style={styles.text} fontFamily="Okra-Bold">
                    Rs {totalItemPrice + 34}
                </CustomText>
            </View>

        </View>
    )
}

export default BillDetails;

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    text: {
        marginHorizontal: 10,
        marginTop: 15
    },
    billContainer: {
        padding: 10,
        paddingBottom: 0,
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.7
    },
    flexRowBetween: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    flexRow: {
        gap: 5,
        alignItems: 'center',
        flexDirection: 'row'
    }
})