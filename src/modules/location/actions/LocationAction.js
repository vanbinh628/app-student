import {RSAA} from 'redux-api-middleware';
import LocationActionType from './LocationActionType';
import {createQuery} from '../../../utils/helper';
import {locationApi, scheduleApi} from '../../../../env';

export const reset = () => ({type: LocationActionType.LOCATION_LIST_RESET});

export const resetSetSchedule = () => ({type: LocationActionType.SET_SCHEDULE_RESET});

export const fetchLocationList = (page = 1, limit = 20, filters = {}, token) => {
    const query = createQuery({page, limit, ...filters})
    return {
        [RSAA]: {
            endpoint: `${locationApi}?${query}`,
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            types: [
                LocationActionType.LOCATION_LIST_REQUEST,
                LocationActionType.LOCATION_LIST_REQUEST_SUCCESS,
                LocationActionType.LOCATION_LIST_REQUEST_FAILURE
            ]
        }
    }
}

export const fetchSchedule = (page = 1, limit = 20, filters = {}, token) => {
    const query = createQuery({page, limit, ...filters});
    return {
        [RSAA]: {
            endpoint: `${scheduleApi}?${query}`,
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            types: [
                LocationActionType.SCHEDULE_REQUEST,
                LocationActionType.SCHEDULE_REQUEST_SUCCESS,
                LocationActionType.SCHEDULE_REQUEST_FAILURE
            ]
        }
    }
}

export const setSchedule = (data, token) => {
    return {
        [RSAA]: {
            endpoint: `${scheduleApi}`,
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(data),
            types: [
                LocationActionType.SET_SCHEDULE_REQUEST,
                LocationActionType.SET_SCHEDULE_REQUEST_SUCCESS,
                LocationActionType.SET_SCHEDULE_REQUEST_FAILURE
            ]
        }
    }
}