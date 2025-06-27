import {Gender} from "@/utils/types";

export interface RegisterData {
    email: string;
    password: string;
    birthdayDate: string;
    height: string;
    gender: Gender | "";
}

export interface UpdateUserData extends RegisterData {
    userId: string;
}

export interface AddWeighData {
    userId: string;
    weight: string;
    date: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface Weight {
    id: string;
    userId: string
    weight: string;
    date: string;
    createdAt: string;
}

export interface User {
    userId: string | undefined;
    userBirthday: string;
    userHeight: number;
    userGender: string;
    userEmail: string;
}