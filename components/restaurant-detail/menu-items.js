import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useDispatch, useSelector } from 'react-redux'


const styles = StyleSheet.create({
    menuItemStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    titleStyle: {
        fontSize: 19,
        fontWeight: '600'
    }
})

export default function MenuItems({restaurantName, foods, hideCheckbox, marginLeft}) {
    const dispatch = useDispatch();
    const selectItem = (item, checkboxValue) => dispatch({
        type: 'ADD_TO_CART',
        payload: {
            ...item,
            restaurantName: restaurantName,
            checkboxValue: checkboxValue}
    });
    const cartItems = useSelector(state => state.cartReducer.selectedItems.items)
    const isFoodInCart = (food, cartItems) => Boolean(cartItems.find(item => item.title === food.title))
    
  return (
      <ScrollView showsVerticalScrollIndicator={false}>
        
      {foods.map((data, key) => (
        <View key={key}>
        <View style={styles.menuItemStyle}>
          {hideCheckbox? <></> : <BouncyCheckbox 
          fillColor='green'
          isChecked={isFoodInCart(data, cartItems)}
          onPress={(checkboxValue) => selectItem(data, checkboxValue)}
          />}
          <FoodInfo title={data.title} description={data.description} price={data.price} />
          <FoodImage image={data.image} marginLeft={marginLeft? marginLeft: 0}/>
        </View>
        <Divider width={0.5} orientation="vertical" style={{ marginHorizontal: 20}}/>
        </View>
      ))}
      
    </ScrollView>
  )
}

const FoodInfo = (props) => (
    <View style={{width: 240, justifyContent: 'space-evenly', }}>
        <Text style={styles.titleStyle}>{props.title}</Text>
        <Text style={{}}>{props.description}</Text>
        <Text>{props.price}</Text>
    </View>
)
const FoodImage = ({marginLeft , ...props}) => (
    <Image source={{ uri: props.image }} style={{width:110, height:100, borderRadius: 8, marginLeft}} />
)
