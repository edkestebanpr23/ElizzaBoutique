import AsyncStorage from "@react-native-community/async-storage";

const Storage = {
    getToken: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            return token;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    setToken: async (token) => {
        try {
            await AsyncStorage.setItem('token', token);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    deleteToken: async () => {
        try {
            await AsyncStorage.removeItem('token');
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    getStorage: async (key, json = true) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (json) {
                return JSON.parse(value);
            } else {
                return value;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    setStorage: async (key, value, json = true) => {
        if (json) {
            value = JSON.stringify(value);
        }
        try {
            await AsyncStorage.setItem(key, value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    deleteStorage: async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
};

export default Storage;