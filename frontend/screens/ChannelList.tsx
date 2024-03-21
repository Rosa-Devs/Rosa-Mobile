import { FlatList, Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import { models } from "../models/manifest";
import ChannelListGenerator from "../items/ChannelListGenerator";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { ListManifest } from "../api/api";


const ChannelList = ({}) => {
  const { colors } = useTheme()
  const [manifests, setManifests] = useState<models.Manifest[]>([]);
  const navigate = useNavigation()

  const fetchManifests = async () => {
    try {
      // Perform your database query here to fetch manifests
      // For demonstration purposes, I'm using a dummy array
      const data: models.Manifest[] | null = await ListManifest();
      if ( data !== null ) {
        setManifests(data);
      }
    } catch (error) {
      console.error('Error fetching manifests:', error);
    }
  };

  useEffect(() => {
    // Fetch manifests when the component mounts
    fetchManifests();

    const unsubscribe = navigate.addListener('focus', () => {
      // The screen is focused
      // Call any action
      fetchManifests();
    });
  }, []);

  // console.log(manifests)

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
  ];

  return (
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <View>
          <ChannelListGenerator manifests={manifests}></ChannelListGenerator>
          <Text style={[styles.helpText, {color: colors.text}]}>Click on the pencil to start chatting.</Text>
        </View>
          {/* @ts-ignore */}
          <TouchableOpacity onPress={() => navigate.navigate('Create')} style={[styles.addButton]}>
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

  // const testData: models.Manifest[] = [
  //   {
  //     name: 'Manifest 1',
  //     uid: '1rftg6yhnu',
  //     pubsub: 'PubSub 1',
  //     chiper: 'Chiper 1',
  //     optional: 'Optional 1',
  //   },
  //   {
  //     name: 'Manifest 2',
  //     uid: '2rf5tg6bhy',
  //     pubsub: 'PubSub 2',
  //     chiper: 'Chiper 2',
  //     optional: 'Optional 2',
  //   },
  //   {
  //     name: 'Manifest 1',
  //     uid: '1yrtb6h',
  //     pubsub: 'PubSub 1',
  //     chiper: 'Chiper 1',
  //     optional: 'Optional 1',
  //   },
  //   {
  //     name: 'Manifest 2',
  //     uid: '245765',
  //     pubsub: 'PubSub 2',
  //     chiper: 'Chiper 2',
  //     optional: 'Optional 2',
  //   },
  // ];