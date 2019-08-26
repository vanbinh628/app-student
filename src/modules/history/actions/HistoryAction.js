import {RSAA} from 'redux-api-middleware';
import HistoryActionType from './HistoryActionType';
import {createQuery} from '../../../utils/helper';
import { classApi, bookingApi } from '../../../../env'

export const fetchHistory = (page = 1, limit = 20, filters = {}, token) => {
    const query = createQuery({page, limit, ...filters});
    return {
        [RSAA]: {
            endpoint: `${bookingApi}?${query}`,
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            types: [
                HistoryActionType.HISTORY_REQUEST,
                HistoryActionType.HISTORY_REQUEST_SUCCESS,
                HistoryActionType.HISTORY_REQUEST_FAILURE
            ]
        }
    }
}

export const fetchBookingDetail = (bookingID, token) => {
    return {
        [RSAA]: {
            endpoint: `${bookingApi}/${bookingID}`,
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            types: [
                HistoryActionType.CLASS_REQUEST,
                HistoryActionType.CLASS_REQUEST_SUCCESS,
                HistoryActionType.CLASS_REQUEST_FAILURE
            ]
        }
    }
}

export const resetClass = () => {
    return {type: HistoryActionType.CLASS_RESET}
}