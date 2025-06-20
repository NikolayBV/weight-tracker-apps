import api from "@/lib/axios";
import axios, {AxiosError, AxiosInstance} from "axios";
import {AddWeighData, LoginData, RegisterData, Weight} from "@/utils/interfaces";
import {notifications} from "@mantine/notifications";

class Api {
    private api: AxiosInstance;
    constructor() {
        this.api = api;
    }

    async login({email, password}: LoginData) {
        try {
            const response = await this.api.post('auth/login', { email, password });
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 403) {
                notifications.show({
                    title: 'Error',
                    message: 'Incorrect email or password',
                });
            } else {
                notifications.show({
                    title: 'Error',
                    message: 'Unknown error',
                });
            }
        }
    }
    
    async register({email, password, birthdayDate, height, gender}: RegisterData) {
        try {
            const response = await this.api.post('auth/register', { email, password, birthdayDate, height, gender });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 409) {
                    console.log('Такой email уже зарегистрирован!');
                }
                console.error('Axios ошибка регистрации:', error.response?.data);
            } else {
                console.error('Неизвестная ошибка регистрации:', error);
            }

            throw error;
        }
    }
    
    async getUser(userId: string) {
        try {
            const response = await this.api.get(`users/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Ошибка получения пользователя:', error);
            throw error;
        }
    }
    
    async refresh() {
        try {
            const response = await this.api.post('/auth/refresh');
            return response.data;
        } catch (error) {
            console.info('Ошибка получения пользователя:', error);
            throw error;
        }
    }

    async logout() {
        try {
            const response = await this.api.post('/auth/logout');
            return response.data;
        } catch (error) {
            console.error('Ошибка получения пользователя:', error);
            throw error;
        }
    }
    
    async addWeight({userId, weight, date}: AddWeighData) {
        try {
            const response = await this.api.post(`/weights/${userId}`, { weight, date });
            return response.data;
        } catch (error) {
            console.error('Ошибка получения пользователя:', error);
            throw error;
        }
    }
    
    async getWeight({userId, sortBy, sortOrder}: {userId: string, sortBy?: string, sortOrder?: string}): Promise<{message: string, entries: Weight[]}> {
        try {
            const response = await this.api.get(`/weights/${userId}?sortBy=${sortBy}&order=${sortOrder}`);
            return response.data;
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: 'Ошибка получения веса пользователя',
            });
            console.error('Ошибка получения веса пользователя:', error);
            throw error;
        }
    }
}

export const apiInstance = new Api();