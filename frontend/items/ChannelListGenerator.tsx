import { Image, TouchableOpacity, View, Text, FlatList, StyleSheet } from "react-native";
import { models } from "../models/manifest";
import { useNavigation, useTheme } from '@react-navigation/native';
import Optional from "../models/optional";

interface ChatProps {
  manifests: models.Manifest[];
}


const ChannelListGenerator: React.FC<ChatProps> = ({ manifests }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  // console.log(manifests)
  const renderManifestItem = ({ item }: { item: models.Manifest }) => {
    
    let optionalImage = null;
    // console.log(item.optional.toString())
    if (item.optional) {
  try {
    // Parse the optional property to JSON
    const optionalData = JSON.parse(item.optional.toString());

    // Access the Image property from the parsed optional data
    const imageData = optionalData?.Image;

    if (!imageData || imageData === "test") {
      // Display user.png icon when Image property is "test"
      optionalImage = <Image source={require('../assets/icons/user.png')} style={styles.image} />;
    } else {
      // Decode the base64 string to a URI
      const imageUri = `${imageData}`;
      optionalImage = <Image source={{ uri: imageUri }} style={styles.image} />;
    }
  } catch (error) {
    // Display user.png icon when there's an error parsing the URI
    optionalImage = <Image source={require('../assets/icons/user.png')} style={styles.image} />;
    // console.error('Error parsing optional data:', error);
  }
} else {
  // Display user.png icon when item.optional is null or undefined
  optionalImage = <Image source={require('../assets/icons/user.png')} style={styles.image} />;
}
    // console.log(item)
    return (
        // @ts-ignore
        <TouchableOpacity style={{ backgroundColor: colors.card }} onPress={() => navigation.navigate('Chat',{ manifest: item })}>
            <View style={[styles.messageContainer, { backgroundColor: colors.card }]}>
            {/* Rounded image */}
            {optionalImage}
            <View style={styles.textContainer}>
                <Text style={[styles.messageText, { color: colors.text }]}>{item.name}</Text>
                {/* Render other properties of Manifest as needed */}
            </View>
            </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={manifests}
      renderItem={renderManifestItem}
      keyExtractor={(item) => item.uid}
    />
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center', // Align items vertically centered
    // marginVertical: 5,
    // marginHorizontal: 10,
    // borderRadius: 10,
    backgroundColor: '#101010',
    borderBottomWidth: 1,
    borderBottomColor: "#474747",
  },
  image: {
    width: 69,
    height: 69,
    borderRadius: 34.5, // half of width and height to make it rounded
    marginRight: 10,
  },
  textContainer: {
    marginVertical: 'auto',
    flex: 1,
  },
  messageText: {
    color: 'white', // Set text color to white
    fontSize: 18,
  },
});

export default ChannelListGenerator;