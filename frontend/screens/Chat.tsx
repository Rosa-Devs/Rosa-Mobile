import { Text, View } from "react-native";



const Chat = ({ route, navigation }: any) => {
  // Access the manifest passed as params
  const { manifest } = route.params;

  console.log(manifest)

  return (
    <View>
      <Text>Manifest Name: {manifest.name}</Text>
      <Text>Manifest UID: {manifest.uid}</Text>
      {/* Render other properties of the manifest as needed */}
    </View>
  );
};

export default Chat;
