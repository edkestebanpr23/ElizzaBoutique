import React, { useState } from 'react';
import { Button, StatusBar, Image, View, Platform, Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Container } from 'native-base';
import storage from "@react-native-firebase/storage";
// import { uuid } from "uuid";

const FirebaseStorage = storage();

// const ProgressBar = styled.View`
//   background-color: #039ae5;
//   height: 3;
//   width: ${props => props.bar}%;
//   align-items: flex-start;
// `;

// export const Skeleton = styled.View`
//   height: 300;
//   width: 100%;
//   background-color: #ebebeb;
// `;

const Photo = () => {
    const [imageURI, setImageURI] = useState(null);
    const [upload, setUpload] = useState({
        loading: false,
        progress: 0,
    });

    console.log('Fotoooo');
    console.log(FirebaseStorage);


    // toma un ratioparámetro y luego devuelve un porcentaje redondeado
    const uploadProgress = ratio => Math.round(ratio * 100);

    const imagePickerOptions = {
        noData: true,
        title: 'Mi titulo'
    };
    // console.log(uuid())

    // Aquí retorna la ruta de la foto
    const getFileLocalPath = response => {
        const { path, uri } = response;
        return Platform.OS === 'android' ? path : uri;
    };

    // Se obtiene el nombre de la imagen y lo retorna, este será el nombre de firebase
    const createStorageReferenceToFile = response => {
        const { uri } = response;
        let fileName = uri.substr(uri.search('/tmp/'));
        fileName = fileName.substr(5);
        fileName = 'user/img/profile/' + fileName;
        console.log('Filename: ', fileName)
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
                    setImageURI(null);

                    // Set upload state to true and save progress into local state
                    setUpload({ loading: true, progress });

                    break;
                case 'success':
                    snapshot.ref.getDownloadURL().then(downloadURL => {
                        setImageURI({ uri: downloadURL });
                        console.log('Enlace foto firebase', imageURI);

                        // Set upload state to false
                        setUpload({ loading: false });

                    });
                    break;
                default:
                    break;
            }
        });
    };

    // Esto abre la galeria para seleccionar la foto
    const uploadFile = () => {
        ImagePicker.launchImageLibrary(imagePickerOptions, imagePickerResponse => {
            const { didCancel, error } = imagePickerResponse;
            if (didCancel) {
                alert('Post canceled');
            } else if (error) {
                alert('An error occurred: ', error);
            } else {
                /*
                setImageURI({ uri:   });
                  Remove these two lines
                  Replace them with these two lines instead
                  */

                console.log(imagePickerResponse);

                // Promise.resolve(uploadFileToFireBase(imagePickerResponse));


                // const uploadTask = uploadFileToFireBase(imagePickerResponse);
                // monitorFileUpload(uploadTask);
            }
        });
    };

    // Esto sube la foto a firebase
    const uploadFileToFireBase = imagePickerResponse => {
        const fileSource = getFileLocalPath(imagePickerResponse);
        const storageRef = createStorageReferenceToFile(imagePickerResponse);
        return storageRef.putFile(fileSource);
    };




    return (
        <Container>
            <View style={{ marginTop: 30 }}>
                <StatusBar barStyle="dark-content" />
                <Button title="New Post" onPress={uploadFile} color="green" />
                {imageURI && <Image source={imageURI} style={{ height: 300, width: '100%' }} />}
                {/* <Button title="Subir" onPress={uploadFileToFireBase} color="green" /> */}
                {upload.loading && (
                    <Text>{upload.progress}</Text>
                )}

            </View>
        </Container>
    );
};
export default Photo;