import React, { useReducer } from "react";
import firebase from "../../firebase/firebase";
import FirebaseReducer from "./firebaseReducer";
import FirebaseContext from "./firebaseContext";
// import { OBTENER_PRODUCTOS_EXITO } from "../../types/index";
// import _ from 'lodash';

const FirebaseState = props => {

    // console.log(firebase);

    // Creando un state inicial
    const initialState = {
        menu: [], // Menú que se traerá de la base de datos, inicia vacío
    };

    // Funcion obtener productos
    // const obtenerProductos = () => {
    //     console.log('Desde firebase');


    //     // Consultar Firebase
    //     try {
    //         firebase.db.settings({ experimentalForceLongPolling: true });
    //         firebase.db.collection('productos').where('existencia', '==', true).onSnapshot(manejarSnapshot);
    //         function manejarSnapshot(snapshot) {
    //             let platillos = snapshot.docs.map(doc => {
    //                 return {
    //                     id: doc.id,
    //                     ...doc.data()
    //                 };
    //             });

    //             // Ordenar por categorías con lodash

    //             // platillos = _.sortBy(platillos, 'categoria');

    //             // console.log(platillos);

    //             /**
    //              * Este dispatch es para ejecutar el reducer './firebaseReducer'
    //              * El dispatch es el action de la función
    //              */
    //             dispatch({
    //                 type: OBTENER_PRODUCTOS_EXITO,
    //                 payload: platillos
    //             });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }

    // };

    // useReducer con dispatch para ejecutar las funciones
    // No se para que sirve todo esto :v
    const [state, dispatch] = useReducer(FirebaseReducer, initialState);


    /**
     * Este return contendrá todas las funciones a utilizar en toda la aplicación
     * Como no sabemos que pantallas/views van a hacer uso de estas funciones, le pasaremos las props
     * De esa manera, todos los componentes hijos se pondran dentro del <FirebaseContext.Provider>
     * Para pasar los valores del state, debo pasarlos como props de <FirebaseContext.Provider> 
     */
    return (
        <FirebaseContext.Provider
            value={{
                // menu: state.menu,
                firebase,
                // obtenerProductos
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
};

export default FirebaseState;