import { StackActions, useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, TextInput, Button, Image, StyleSheet, Alert, TouchableOpacity, ToastAndroid } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Optional from '../models/optional';
import RNFetchBlob from 'rn-fetch-blob';
import { AddManifest, CreateNewAccount, CreateNewManifest } from '../api/api';

const CreateAccount: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [name, setName] = useState('');
    const { colors } = useTheme()
    const navigation = useNavigation()
    const popAction = StackActions.pop(1);

    const selectImage = async () => {
        try {
            ImagePicker.openPicker({
                width: 512,
                height: 512,
                cropping: true,
                cropperCircleOverlay: true,
                cropperChooseText: 'Select',
                cropperCancelText: 'Cancel',
                includeBase64: true,
            }).then(image => {
                // @ts-ignore
                setImage(`data:${image.mime};base64,${image.data}`);
            });
        
        } catch (error) {
        if (ImagePicker.clean) {
            ImagePicker.clean();
        }
        Alert.alert('Error', 'Failed to pick image');
        }
    };
    

    const handleSave = async () => {


        const res = await CreateNewAccount({name: name, avatar: image !== null ? image : 'BASE64' })

        if (typeof res === 'string') {
            console.error('Error:', res);
        } else if (typeof res === 'number') {
            console.log('Authorized:', res);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create new account</Text>
            <TouchableOpacity style={styles.selectImageButton} onPress={selectImage}>
                {image ? (
                <Image source={{ uri: image }} style={styles.avatarImage} />
                ) : (
                <Image source={require('../assets/icons/user.png')} style={styles.avatarImage}/>
                )}
            </TouchableOpacity>
            <TextInput
                style={[styles.input, { color: colors.text}]}
                placeholder="Nickname"
                onChangeText={(text) => setName(text)}
                value={name}
            />
            <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: name && image ? '#4a90e2' : '#ccc' }, {backgroundColor: colors.card}]}
                onPress={handleSave}
                disabled={!name || !image}
            >
                <Text style={styles.saveButtonText}>Create</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  selectImageButton: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  saveButton: {
    width: '70%',
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#4a90e2',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  saveButtonText: {
    fontSize: 16,
    // color: 'white',
    fontWeight: 'bold',
  },
});

export default CreateAccount;

