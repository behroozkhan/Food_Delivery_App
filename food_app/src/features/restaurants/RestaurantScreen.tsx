import { View, Text, Platform, FlatList } from 'react-native'
import React, { FC } from 'react'
import { useRoute } from '@react-navigation/native'
import { useStyles } from 'react-native-unistyles';
import { restaurantHeaderStyles } from '@unistyles/restuarantStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import SortigAndFilters from '@components/Home/SortigAndFilters';
import { restaurantItemsData, restaurantsItemfiltersOption } from '@utils/dummyData';
import RestauranHeader from '@components/restaurant/RestauranHeader';
import DottedLine from '@components/ui/DottedLine';
import FoodCard from '@components/restaurant/FoodCard';

const RestaurantScreen: FC = () => {

  const route = useRoute() as any;
  const restaurant = route?.params?.item;
  const { styles } = useStyles(restaurantHeaderStyles);
  const insets = useSafeAreaInsets();

  const renderItem = ({item}: any)=>{
    return(
      <FoodCard item={item} restaurant={restaurant}/>
    )
  }

  return (
    <>
      <View style={{ height: Platform.OS === 'android' ? insets.top : 0 }} />
      <CustomSafeAreaView>

        <RestauranHeader title={restaurant?.name} />

        <View style={styles.sortingContainer}>
          <SortigAndFilters
            menuTitle='Filter'
            options={restaurantsItemfiltersOption}
          />
        </View>
        <FlatList
          data={restaurantItemsData}
          renderItem={renderItem}
          scrollEventThrottle={16}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => (
            <View style={styles.mainPadding}>
              <DottedLine />
            </View>
          )}
        />
      </CustomSafeAreaView>
    </>
  )
}

export default RestaurantScreen