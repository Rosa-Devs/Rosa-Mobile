import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChannelList from '../screens/ChannelList';
import Chat from '../screens/Chat';
import { Button, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import CreateNewChannel from '../screens/CreateNewChannel';

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
                headerRight: () =>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => {}} style={{ paddingRight: 15}}>
                        <Image source={require('../assets/icons/share.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                        <Image source={require('../assets/icons/delete.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
                ,
            }}
            // options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen
            name='Create'
            component={CreateNewChannel}
            options={{
                title: 'Create new channel',
                headerStyle: {
                    backgroundColor: '#272727',
                },
                headerTintColor: '#fff',
            }}
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