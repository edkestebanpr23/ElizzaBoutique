import React, { useState } from 'react';
import { Image, View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { ActionSheet } from "native-base";
import Icon from "react-native-vector-icons/Entypo";
import ImagePicker from 'react-native-image-crop-picker';
import storage from "@react-native-firebase/storage";
import * as Progress from 'react-native-progress';
import { turquose as color } from "../data/colors";
import { uploadImageComp as dic } from "../data/languague";


const FirebaseStorage = storage();

const UploadImage = ({ setUrlImage, iLang }) => {
    const [imageURI, setImageURI] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [upload, setUpload] = useState(false);
    const [sourceFB, setSourceFB] = useState(null);

    // toma un ratioparámetro y luego devuelve un porcentaje redondeado
    const uploadProgress = ratio => Math.round(ratio * 100) / 100;

    // Aquí retorna la ruta de la foto
    const getFileLocalPath = image => {
        var newUrl = image.path;
        newUrl = 'file:///' + newUrl.split('/private/')[1];
        setImageURI(newUrl);
        return newUrl;
    };

    // Se obtiene el nombre de la imagen y lo retorna, este será el nombre de firebase
    const createStorageReferenceToFile = uri => {
        let fileName = uri.split('/react-native-image-crop-picker/')[1];
        fileName = 'user/img/profile/' + fileName;
        console.log('Filename: :B ', fileName);
        setSourceFB(fileName); // Actualiza la ruta de fb por si se desea eliminar la foto
        return FirebaseStorage.ref(fileName);
    };

    // Está pendiente del estado de la subida a Firebase
    const monitorFileUpload = task => {
        task.on('state_changed', snapshot => {

            // Get the upload progress
            const progress = uploadProgress(
                snapshot.bytesTransferred / snapshot.totalBytes
            );

            switch (snapshot.state) {
                case 'running':

                    // Set upload state to true and save progress into local state
                    console.log('Progreso: ', progress);
                    if (progress) { setProgress(progress) };
                    setLoading(true);

                    break;
                case 'success':
                    snapshot.ref.getDownloadURL().then(downloadURL => {
                        console.log('Recibido de fb: ', downloadURL);
                        setLoading(false);
                        setUpload(true);
                        setUrlImage(downloadURL);
                    });
                    break;
                default:
                    break;
            }
        });
    };

    // Esto abre la galeria para seleccionar la foto
    const openGallery = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            const fileName = getFileLocalPath(image);
            const dirFb = createStorageReferenceToFile(fileName);
            console.log(fileName);
            console.log(dirFb);
            const uploadTask = uploadFileToFireBase(image);
            monitorFileUpload(uploadTask);

        }).catch(error => {
            console.log(error);
        });
    };

    // Esto abre la galeria para seleccionar la foto
    const openCamera = () => {
        ImagePicker.openCamera({
            width: 400,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            const fileName = getFileLocalPath(image);
            const dirFb = createStorageReferenceToFile(fileName);
            console.log(fileName);
            console.log(dirFb);
            const uploadTask = uploadFileToFireBase(image);
            monitorFileUpload(uploadTask);

        }).catch(error => {
            console.log(error);
        });
    };

    // Esto sube la foto a firebase
    const uploadFileToFireBase = image => {
        const fileSource = getFileLocalPath(image);
        const storageRef = createStorageReferenceToFile(fileSource);
        return storageRef.putFile(fileSource);
    };

    // Eliminar foto de firebase y del state
    const deleteImage = () => {
        if (imageURI) {
            console.log('Eliminando foto de Firebase...');
            var desertRef = FirebaseStorage.ref(sourceFB);
            desertRef.delete().then(() => {
                console.log('Imagen eliminada exitosamente.');
                setUrlImage(null);
                setImageURI(null);
                setProgress(0);
                setUpload(false);
            }).catch(error => console.log(error));
        }
    };

    // Abre un menú para elegir si tomar la foto, o seleccionarla de la galería
    const selectImage = () => {
        const buttons = [
            { text: dic.photo[iLang] },
            { text: dic.gallery[iLang] },
            { text: dic.cancel[iLang] }
        ];
        const cancelIndex = 2;

        ActionSheet.show(
            {
                options: buttons,
                cancelButtonIndex: cancelIndex,
                title: dic.select[iLang]
            },
            (buttonIndex) => {
                if (buttonIndex == 0) {
                    openCamera();
                } else if (buttonIndex == 1) {
                    openGallery();
                }
            }

        );
    };


    return (
        <View>
            <View style={{ marginTop: 30 }}>
                {!imageURI && (
                    <TouchableWithoutFeedback style={{ alignItems: 'center' }} onPress={selectImage}>
                        <View style={styles.cameraBorder}>
                            <View style={styles.cameraView}>
                                <Icon name='camera' size={60} color={color.grad[9]} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )}
                {imageURI && (
                    <View style={{ alignSelf: 'center' }}>
                        <Image
                            borderRadius={5} borderColor={color.grad[1]} borderWidth={7}
                            source={{ uri: imageURI }}
                            style={{ height: 250, width: 250 }}
                        />
                        <View>

                        </View>
                    </View>
                )}



                {upload && (
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <TouchableWithoutFeedback onPress={deleteImage} >
                            <View style={{ flexBasis: '100%', alignSelf: 'center' }} >
                                <Icon name='cup' size={27} color={color.grad[9]} style={{ alignSelf: 'center' }} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                )}

            </View>
            {
                loading && (
                    <View>
                        <View style={{ paddingHorizontal: 10, paddingTop: 30 }}>
                            <Progress.Bar progress={progress} width={null} color={color.grad[8]} />
                        </View>
                        <View style={{ alignSelf: 'center', color: color.grad[8] }}>
                            <Text style={{ color: color.grad[9], fontSize: 16 }}>{progress * 100}%</Text>
                        </View>
                    </View>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    cameraBorder: {
        borderColor: color.grad[8],
        borderWidth: 3,
        paddingVertical: 20,
        marginHorizontal: 20,
        backgroundColor: color.grad[7],
        borderRadius: 10
    },
    cameraView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.grad[4],
        width: 100,
        height: 100,
        alignSelf: 'center',
        borderRadius: 50
    }
})

export default UploadImage;