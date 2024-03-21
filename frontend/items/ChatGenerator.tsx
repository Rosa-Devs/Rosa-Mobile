import { View, Image, Text, StyleSheet, ScrollView } from "react-native";
import { models } from "../models/manifest";
import { useTheme } from "@react-navigation/native";
import { useEffect, useRef } from "react";



interface Props {
  messages: models.Message[];
  currentUserId: models.ProfileStorePublic | null;
}

const ChatGenerator: React.FC<Props> = ({ messages, currentUserId }) => {
  const { colors } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    // Scrolls to the bottom when messages change or component mounts
    scrollViewRef.current?.scrollToEnd({ animated: false });
  }, [messages]);

  return (
    <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollViewContent}>
      {messages.map((message, index) => (
        <View
          key={index}
          style={[
            styles.messageContainer,
            message.sender.id === currentUserId?.id ? styles.rightMessage : styles.leftMessage,
          ]}
        >
          {message.sender.id !== currentUserId?.id && (
            <View style={styles.avatarContainerRight}>
              <Image
                source={{ uri: message.sender.avatar !== '' ? message.sender.avatar : 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg' }}
                style={message.sender.id === currentUserId?.id ? styles.avatarMsg : styles.avatarUser}
              />
            </View>
          )}
          <View
            style={[
              styles.messageContent,
              { backgroundColor: message.sender.id === currentUserId?.id ? colors.card : colors.text },
            ]}
          >
            <Text style={[styles.nickname, message.sender.id === currentUserId?.id ? styles.mlAuto : styles.mrAuto, {color: colors.text}]}>
              {message.sender.name}{' '}
              <Image source={message.valid ? require('../assets/icons/valid.png') : require('../assets/icons/error.png')} style={[styles.icon]} />
            </Text>
            <Text style={[styles.messageText, {color: colors.text}]}>{message.data}</Text>
          </View>
          {message.sender.id === currentUserId?.id && (
            <View style={styles.avatarContainerLeft}>
              <Image
                source={{ uri: message.sender.avatar !== '' ? message.sender.avatar : 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg' }}
                style={message.sender.id === currentUserId?.id ? styles.avatarMsg : styles.avatarUser}
              />
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end', // Ensure avatars are aligned to the bottom
  },
  avatarContainerRight: {
    marginRight: 10,
  },
  avatarContainerLeft: {
    marginLeft: 10,
  },
  avatarMsg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarUser: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  messageContent: {
    // flex: 1,
    padding: 16,
    maxWidth: '40%',
    borderRadius: 16,
  },
  mlAuto: {
    marginLeft: 'auto',
  },
  mrAuto: {
    marginRight: 'auto',
  },
  nickname: {
    fontSize: 11,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 10,
    height: 10,
    marginLeft: 4, // Add spacing between nickname and icon
  },
  messageText: {
    fontSize: 16,
  },
  leftMessage: {
    justifyContent: 'flex-start',
  },
  rightMessage: {
    justifyContent: 'flex-end',
  },
});


export default ChatGenerator