/**
 * @format
 */
import React, { useState } from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from "./App";

// Apollo
import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client";

// Context
import GlobalState from "./context/global/globalState";
import FirebaseState from "./context/firebase/firebaseState";

const chorusApp = () => {

    return (
        <ApolloProvider client={client}>
            <FirebaseState>
                <GlobalState>
                    <App />
                </GlobalState>
            </FirebaseState>
        </ApolloProvider>
    )
};


AppRegistry.registerComponent(appName, () => chorusApp);
