import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';


export interface NavProps {
    Title: string,
    Chat: boolean;

    OpenSettingFunc: () => void | null; 

}

const NavBar = (props: NavProps) => {
    return (
        <View style={styles.navBar}>
            {/* Button 1 before text */}
            <TouchableOpacity style={styles.buttonContainerRight} onPress={props.OpenSettingFunc}>
                <Image source={require('../assets/icons/settings.png')} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.navText}>Rosa</Text>
            {/* Button 2 on the right side */}
            <TouchableOpacity style={styles.buttonContainerLeft} onPress={() => {}}>
                <Image source={require('../assets/icons/verify.png')} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#272727',
        height: 60,
        paddingHorizontal: 10,
    },
    navText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'left',
        flex: 1, // Allows the text to expand and take remaining space
    },
    buttonContainerRight: {
        marginRight: 10,
        // marginVertical: 'auto',
    },
    buttonContainerLeft: {
        marginLeft: 'auto', // Pushes the button to the rightmost position
    },
    icon: {
        width: 25, // Adjust width as needed
        height: 25, // Adjust height as needed
        // backgroundColor: 'white',
        tintColor: 'white', // Adjust tint color as needed
    },
});

export default NavBar;
