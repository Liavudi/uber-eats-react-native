import { View, Text } from 'react-native'
import React from 'react'
import About from '../components/restaurant-detail/about'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import MenuItems from '../components/restaurant-detail/menu-items'
import ViewCart from '../components/restaurant-detail/view-cart'

const foods = [
  {
      title: 'Hamburger is Life',
      description: 'Hamburger that will feed you by itself, "what a beautiful taste" they said. ',
      price: '$20',
      image: 'https://img.freepik.com/free-photo/side-view-double-cheeseburger-with-grilled-beef-patties-cheese-lettuce-leaf-burger-buns_141793-4883.jpg?w=2000'
  },
  {
      title: 'Steak is Heaven',
      description: 'This beautiful dish will make you feel like an angel, trust me you dont want to miss this 🔥🔥🔥🔥',
      price: '$40',
      image: 'https://more.ctv.ca/food/recipes/gochujang-steak-with-charred-green-onions-/_jcr_content/root/responsivegrid_1778395324/responsivegrid_182136378/featuredmedia.coreimg.jpeg/1646422391954/143311-flank-steak-mmie22.jpeg'
  },
  {
      title: 'Salad of Eternity',
      description: 'Eat this salad and you\'ll be living the rest of your life happily!',
      price: '$0', 
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
      title: 'Salmon of Doom',
      description: 'What else can i say? EAT IT EAAAAAAT IT! ',
      price: '$15',
      image: 'https://natashaskitchen.com/wp-content/uploads/2012/06/Baked-Salmon-3-600x900.jpg'
  },
  {
      title: 'Tandoori Chicken',
      description: 'Amazing Indian dish with tenderloin chicken off the sizzles ',
      price: '$19.20',
      image: 'http:/i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg'
  },
]

export default function RestaurantDetail( {route, navigation}) {
  return (
    <View style={{flex:1}}>
      <About route={route}/>
      <Divider width={1.8}/>
      <MenuItems  restaurantName={route.params.name} foods={foods}/>
      <ViewCart navigation={navigation} />
    </View>
  )
}