import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '@state/reduxHook';
import { useStyles } from 'react-native-unistyles';
import { modelStyles } from '@unistyles/modelStyles';
import { updateCustomizableItem } from '@state/reducers/CartSlice';
import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import { Colors } from '@unistyles/Constants';
import DottedLine from '@components/ui/DottedLine';
import ScalePress from '@components/ui/ScalePress';
import { RFValue } from 'react-native-responsive-fontsize';
import AnimatedNumber from 'react-native-animated-numbers';


function transformSelectedOtions(selectedOption: any, customizationOptions: any,
) {
  return Object.entries(selectedOption).map(([type, index]) => {
    const customization = customizationOptions?.find(
      (option: any) => option.type === type,
    );
    if (!customization || !customization?.options[index as number]) {
      throw new Error(`Invalid customization type or index for ${type}`);
    }
    return {
      type,
      selectedOption: customization?.options[index as number],
    };
  });
};


const EditItemModal: FC<{ item: any; restaurant: any; onClose: () => void; cus: any; }> = ({
  item,
  restaurant,
  onClose,
  cus,
}) => {

  const dispatch = useAppDispatch();
  const { styles } = useStyles(modelStyles);
  const [data, setData] = useState({
    quantity: cus?.quantity,
    price: cus?.cartPrice,
    selectedOption: {} as Record<string, number>,
  });


  useEffect(() => {
    const defaultSelectedOption: Record<string, number> = {};


    cus?.customizationOptions?.forEach((cusOption: any) => {
      const itemCustomization = item?.customizationOptions?.find(
        (option: any) => option.type === cusOption?.type
      )
      if (itemCustomization) {
        const selectedIndex = itemCustomization?.options?.findIndex(
          (option: any) => option?.name === cusOption?.selectedOption?.name,
        );
        if (selectedIndex !== -1) {
          defaultSelectedOption[cusOption?.type] = selectedIndex;
        };
      };
    });

    setData(prevData => ({
      ...prevData,
      selectedOption: defaultSelectedOption,
    }))
  }, [item, cus]);


  const calculatePrice = (
    quantity: number,
    selectedOption: Record<string, number>,
  ) => {
    const basePrice = item?.price || 0;
    let customizationPrice = 0;

    Object.keys(selectedOption).forEach(type => {
      const optionIndex = selectedOption[type];
      const optionPrice = item?.customizationOptions?.find((c: any) => c.type === type)?.options?.[optionIndex]?.price || 0;
      customizationPrice += optionPrice;
    });

    return (basePrice + customizationPrice) * quantity;
  };

  const selectOptionHandler = (type: string, index: number) => {
    setData(prevData => {
      const updatedSelectedOption = { ...prevData.selectedOption, [type]: index };
      const updatedPrice = calculatePrice(
        prevData?.quantity,
        updatedSelectedOption,
      );
      return {
        ...prevData,
        selectedOption: updatedSelectedOption,
        price: updatedPrice
      };
    });
  };


  const addCartHandler = () => {
    setData(prevData => ({
      ...prevData,
      quantity: prevData?.quantity + 1,
      price: calculatePrice(prevData?.quantity + 1, prevData?.selectedOption),
    }));
  };


  const removeCartHandler = () => {
    if (data?.quantity > 1) {
      setData(prevData => ({
        ...prevData,
        quantity: prevData?.quantity - 1,
        price: calculatePrice(prevData?.quantity - 1, prevData?.selectedOption),
      }));
    } else {
      onClose();
    }
  };


  const updateItemIntoCart = async () => {
    const customizationOptions = transformSelectedOtions(
      data?.selectedOption,
      item?.customizationOptions,
    ).sort((a, b) => a.type.localeCompare(b.type));

    const customizedData = {
      restaurant_id: restaurant?.id,
      itemId: item?.id,
      customizationId: cus?.id,
      newCustomization: {
        quantity: data?.quantity,
        price: data?.price,
        customizationOptions: customizationOptions,
      },
    };
    dispatch(updateCustomizableItem(customizedData));
    onClose();
  }

  console.log(item?.customizationOptions)


  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.flexRowGap}>
          <Image source={{ uri: item?.image }} style={styles.headerImage} />
          <View>
            <CustomText fontFamily="Okra-Medium" fontSize={12}>
            {item?.name}
          </CustomText>
          <CustomText fontFamily="Okra-Medium" fontSize={9}>
            Edit
          </CustomText>
          </View>
        </View>

        <View style={styles.flexRowGap}>
          <TouchableOpacity style={styles.icon}>
            <Icon name="bookmark-outline" iconFamily="Ionicons" color={Colors.primary} size={16} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Icon name="share-outline" iconFamily="Ionicons" color={Colors.primary} size={16} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {
          item?.customizationOptions?.map((customization: any, index: number) => {
            return (
              <View style={styles.subContainer} key={index}>
                <CustomText fontFamily="Okra-Medium">
                  {customization?.type}
                </CustomText>
                <CustomText fontFamily="Okra-Medium" variant='h7' color='#888'>
                  {customization?.required
                    ? 'Required Select any 1 option'
                    : `Add on your ${customization?.type}`
                  }
                </CustomText>
                <DottedLine />
                {
                  customization?.options?.map((option: any, i: number) => {
                    return (
                      <TouchableOpacity key={i} style={styles.optionContainer} onPress={() => { selectOptionHandler(customization?.type, i) }}>
                        <CustomText fontFamily="Okra-Medium" fontSize={11}>
                          {option?.name}
                        </CustomText>
                        <View style={styles.flexRowGap}>
                          <CustomText fontFamily="Okra-Medium" fontSize={11}>
                            <Text>Rs.</Text>{option?.price}
                          </CustomText>
                          <Icon name={data?.selectedOption[customization.type] === i
                            ? 'radiobox-marked'
                            : 'radiobox-blank'
                          }
                            iconFamily="MaterialCommunityIcons"
                            color={
                              data?.selectedOption[customization.type] === i
                                ? Colors.active
                                : '#888'
                            }
                            size={16}
                          />
                        </View>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            )
          })
        }
      </ScrollView>

      <View style={styles.footerContainer}>
        <View style={styles.selectedContainer}>
          <ScalePress onPress={removeCartHandler}>
            <Icon iconFamily="MaterialCommunityIcons" color={Colors.active} name="minus-thick" size={RFValue(13)} />
          </ScalePress>
          <AnimatedNumber includeComma={false}
            animationDuration={300}
            animateToNumber={data?.quantity}
            fontStyle={styles.animatedCount} />
          <ScalePress onPress={addCartHandler}>
            <Icon
              iconFamily="MaterialCommunityIcons" color={Colors.active} name="plus-thick" size={RFValue(13)} />
          </ScalePress>
        </View>
        <TouchableOpacity style={styles.addButtonContainer} onPress={updateItemIntoCart}>
          <CustomText color='#fff' fontFamily="Okra-Medium" variant='h5'>
            Update Item - Rs {data?.price}
          </CustomText>
        </TouchableOpacity>
        <SafeAreaView />
      </View>
    </View>
  )
}

export default EditItemModal;