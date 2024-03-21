import { StackActions, useNavigation, useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Account, ChangeListeningDb, DeleteManifest, MessagesList, NewMessage } from "../api/api";
import { models } from "../models/manifest";
import ChatGenerator from "../items/ChatGenerator";
import { RNEventSource } from "rn-eventsource-reborn";





const Chat = ({ route, navigation }: any) => {
  // Access the manifest passed as params
  const { manifest } = route.params;
  const { colors } = useTheme();
  const navigate = useNavigation()
  const popAction = StackActions.pop(1);
  const [account, setAccount] = useState<models.ProfileStorePublic | null>(null); // State for account information
  const [messages, setMessages] = useState<models.Message[]>([]);

  const handleShare = () => {
    console.log("share")
  }



  // appendCustomMessage()

  const handleDelete = async () => {
    Alert.alert(
        'Confirm Deletion',
        'All data will be lost!',
        [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: async () => {
                    await DeleteManifest(manifest);
                    navigate.dispatch(popAction);
                },
            },
        ],
        { cancelable: false }
    );
  };

  useEffect(() => {
    const fetchAccount = async () => {
      const acc = await Account();

      // Check if the returned value is not a string before setting the state
      if (typeof acc !== 'string') {
        setAccount(acc);
      }
    };

    fetchAccount();
  }, []);

  useEffect(()=>{
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={handleShare} style={{ paddingRight: 15}}>
              <Image source={require('../assets/icons/share.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
              <Image source={require('../assets/icons/delete.png')} style={styles.icon} />
          </TouchableOpacity>
      </View>
      ),
    });
  }, [navigation])

  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (message.trim() !== '') {
      // onSendMessage(message);
      setMessage('');
      NewMessage({msg: message, manifest})
    }
  };

  const fetchMsg = async () => {
    try {
      // Make your asynchronous API call or fetch data here
      const data = await MessagesList(manifest);
      // console.log(data);

      //console.log(data[0].time)
      //console.log(new Date(data[0].time).getTime())
      if (data === null) {
        return null
      }
      data.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
      //console.log(data)
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const fetchDataInterval = async () => {
      const result = await fetchMsg();


      if (result !== null) {
        
        setMessages(result);
      }
  } // Fetch msg data

  useEffect(() => {
  // Fetch data on first run
  fetchDataInterval();
  
  // Set up interval to fetch data every 5 seconds
  const intervalId = setInterval(fetchDataInterval, 5000);

  // Clean up the interval when the component unmounts or when the dependency changes
  return () => {
    clearInterval(intervalId);
  };
}, []);

  
  

useEffect(() => {
  // Ensure manifest is available before calling ChangeListeningDb
  if (manifest) {
    ChangeListeningDb(manifest);
  }
}, [manifest]);

  

  return (
    <View style={{ flex: 1 }}>
      <ChatGenerator messages={messages} currentUserId={account} />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          value={message}
          onChangeText={setMessage}
          placeholder="Type..."
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity style={[styles.sendButton, { backgroundColor: colors.card }]} onPress={sendMessage}>
          <Image source={require('../assets/icons/send.png')} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  icon: {
      width: 25, // Adjust width as needed
      height: 25, // Adjust height as needed
      // backgroundColor: 'white',
      tintColor: 'white', // Adjust tint color as needed
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 20,
    // paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingLeft: 10,
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: '#ACACAC', // Adjust border color as needed
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderWidth: 1.2,
    borderColor: '#ACACAC', // Adjust border color as needed
  },
  sendIcon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
});

export default Chat;

function generateRandomMessages(numMessages: number): models.Message[] {
  const messages: models.Message[] = [];

  for (let i = 0; i < numMessages; i++) {
    const sender: models.ProfileStorePublic = {
      id: `user${Math.floor(Math.random() * 100)}`,
      avatar: `avatar${Math.floor(Math.random() * 10)}.jpg`,
      type: "",
      name: "",
      pub: ""
    };
    const senderid: string = sender.id;
    const data: string = generateRandomString(20); // Assuming this function is defined elsewhere
    const time: string = new Date().toISOString();
    const sign: string = generateRandomString(10); // Assuming this function is defined elsewhere
    const valid: boolean = Math.random() < 0.5; // Randomly true or false

    const message: models.Message = models.Message.createFrom({ // Call createFrom method
      datatype: 1,
      sender,
      senderid,
      data,
      time,
      sign,
      valid
    });

    messages.push(message);
  }

  return messages;
}

function generateRandomString(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}