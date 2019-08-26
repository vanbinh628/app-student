import {RSAA} from 'redux-api-middleware';
import ViewUserClassesActionType from './ViewUserClassesActionType';
import {createQuery} from '../../../utils/helper';
import {bookingApi,detailClass,groupClass,feedback } from '../../../../env'
import { ClassRatingView } from '../styles/ClassDetailStyles';

export const fetchUserClasses = (page = 1, limit = 20, filters, token) => {
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
                ViewUserClassesActionType.USER_CLASSES_REQUEST,
                ViewUserClassesActionType.USER_CLASSES_REQUEST_SUCCESS,
                ViewUserClassesActionType.USER_CLASSES_REQUEST_FAILURE
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
                ViewUserClassesActionType.CLASS_REQUEST,
                ViewUserClassesActionType.CLASS_REQUEST_SUCCESS,
                ViewUserClassesActionType.CLASS_REQUEST_FAILURE
            ]
        }
    }
}
export const fetchDetailClass = (classID, token) => {
    console.log('fetchDetailClass 121212',classID);
    
    return {
        [RSAA]: {
            endpoint: `${detailClass}/${classID}`,
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            types: [
                ViewUserClassesActionType.DETAIL_CLASS_REQUEST,
                ViewUserClassesActionType.DETAIL_CLASS_REQUEST_SUCCESS,
                ViewUserClassesActionType.DETAIL_CLASS_REQUEST_FAILURE
            ]
        }
    }
}


export const fetchReviewDetail = (filters = {}, token) => {
    const query = createQuery({...filters});
    return {
        [RSAA]: {
            endpoint: `${feedback}?${query}`,
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            types: [
                ViewUserClassesActionType.CLASS_REVIEW_REQUEST,
                ViewUserClassesActionType.CLASS_REVIEW_REQUEST_SUCCESS,
                ViewUserClassesActionType.CLASS_REVIEW_REQUEST_FAILURE
            ]
        }
    }
}

export const resetClass = () => {
    return {type: ViewUserClassesActionType.CLASS_RESET}
}