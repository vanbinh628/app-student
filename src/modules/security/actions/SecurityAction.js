import { RSAA } from 'redux-api-middleware';
import SecurityActionType from './SecurityActionType';
import { apiHost } from '../../../../env';

export const login = (username, password, playerId) => {
    return {
        [RSAA]: {
            endpoint: `${apiHost}/login`,
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'deviceID': playerId
            },
            body: JSON.stringify({username, email: username, password}),
            types: [
                SecurityActionType.SECURITY_LOGIN_REQUEST, 
                SecurityActionType.SECURITY_LOGIN_SUCCESS, 
                SecurityActionType.SECURITY_LOGIN_FAILURE
            ]
        }
    }
}

export const loadCredential = (data) => {
    return {
        type: SecurityActionType.SECURITY_LOAD_SUCCESS,
        payload: data
    }
}

export const checkToken = (token) => {
    return {
        [RSAA]: {
            endpoint: `${apiHost}/checkToken`,
            method: "GET",
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            types: [
                SecurityActionType.SECURITY_CHECK_TOKEN_REQUEST, 
                SecurityActionType.SECURITY_CHECK_TOKEN_SUCCESS, 
                SecurityActionType.SECURITY_CHECK_TOKEN_FAILURE
            ]
        }
    }
}

export const register = (name, phone, email, password) => {
    return {
        [RSAA]: {
            endpoint: `${apiHost}/register`,
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email, 
                email, 
                name,
                phone,
                password
            }),
            types: [
                SecurityActionType.SECURITY_LOGIN_REQUEST, 
                SecurityActionType.SECURITY_LOGIN_SUCCESS, 
                SecurityActionType.SECURITY_LOGIN_FAILURE
            ]
        }
    }
}

export const logout = (playerId, token) => {
    return {
        [RSAA]: {
            endpoint: `${apiHost}/logout`,
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'deviceID': playerId,
                'token': token
            },
            body: JSON.stringify({}),
            types: [
                SecurityActionType.SECURITY_LOGOUT_REQUEST, 
                SecurityActionType.SECURITY_LOGOUT_SUCCESS, 
                SecurityActionType.SECURITY_LOGOUT_FAILURE
            ]
        }
    }
}

export const forgotPassword = (email) => {
    return {
        [RSAA]: {
            endpoint: `${apiHost}/forgetpass`,
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
            types: [
                SecurityActionType.SECURITY_LOGIN_REQUEST, 
                SecurityActionType.SECURITY_LOGIN_SUCCESS, 
                SecurityActionType.SECURITY_LOGIN_FAILURE
            ]
        }
    }
}

export const reset = () => ({type: SecurityActionType.SECURITY_LOGIN_RESET});