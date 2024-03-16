import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChannelList from '../screens/ChannelList';
import Chat from '../screens/Chat';
import { Button, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

function RouterStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={ChannelList}
        
        options={{ 
            title: 'Rosa',
            headerStyle: {
                backgroundColor: '#272727',
            },
            headerTintColor: '#fff',
            headerRight: () => 
            <TouchableOpacity style={styles.buttonContainerLeft} onPress={() => {}}>
                <Image source={require('../assets/icons/verify.png')} style={styles.icon} />
            </TouchableOpacity>,
        }}

        />
      <Stack.Screen 
        name="Chat" 
        component={Chat}
        options={{ 
            title: 'Chat',
            headerStyle: {
                backgroundColor: '#272727',
            },
            headerTintColor: '#fff',
        }}
        // options={({ route }) => ({ title: route.params.name })}
        />
    </Stack.Navigator>
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


export default RouterStack;