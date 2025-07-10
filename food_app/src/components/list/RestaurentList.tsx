import { View, Text, FlatList } from 'react-native'
import React from 'react'
import RestaurentCard from './RestaurentCard'
import { useStyles } from 'react-native-unistyles'
import { cardStyles } from '@unistyles/cardStyles'
import CustomText from '@components/global/CustomText'
import { recommendedListData } from '@utils/dummyData'

const RestaurentList = () => {
  const { styles } = useStyles(cardStyles);
  const renderItem = ({ item }: any) => {
    return (
      <RestaurentCard item={item} />
    )
  }
  return (
    <View>
      <CustomText
        style={styles.centerText}
        fontFamily="Okra-Bold"
        fontSize={12}
      >
        1823 Restaurents delivering to you
      </CustomText>
      <CustomText
        style={styles.centerText}
        fontFamily="Okra-Medium"
        fontSize={12}
      >
        FEATURED
      </CustomText>
      <FlatList
        data={recommendedListData}
        scrollEventThrottle={16}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={()=>{
          return(
            <View style={{justifyContent:'center',alignItems:'center',opacity:0.6}}>
              <CustomText fontFamily="Okra-Medium" variant="h1">
                Made With ❤
              </CustomText>
               <CustomText fontFamily="Okra-Medium" variant="h4">
                By - Behrooz Khan
              </CustomText>
            </View>
          )
        }}
      />
    </View>
  )
}

export default RestaurentList