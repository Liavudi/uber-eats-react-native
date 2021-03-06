import { View, Text, Image } from 'react-native'
import React from 'react'
  
 export default function About(props) {
    const { name, image, price, reviews, rating, categories } = props.route.params;
    const formattedCategories = categories.map((cat)=> cat.title).join(' · ')
    
    const description = `${formattedCategories} ${price? ' · ' + price: ''} · 🎫 · ${rating} ⭐ (${reviews}+)`;
  return (
    <View style={{backgroundColor: 'lightgrey'}}>
      <RestaurantImage image={image} />
      <RestaurantTitle title={name}/>
      <View style={{marginBottom: 10}}>
      <RestaurantDescription description={description} />
      </View>
    </View>
  )
}

const RestaurantImage = (props) => (
    <Image source={{uri: props.image}} style={{width:'100%', height:180}}/>
)

const RestaurantTitle = (props) => (
    <Text style={{
        fontSize:29,
        fontWeight:'600',
        marginTop:10,
        marginHorizontal:15
    }}>{props.title}</Text>
)
const RestaurantDescription = (props) => (
    <Text style={{
        marginTop:10,
        marginHorizontal: 15,
        fontWeight: '400',
        fontSize: 15.5
    }}>{props.description}</Text>
)