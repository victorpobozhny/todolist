import axios, {AxiosResponse} from 'axios'
import {ResponseType, TodolistType} from "./todolist-api";
import {LoginType} from "../features/login/Login";

const instance = axios.create({baseURL: 'https://social-network.samuraijs.com/api/1.1/', withCredentials: true})


export const authAPI = {
    me(){

    },
    login(data: LoginType) {
        return instance.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{ userId: number }>>,  LoginType >('auth/login', data)
    },
    logOut(){

    }
}