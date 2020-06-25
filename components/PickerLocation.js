import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Picker } from "@react-native-community/picker";
import countries from "../data/countries";
import colors from "../data/colors";
import { color } from 'react-native-reanimated';

const PickerLocation = ({ country, setCountry }) => {

    /**
     * Cosas que faltan:
     * Debe ser mas fácil la selección del país, por ejemplo:
     * Crear una lista de paises donde está la iglesia que serán unos 50,
     * Facilmente se podrá ponerles idioma... Quizás separarlos por continentes...
     */
    // const defineCountry = (_country, i) => {
    //     setCountry(_country);
    //     console.log('Valor de i:', i);
    // };

    return (
        <View style={{ paddingHorizontal: '10%' }}>
            <Picker
                onValueChange={_country => setCountry(_country)}
                selectedValue={country}
                itemStyle={styles.item}
            >
                {
                    countries.map(_country => (
                        <Picker.Item key={_country.code3} label={_country.name} value={_country.name} />
                    ))
                }
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        color: colors.turquose.grad[0],
        textTransform: 'uppercase'
    }
});

export default PickerLocation;