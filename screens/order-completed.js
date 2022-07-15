import React from 'react'
import { useSelector } from 'react-redux';
import { SafeAreaView, Text, View,ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import safeAndroidView from '../components/safe-android-view';
import { useEffect } from 'react';
import firebase from '../firebase'
import { useState } from 'react';
import MenuItems from '../components/restaurant-detail/menu-items';
import { query, orderBy, limit, onSnapshot, doc } from "firebase/firestore";

export default function OrderCompleted() {
    const [lastOrder, setLastOrder] = useState({
        items: [{
            title: 'Tandoori Chicken',
            description: 'Amazing Indian dish with tenderloin chicken off the sizzles ',
            price: '$19.20',
            image: 'http:/i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg'
        }],
    })
    const { items, restaurantName } = useSelector((state) => state.cartReducer.selectedItems);

    const total = items
        .map((item) => Number(item.price.replace('$', '')))
        .reduce((prev, curr) => prev + curr, 0);

    const totalUSD = `$${total}`;

    useEffect(() => {
        const q = query(firebase.ordersCollection, orderBy('createdAt', 'desc'), limit(1))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docs.map((doc) => {
                setLastOrder(doc.data());
            })
        })
        return () => unsubscribe();
    }, [])
    return (
        <SafeAreaView style={safeAndroidView.androidSafeArea}>
            <View style={{
                alignItems: 'center',
                height: '100%'
            }}>
                <LottieView style={{ height: 100, alignSelf: 'center', marginBottom: 30 }}
                    source={require('../assets/animations/check-mark.json')}
                    autoPlay
                    speed={0.5}
                    loop={false} />
                <Text style={{fontSize:20, fontWeight: 'bold'}}>Your order at {restaurantName} has been placed for {totalUSD}</Text>
                <ScrollView>
                <MenuItems foods={lastOrder.items} hideCheckbox={true} />
                <LottieView style={{ height: 200, alignSelf: 'center' }}
                    source={require('../assets/animations/cooking.json')}
                    autoPlay
                    speed={0.5} />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}