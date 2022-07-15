import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
export default function SearchBar({cityHandler}) {
    return (
        <View style={{ marginTop: 15, flexDirection: 'row' }}>
            <GooglePlacesAutocomplete 
                query={{key: 'PUT YOUR OWN KEY'}}
                onPress={(data, details = null) => {
                    const city = data.description.split(',')[0];
                    cityHandler(city)
                }}
                placeholder="Search"
                styles={{
                    textInput: { backgroundColor: "#eee", borderRadius: 20, fontWeight: "700", marginTop: 7 },
                    textInputContainer:
                        { backgroundColor: "#eee", borderRadius: 50, flexDirection: "row", alignItems: "center", marrginRight: 10 },
                }} 
                renderLeftButton = {() =>  (<View><Ionicons name="location-sharp" size={24} /></View>)}
                renderRightButton = {() => (<View style= {{
                    flexDirection: 'row',
                    marginRight: 8,
                    backgroundColor:"white",
                    padding: 9,
                    borderRadius:30,
                    alignItems: "center"
                }}><AntDesign name="clockcircle" size={11} style={{marginRight:6}}></AntDesign><Text>Search</Text></View>)}
                />
        </View>
    )
}
