import { View, Text } from 'react-native'
import React, { FC } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

interface IconsProps{
    color?: string;
    size: number;
    name: string;
    iconFamily: 'Ionicons' | 'MaterialCommunityIcons' | 'MaterialIcons'
}

const Icon: FC<IconsProps>  = ({
    color,
    size,
    name,
    iconFamily
}) => {
  return (
   <>
   {
    iconFamily == 'Ionicons' && (
        <Ionicons name={name} size={size} color={color}/>
    )
   }
   {
    iconFamily == 'MaterialIcons' && (
        <MaterialIcons name={name} size={size} color={color}/>
    )
   }
   {
    iconFamily == 'MaterialCommunityIcons' && (
        <MaterialCommunityIcons name={name} size={size} color={color}/>
    )
   }
   </>
  )
}

export default Icon;