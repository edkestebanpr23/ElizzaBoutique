import React, { useReducer, useEffect } from "react";
import GlobalReducer from "./globalReducer";
import GlobalContext from "./globalContext";
import { SESSION, GET_USER, SET_USER, ILANG } from "../types";
import { getToken } from "../../database/storage";
import Storage from "../../database/storage";

const GlobalState = props => {

    // Creando un state inicial
    const initialState = {
        session: false,
        user: {},
        iLang: 0
    };

    useEffect(() => {
        const startVariables = async () => {
            await getSession();
            await getUser();
        };
        startVariables();
    }, []);

    // useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(GlobalReducer, initialState);

    /**
     * Sesiones
     */
    const sessionTrue = () => {
        dispatch({
            type: SESSION,
            payload: true
        });
    };

    const sessionFalse = () => {
        dispatch({
            type: SESSION,
            payload: false,
            user: {}
        });
    };

    const getSession = async () => {
        // Obtener token
        const token = await Storage.getToken();
        console.log('getToken ctx', token);

        // Actualizar datos
        if (token) {
            sessionTrue();
        } else {
            console.log('Soy False');
            sessionFalse();
        }
    };

    const startSession = async (User) => {
        // Almacenar token
        const { token, ...data } = User;
        const res = await Storage.setToken(token);

        // Actualizar variables
        if (res) {
            sessionTrue();
            if (data) {
                await setUser(data);
            }
        }
    };

    const killSession = async () => {
        console.log('Cerrando sesion...');
        // Eliminando token
        await Storage.deleteStorage('user');
        const res = await Storage.deleteToken();

        // Actualizando variables
        if (res) {
            sessionFalse();
            console.log('Sesión cerrada exitosamente')
            return true;
        } else {
            return false;
        }
    };

    /**
     * Datos de usuarios
     */
    const getUser = async () => {
        const User = await Storage.getStorage('user');
        if (User !== false) {
            dispatch({
                type: SET_USER,
                payload: User
            });
        }
        // ¿¿¿¿¿    ¿Qué pasa si tiene token pero no tiene los datos de usuario?
    };

    const setUser = async (data) => {
        if (!data) return;
        const isUser = await Storage.setStorage('user', data);
        dispatch({
            type: SET_USER,
            payload: data
        });
        return isUser;
    };

    /**
     * Idioma
     */

    const getILang = async () => {
        const ILang = await Storage.getStorage('iLang', false);
        ILang = ILang ? parseInt(ILang) : 0;
        dispatch({
            type: ILANG,
            payload: ILang
        });
        return ILang;
    };

    const setILang = async (i) => {
        console.log('Cambiando a idioma: ', i);
        const ILang = await Storage.setStorage('iLang', i);
        if (ILang) {
            console.log('Cambiando a idioma:: ', i);
            dispatch({
                type: ILANG,
                payload: i
            });
        }
    };

    return (
        <GlobalContext.Provider
            value={{
                session: state.session,
                user: state.user,
                iLang: state.iLang,
                getSession,
                startSession,
                killSession,
                getUser,
                setUser,
                setILang,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};

export default GlobalState;