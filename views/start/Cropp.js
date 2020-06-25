import React, { useState } from 'react';
import { Button, StatusBar, Image, View, Platform, Text } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Container } from 'native-base';
import storage from "@react-native-firebase/storage";
import * as Progress from 'react-native-progress';
// import { uuid } from "uuid";

const FirebaseStorage = storage();

const Cropp = () => {
    const [imageURI, setImageURI] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [upload, setUpload] = useState(false);


    // toma un ratioparámetro y luego devuelve un porcentaje redondeado
    const uploadProgress = ratio => Math.round(ratio * 100);

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
        return FirebaseStorage.ref(fileName);
    };

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
                        // setImageURI({ uri: downloadURL });
                        console.log('Enlace foto firebase', imageURI);
                        console.log('Recibido de fb: ', downloadURL);
                        // Set upload state to false
                        setLoading(false);
                        setUpload(true);
                    });
                    break;
                default:
                    break;
            }
        });
    };

    // Esto abre la galeria para seleccionar la foto
    const uploadFile = () => {
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

    // Esto sube la foto a firebase
    const uploadFileToFireBase = image => {
        const fileSource = getFileLocalPath(image);
        const storageRef = createStorageReferenceToFile(fileSource);
        return storageRef.putFile(fileSource);
    };




    return (
        <Container>
            <View style={{ marginTop: 30 }}>
                <StatusBar barStyle="dark-content" />
                <Button title="New Post" onPress={uploadFile} color="green" />
                {imageURI && <Image source={{ uri: imageURI }} style={{ height: 400, width: '100%' }} />}
                {/* <Button title="Subir" onPress={uploadFileToFireBase} color="green" /> */}
                {loading && (
                    <Text>{progress}</Text>
                )}
                {upload && <Text>Imagen subida exitosamente!</Text>}
            </View>
            {
                loading && (
                    <View style={{ paddingHorizontal: 10, paddingVertical: 30 }}>
                        <Progress.Bar progress={progress} width={null} />
                    </View>
                )
            }
        </Container>
    );
};
export default Cropp;