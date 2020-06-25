import { SESSION, SET_USER, GET_USER, ILANG } from "../types";

export default (state, action) => {
    switch (action.type) {
        case SESSION:
            return {
                ...state,
                session: action.payload
            };
        case ILANG:
            return {
                ...state,
                iLang: action.payload
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}