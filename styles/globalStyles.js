import { StyleSheet } from 'react-native';
import { turquose as color } from "./../data/colors";



const gS = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '2.5%'
    },
    containerColor: {
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
        marginBottom: 20
    },
    button: {
        backgroundColor: color.grad[9],
        marginTop: 30
    },
    textButton: {
        textAlign: 'center',
        alignSelf: 'center'
    }
});

export default gS;