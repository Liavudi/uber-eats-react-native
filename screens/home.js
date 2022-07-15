import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTabs from '../components/home/header-tabs'
import SearchBar from '../components/home/search-bar'
import RestaurantItems, {localRestaurants} from '../components/home/restaurant-items'
import BottomTabs from '../components/home/bottom-tabs'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import safeAndroidView from '../components/safe-android-view'
const YELP_API_KEY = "PUT YOUR KEY"

export default function Home( {navigation}) {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [activeTab, setActiveTab] = useState("Delivery")
  const [city, setCity] = useState('San Antonio')
  const getRestaurantFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`
  
  const apiOptions = {
    headers: {
      Authorization: `Bearer ${YELP_API_KEY}`,
    },
  };
  return fetch(yelpUrl, apiOptions).then((res) => res.json())
  .then((json) => setRestaurantData(
    json.businesses.filter(
    (business) => business.transactions.includes(activeTab.toLowerCase()))))
  };
 
  useEffect(() => {getRestaurantFromYelp()}, [city, activeTab])
  return (
    <SafeAreaView
    style={safeAndroidView.androidSafeArea}>
      <View style={{backgroundColor:"white"}}>
      <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
      <RestaurantItems restaurantData={restaurantData} navigation={navigation} />
      </ScrollView>
      <Divider width={1}/>
      <BottomTabs />
    </SafeAreaView>
  )
}
