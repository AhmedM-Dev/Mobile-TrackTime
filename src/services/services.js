
import AsyncStorage from '@react-native-community/async-storage';

import HttpClient from "./HttpClient";

const ApiClient = new HttpClient();

export const authenticate = async (email, pass) => {
    const user = await AsyncStorage.getItem('user');

    if (user) {
        return Promise.resolve(user);
    } else {
        return ApiClient.post('auth', {
            email: email,
            pass: pass
        })
            .then(async userFromApi => {
                await AsyncStorage.setItem('user', JSON.stringify(userFromApi.data.user));
                return Promise.resolve(userFromApi.data.user);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }
};

export const getDashboardData = async (user) => {
    return ApiClient.get(`attendances?userId=${user.id}`)
        .then(dashboardData => {
            return Promise.resolve(dashboardData.data);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const logout = async ({ navigate }) => {
    await AsyncStorage.clear();
    navigate('Auth');
};

export const fetchDataFromAsyncStorage = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        return null;
    }
};

export const storeDataToAsyncStorage = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        return null;
    }
};
