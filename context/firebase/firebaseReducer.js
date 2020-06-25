// import { OBTENER_PRODUCTOS_EXITO } from "../../types/index";
/**
 * Aqui estoy exportando esto que no tiene nombre, al parecer puedo nombrarlo como quiera a la hora de
 * Importarlo en otro lugar
 */
export default (state, action) => {
    switch (action.type) {
        // case OBTENER_PRODUCTOS_EXITO:
        //     return {
        //         ...state,
        //         menu: action.payload
        //     }
        default:
            return state;
    }
};