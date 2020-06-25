import React, { useState, useContext } from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, ScrollView, Image } from 'react-native';
import { Container, Form, Input, Button, Item, Label, Text, H1, Toast } from "native-base";
import Icon from "react-native-vector-icons/AntDesign";
import gS from "../../styles/globalStyles";
import { turquose as color } from "../../data/colors";
import { singupView as dic } from "../../data/languague";
import { useNavigation } from "@react-navigation/native";
import PickerLocation from "../../components/PickerLocation";
// import FirebaseContext from "../../context/firebase/firebaseContext";
// import * as firebase from 'firebase';
// import ImagePicker from "react-native-image-crop-picker";


// Apollo
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/petitions";

import UploadImage from "../../components/UploadImage";


const SingUp = ({ route }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRe, setPasswordRe] = useState('');
    const [country, setCountry] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(false);
    const [region, setRegion] = useState({
        country: '',
        selectedCountry: false,
        iContry: null,
        hasStates: false,
        state: '',
        iState: null,
        selectedState: false
    });
    const [_message, setMessage] = useState(null);
    const [urlImage, setUrlImage] = useState(null);

    // React Navigation
    const navigation = useNavigation();
    // Firebase Context
    // const { firebase } = useContext(FirebaseContext);

    // Apollo Mutation
    const [createUser] = useMutation(CREATE_USER);

    const { iLang } = route.params;

    /**
     * Functions
     */

    //  Cerrar teclado al oprimir la pantalla cuando el teclado esté abierto
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const showAlert = () => {
        Toast.show({
            text: _message,
            buttonText: 'Ok',
            duration: 4000,
            position: 'top'
        });
        setTimeout(() => {
            setMessage(null);
        }, 4000);
    };

    // Función para registrar un usuario
    const singUp = async () => {
        // console.log(name + " ___ " + email + " ___ " + password + " ___ " + passwordRe + " ___ " + selectedCountry)
        // Validar datos del formulario
        if (name === '' || email === '' || password === '' || passwordRe === '' || selectedCountry === '') {
            console.log("Todos los datos son obligatorios");
            return;
        }

        if (passwordRe !== password) {
            console.log('Las contraseñas no coinciden');
            return;
        }

        // Almacenar en servidor
        try {
            const { data } = await createUser({
                variables: {
                    input: {
                        name: name,
                        email: email,
                        password: password
                    }
                }
            });

            // Mostrar mensaje de éxito
            if (data.createUser) {
                setMessage(dic.createUser[iLang]);
            }

            // Redireccionar a inicio de Sesion
            navigation.goBack();

        } catch (error) {
            // setMessage(null);
            console.log('Error::', error);
            if (error.message == 'GraphQL error: exist') {
                setMessage(dic.errorExist[iLang]);
            } else {
                setMessage(dic.error[iLang]);
            }
        }


    };


    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard} style={{ flex: 1 }}>
            <Container style={[gS.containerColor]}>
                <ScrollView style={{ backgroundColor: color.grad[5], flex: 1 }}>
                    <View style={{ marginTop: 40 }}>
                        <H1 style={gS.title}>{dic.title[iLang]} </H1>
                        <View style={{ paddingHorizontal: 20 }}>
                            <UploadImage color={color} setUrlImage={setUrlImage} iLang={iLang} />
                        </View>

                        {/* {urlImage && <Image source={{ uri: urlImage }} style={{ width: 400, height: 400 }} />} */}

                        <Form>
                            <Item floatingLabel underline={false} style={styles.itemForm} >
                                <Label style={styles.label}>{dic.name[iLang]}</Label>
                                <Input
                                    placeholder={dic.email[iLang]}
                                    placeholderTextColor={color.grad[4]}
                                    style={[styles.input, { textTransform: 'capitalize' }]}
                                    onChangeText={text => setName(text.replace(/(^\w|\s\w)/g, m => m.toUpperCase()))}
                                    value={name}
                                />
                            </Item>
                            <Item floatingLabel underline={false} style={styles.itemForm} >
                                <Label style={styles.label}>{dic.email[iLang]}</Label>
                                <Input
                                    placeholder={dic.email[iLang]}
                                    placeholderTextColor={color.grad[4]}
                                    style={styles.input}
                                    keyboardType='email-address'
                                    onChangeText={text => setEmail(text.toLocaleLowerCase())}
                                    value={email}
                                />
                            </Item>
                            <Item floatingLabel underline={false} style={styles.itemForm}>
                                <Label style={styles.label}>{dic.password[iLang]}</Label>
                                <Input
                                    placeholder={dic.password[iLang]}
                                    placeholderTextColor={color.grad[4]}
                                    style={styles.input}
                                    secureTextEntry={true}
                                    onChangeText={text => setPassword(text)}
                                    value={password}
                                />
                            </Item>
                            <Item floatingLabel underline={false} style={styles.itemForm}>
                                <Label style={styles.label}>{dic.passwordAgain[iLang]}</Label>
                                <Input
                                    placeholder={dic.password[iLang]}
                                    placeholderTextColor={color.grad[4]}
                                    style={styles.input}
                                    secureTextEntry={true}
                                    onChangeText={text => setPasswordRe(text)}
                                    value={passwordRe}
                                />
                            </Item>

                            {
                                !selectedCountry ? (
                                    <View>
                                        <Text style={styles.textPicker}>{dic.selectCountry[iLang]}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flexBasis: '85%', alignSelf: 'center' }} >
                                                <PickerLocation
                                                    country={country}
                                                    setCountry={setCountry}
                                                />
                                            </View>
                                            <View style={{ flexBasis: '15%', alignSelf: 'center' }} >
                                                <TouchableWithoutFeedback onPress={() => setSelectedCountry(true)} >
                                                    <Icon name='pluscircle' size={24} color={color.grad[9]} style={{ alignSelf: 'center' }} />
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                    </View>
                                ) : (
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flexBasis: '85%', alignSelf: 'center' }} >
                                                <Item floatingLabel underline={false} style={styles.itemForm} >
                                                    <Label style={styles.label}>{dic.country[iLang]}</Label>

                                                    <Input
                                                        placeholder={dic.email[iLang]}
                                                        placeholderTextColor={color.grad[4]}
                                                        style={styles.input}
                                                        value={country}
                                                        disabled={true}
                                                    />
                                                </Item>
                                            </View>
                                            <View style={{ flexBasis: '15%', alignSelf: 'center' }} >
                                                <TouchableWithoutFeedback onPress={() => setSelectedCountry(false)} >
                                                    <Icon name='closecircle' size={24} color={color.grad[9]} style={{ alignSelf: 'center' }} />
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                    )
                            }


                        </Form>

                        <Button rounded block style={gS.button} onPress={singUp}>
                            <Text style={gS.textButton}>{dic.register[iLang]}</Text>
                        </Button>

                        <View style={{ marginTop: 40, alignItems: "center", marginBottom: 80 }}>
                            <Text style={styles.text}> {dic.registerText[iLang]}</Text>
                            <Text onPress={() => navigation.goBack()} style={[styles.text, styles.textHere]}> {dic.here[iLang]} </Text>
                        </View>
                        {
                            _message && showAlert()
                        }
                    </View>
                </ScrollView >
            </Container>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.grad[5],
        flex: 1,
        paddingHorizontal: '2.5%'
    },
    centerVerticalView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    title: {
        // textTransform: 'uppercase',
        fontWeight: 'bold',
        color: color.grad[0],
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 0
    },
    button: {
        backgroundColor: color.grad[9],
        marginTop: 30
    },
    textButton: {
        textAlign: 'center',
        alignSelf: 'center'
    },


    formView: {
        // backgroundColor: color.grad[4],
        paddingVertical: 30,
        borderRadius: 10
    },
    itemForm: {
        // paddingHorizontal: '1%',
        textAlign: 'center',
        alignSelf: 'center',
        borderColor: color.grad[0],
    },
    input: {
        color: color.grad[9],
        marginVertical: 10,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    label: {
        color: color.grad[0]
    },
    text: {
        color: color.grad[9],
        fontSize: 18
    },
    textHere: {
        fontWeight: 'bold',
    },
    textPicker: {
        color: color.grad[0],
        marginTop: 40,
        textAlign: 'center',
        fontSize: 24
    }
});

export default SingUp;