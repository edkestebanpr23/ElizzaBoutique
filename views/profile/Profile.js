import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Container, Thumbnail, Grid, Left, Right, Row, Col, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import gS from "../../styles/globalStyles";
import { turquose as color } from "../../data/colors";
import { profileView as dic } from "../../data/languague";
import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../../context/global/globalContext";
import ImagePicker from "react-native-image-crop-picker";
import FirebaseContext from "../../context/firebase/firebaseContext";
// import * as firebase from 'firebase';


const Profile = () => {

    // Global Context
    const { iLang, user } = useContext(GlobalContext);
    console.log('usuario ..>', user);
    // console.log(uuid())
    const { firebase } = useContext(FirebaseContext);
    console.log(firebase)

    // React Navigation
    const navigation = useNavigation();

    const uploadImage = (image) => {

        const ext = image.path.split('.').pop(); // Extract image extension
        const filename = `${1}.${ext}`; // Generate unique name
        // this.setState({ uploading: true });
        console.log(filename);
        firebase.storage().ref(`user/profile/${filename}`).putFile(image.path)
        // .ref(`user/profile/${filename}`)
        // .putFile(image.path)
        // .on(
        //     firebase.storage.TaskEvent.STATE_CHANGED,
        //     snapshot => {
        //         //   let state = {};
        //         //   state = {
        //         //     ...state,
        //         //     progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
        //         //   };
        //         if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
        //             console.log('Subidaaaa');
        //             // const allImages = this.state.images;
        //             // allImages.push(snapshot.downloadURL);
        //             // state = {
        //             //   ...state,
        //             //   uploading: false,
        //             //   imgSource: '',
        //             //   imageUri: '',
        //             //   progress: 0,
        //             //   images: allImages
        //             // };
        //             // AsyncStorage.setItem('images', JSON.stringify(allImages));
        //         }
        //         //   this.setState(state);
        //     },
        //     error => {
        //         unsubscribe();
        //         console.log('Error al subir...');
        //     }
        // );
    };


    const open = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            uploadImage(image);
        });
    };

    return (
        <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
            <Container style={gS.container}>

                <View style={styles.photoContainer}>
                    <View style={styles.photoView}>
                        <Image
                            style={styles.photo}
                            source={{ uri: user.img }}
                        />
                    </View>
                    <View style={styles.photoView}>
                        <View style={styles.info}>
                            <View>
                                <Text style={styles.textInfo}>
                                    <Icon name='map' size={30} color='red' />
                                    <Text style={styles.textInfoRes}> Colombia</Text>
                                </Text>
                            </View>
                            <Text style={styles.textInfoRes}>Bogotá, Cundinamarca</Text>
                            <Text style={styles.textInfo}>Iglesia:
                                <Text style={styles.textInfoRes}> Centro</Text>
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.description}>
                    <Text style={styles.textDescription}>{user.description} </Text>
                </View>
                <Button full color={color.grad[7]} onPress={open}>
                    <Text>Foto</Text>
                </Button>
            </Container>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    photoContainer: {
        flexDirection: 'row'
    },
    photoView: {
        flexBasis: '50%', // Así toma solo la mitad de la pantalla
        // flexWrap: 'wrap'
    },
    photo: {
        width: '100%',
        height: 200
    },
    description: {
        marginHorizontal: 5,
        marginTop: 5,
    },
    textDescription: {
        fontSize: 16
    },
    info: {
        paddingVertical: 5,
        marginHorizontal: 5
    },
    infoItem: {
        marginBottom: 10
    },
    textInfo: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    textInfoRes: {
        fontWeight: 'normal',
        marginBottom: 5
    }
})

export default Profile;