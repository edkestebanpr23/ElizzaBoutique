import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Button, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import gS from "../../styles/globalStyles";
import GlobalContext from "../../context/global/globalContext";


console.disableYellowBox = true;
const Settings = () => {
    const navigation = useNavigation();
    const { killSession } = useContext(GlobalContext);


    return (
        <Container style={gS.container}>
            <View style={gS.centerVerticalView}>
                <Button full onPress={() => killSession()}>
                    <Text>Cerrar Sesión</Text>
                </Button>

            </View>
        </Container>
    );
}

export default Settings;