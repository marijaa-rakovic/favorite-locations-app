import React from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';

const PlaceDetailScreen = props => {
    const placeId = props.navigation.getParam('placeId');
    const selectedPlace = useSelector(state =>
        state.places.places.find(place => place.id === placeId)
    );

    const selectedLocation = { lat: selectedPlace.lat, lng: selectedPlace.lng };

    const showMapHandler = () => {
        props.navigation.navigate('Map', {
            readonly: true,
            initialLocation: selectedLocation
        });
    };

    return (
        <View>
            <ScrollView contentContainerStyle={styles.scroll}>
                <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
                <View style={styles.locationContainer}>
                    <View style={styles.addressContainer}>
                        <Text style={styles.address}>{selectedPlace.address}</Text>
                    </View>
                </View>
                <MapPreview
                    style={styles.mapPreview}
                    location={selectedLocation}
                    onPress={showMapHandler}
                />
            </ScrollView>
        </View>

    );
};

PlaceDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('placeTitle')
    };
};

const styles = StyleSheet.create({
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
        backgroundColor: '#ccc'
    },
    locationContainer: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        marginLeft: 20
    },
    addressContainer: {
        padding: 20,
    },
    address: {
        color: Colors.accent,
        textAlign: 'center'
    },
    mapPreview: {
        width: '100%',
        maxWidth: 350,
        height: 300,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginLeft: 5
    },
    scroll: {
        justifyContent: 'center',
    }
});

export default PlaceDetailScreen;
