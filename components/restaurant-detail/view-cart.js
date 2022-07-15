import { View, Text, TouchableOpacity, Modal, StyleSheet,ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import OrderItem from './order-item';
import {addToCollection} from '../../firebase';
import LottieView from 'lottie-react-native';

export default function ViewCart({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    
    const [loading, setLoading] = useState(false);

    const {items, restaurantName} = useSelector((state) => state.cartReducer.selectedItems);

    const total = items
        .map((item) => Number(item.price.replace('$', '')))
        .reduce((prev, curr) => prev + curr, 0);

    const totalUSD = `$${total}`;

    const addOrderToFireBase = () => {
        setLoading(true)
        let orderInfo = {items: items, restaurantName: restaurantName}
        addToCollection(orderInfo).then(() => {
            setTimeout(() => {
                setLoading(false)
                navigation.navigate("OrderCompleted")
            }, 2500)
        })
    };

    const styles = StyleSheet.create({
        modalContainer: {
            flex:1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.7)'
        },
        modalCheckoutContainer: {
            backgroundColor: 'white',
            padding:16,
            height: 500,
            borderWidth: 1,
        },
        restaurantName: {
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 18,
            marginBottom:10,
        },
        subtotalContainer : {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop:15
        },
        subtotalText: {
            textAlign: 'left',
            fontWeight: '600',
            fontSize: 15,
            marginBottom: 10
        }
    })

    const checkModalContent = () => {
        return (
         <>
         <View style={styles.modalContainer}>
            <View style={styles.modalCheckoutContainer}>
                <Text style={styles.restaurantName}>{restaurantName}</Text>
                {items.map((item, index) => (
                    <ScrollView key={index} showsVerticalScrollIndicator={false}>
                    <OrderItem  item={item}/>
                    </ScrollView>
                ))}
                <View style={styles.subtotalContainer}>
                    <Text style={styles.subtotalText}>Total Price</Text>
                    <Text>{total ?totalUSD : ''}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center',}}>
                    <TouchableOpacity style={{
                        marginTop: 20,
                        backgroundColor: 'black',
                        alignItems: 'center',
                        padding:13,
                        borderRadius: 30,
                        width: 300,
                        position: 'relative'
                    }} onPress={() => {addOrderToFireBase(),setModalVisible(false)}}>
                    <Text style={{color:'white', fontSize: 20}}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>
         </View>
         </>
        )
    }
    return (
        <>
            <Modal animationType='slide' visible={modalVisible} transparent={true}
                onRequestClose={() => setModalVisible(false)}>
                {checkModalContent()}
            </Modal>
            {total ? (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom:6,
                    zIndex: 999,
                    alignSelf: 'center',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: '100%',
                    }}>
                        <TouchableOpacity style={{
                            marginTop: 20,
                            backgroundColor: 'black',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            padding: 15,
                            borderRadius: 30,
                            width: 300,
                            position: 'relative'
                        }}
                        onPress={() => setModalVisible(true)}>
                            <Text style={{ color: 'white', fontSize: 20, marginRight: 50 }}>View Cart</Text>
                            <Text style={{ color: 'white', fontSize: 20 }}>{totalUSD}</Text>
                        </TouchableOpacity>
                    </View>
                </View>) : (<></>)}
                {loading ? <View style={{
                    backgroundColor: 'black',
                    position: 'absolute',
                    opacity:0.6,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    width: "100%",
                    height:'100%'
                    }}>
                        <LottieView style={{height:200, alignSelf: 'center'}}
                        source={require('../../assets/animations/scanner.json')}
                        autoPlay
                        speed={3} />
                    </View> : <></>}
        </>
    )
}