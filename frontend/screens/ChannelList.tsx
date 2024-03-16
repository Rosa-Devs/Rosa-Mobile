import { FlatList, Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import { models } from "../models/manifest";
import ChannelListGenerator from "../items/ChannelListGenerator";
import React from "react";
import { useTheme } from "@react-navigation/native";


const ChannelList = ({}) => {
  const { colors } = useTheme()
    const testData: models.Manifest[] = [
    {
      name: 'Manifest 1',
      uid: '1rftg6yhnu',
      pubsub: 'PubSub 1',
      chiper: 'Chiper 1',
      optional: 'Optional 1',
    },
    {
      name: 'Manifest 2',
      uid: '2rf5tg6bhy',
      pubsub: 'PubSub 2',
      chiper: 'Chiper 2',
      optional: 'Optional 2',
    },
    {
      name: 'Manifest 1',
      uid: '1yrtb6h',
      pubsub: 'PubSub 1',
      chiper: 'Chiper 1',
      optional: 'Optional 1',
    },
    {
      name: 'Manifest 2',
      uid: '245765',
      pubsub: 'PubSub 2',
      chiper: 'Chiper 2',
      optional: 'Optional 2',
    },
    // {
    //   name: 'Manifest 1',
    //   uid: '123',
    //   pubsub: 'PubSub 1',
    //   chiper: 'Chiper 1',
    //   optional: 'Optional 1',
    // },
    // {
    //   name: 'Manifest 2',
    //   uid: '2678',
    //   pubsub: 'PubSub 2',
    //   chiper: 'Chiper 2',
    //   optional: 'Optional 2',
    // },
    // {
    //   name: 'Manifest 2',
    //   uid: '2345',
    //   pubsub: 'PubSub 2',
    //   chiper: 'Chiper 2',
    //   optional: 'Optional 2',
    // },
    // {
    //   name: 'Manifest 2',
    //   uid: '2365',
    //   pubsub: 'PubSub 2',
    //   chiper: 'Chiper 2',
    //   optional: 'Optional 2',
    // },
    // {
    //   name: 'Manifest 2',
    //   uid: '2234',
    //   pubsub: 'PubSub 2',
    //   chiper: 'Chiper 2',
    //   optional: 'Optional 2',
    // },
    // Add more test data as needed
  ];

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
          <View>
            <ChannelListGenerator manifests={testData}></ChannelListGenerator>
            <Text style={[styles.helpText, {color: colors.text}]}>Click on the pencil to start chatting.</Text>
          </View>
            <TouchableOpacity style={[styles.addButton]}>
              <Image source={require('../assets/icons/edit.png')} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff', // Adjust as needed
  },
  channelListContainer: {
    flex: 1, // Ensure the ChannelListGenerator fills the remaining space
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2A2A2A', // Adjust the color as needed
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Add elevation for a shadow effect (Android)
    zIndex: 1, // Set zIndex to ensure the button is above other elements
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'white', // Adjust the color of the icon
  },
  helpText: {
    marginTop: 5,
    textAlign: 'center',
    opacity: 0.6,
  }
});


export default ChannelList