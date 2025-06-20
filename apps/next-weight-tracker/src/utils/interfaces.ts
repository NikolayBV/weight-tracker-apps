import {Gender} from "@/utils/types";

export interface RegisterData {
    email: string;
    password: string;
    birthdayDate: string;
    height: string;
    gender: Gender | "";
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