import {RSAA} from 'redux-api-middleware';
import UserActionType from './UserActionType';
import { apiHost, cloudinaryApi } from '../../../../env';

export const reset = () => ({type: UserActionType.USER_RESET});

export const resetForm = () => ({type: UserActionType.USER_FORM_RESET});

export const fetchProfile = (token) => {
    return {
        [RSAA]: {
            endpoint: `${apiHost}/me`,
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            types: [
                UserActionType.USER_REQUEST,
                UserActionType.USER_REQUEST_SUCCESS,
                UserActionType.USER_REQUEST_FAILURE
            ]
        }
    }
}

export const updateProfile = (data, token) => {
    return {
        [RSAA]: {
            endpoint: `${apiHost}/me`,
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(data),
            types: [
                UserActionType.USER_FORM_REQUEST,
                UserActionType.USER_FORM_REQUEST_SUCCESS,
                UserActionType.USER_FORM_REQUEST_FAILURE
            ]
        }
    }
}

export const changePassword = (data, token) => {
    return {
        [RSAA]: {
            endpoint: `${apiHost}/changepass`,
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(data),
            types: [
                UserActionType.USER_FORM_REQUEST,
                UserActionType.USER_FORM_REQUEST_SUCCESS,
                UserActionType.USER_FORM_REQUEST_FAILURE
            ]
        }
    }
}

export const uploadImage = (data) => {
    return {
        [RSAA]: {
            endpoint: `${cloudinaryApi}`,
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            types: [
                UserActionType.UPLOAD_IMAGE_REQUEST,
                UserActionType.UPLOAD_IMAGE_REQUEST_SUCCESS,
                UserActionType.UPLOAD_IMAGE_REQUEST_FAILURE
            ]
        }
    }
}