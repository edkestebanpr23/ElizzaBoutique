import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink, createHttpLink } from "apollo-link-http";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { setContext } from "apollo-link-context";


const url = Platform.OS === 'ios' ? 'http://192.168.1.65:4001/graphql' : 'http://192.168.1.61:4000/';
const httpLink = createHttpLink({
    uri: url,
});

// Con esto vamos a pasar el token por el header
const authLink = setContext(async (_, { headers }) => {
    // Leer token
    const token = await AsyncStorage.getItem('token');
    // console.log('Token CLI', token);

    return {
        // Retorno un heder con todo lo que tenia, mas el Token si existe
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '', // Se supone que es un estandar retornarlo así...
        }
    }
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

export default client;