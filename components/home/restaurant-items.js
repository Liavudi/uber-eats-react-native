import { View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export const localRestaurants = [{
    name: 'BSR',
    image_url: 'https://imageproxy.wolt.com/venue/5fe885c98a73939d6e104778/e712da94-9e05-11ec-8baa-0281bc0b3a45_____.jpg',
    categories: ['Fast Food', 'Bar'],
    price: '$$',
    reviews: 119,
    ratings: 3.2,
}, 
{
   name: 'Ruben',
   image_url: "https://www.rubenisrael.co.il/warehouse/dynamic/73159.png",
   categories: ['Hamburger', 'Bar'],
   price: '$$$',
   reviews: 124,
   ratings: 4.9,
},
{
   name: 'Miyo Sushi',
   image_url: "https://media-cdn.tripadvisor.com/media/photo-s/1a/21/d9/ab/miyo-sushi-restaurant.jpg",
   categories: ['Sushi', 'Bar'],
   price: '$$',
   reviews: 1244,
   ratings: 5,
},
{
   name: 'Farmhouse Kitchen Thai Cuisine',
   image_url: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80",
   categories: ['Cafe', 'Bar'],
   price: '$$$',
   reviews: 1244,
   ratings: 4.5,
},
]


export default function RestaurantItems({navigation, ...props}) {
    return (
        <>
        {props.restaurantData.map((restaurant, key) => (
            <TouchableOpacity key={key} activeOpacity={1} style={{marginBottom:30}}
            onPress={() => navigation.navigate('RestaurantDetail', {
                name: restaurant.name,
                image: restaurant.image_url,
                price: restaurant.price,
                reviews: restaurant.review_count,
                rating: restaurant.rating,
                categories: restaurant.categories
            })}>
            <View style={{marginTop: 10, padding: 15,}}>
                <RestaurantImage image={restaurant.image_url}/>
                <RestaurantInfo name={restaurant.name}  rating={restaurant.rating}/>
              
            </View>
            </TouchableOpacity>
        ))}
        </>
    )
};

const RestaurantImage = (props) => (
    <>
    <Image 
    source={{ uri: props.image }} 
     style={{width:"100%", height:180}} ></Image>
    <TouchableOpacity style={{position:"absolute", right: 20, top: 20}}>
        <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
    </TouchableOpacity>
    </>
);
const RestaurantInfo = (props) => (
    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems: "center", marginTop: 10}}>
    <View>
    <Text style={{fontSize: 15, fontWeight: "bold"}}>{props.name}</Text>
    <Text style={{fontSize: 13, color: "gray"}}>35-45 · min </Text>
    </View>
    <View  style={{backgroundColor:'white', height:30, width:30, justifyContent:"center"}}>
    <Text>{props.rating}</Text>
    </View>
</View>

);