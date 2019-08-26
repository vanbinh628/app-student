import {RSAA} from 'redux-api-middleware';
import NotificationActionType from './NotificationActionType';
import {createQuery} from '../../../utils/helper';
import { notiApi } from '../../../../env';

export const reset = () => ({type: BookingActionType.BOOKING_RESET});

export const fetchNotification = (page = 1, limit = 20, filters = {}, token) => {
    const query = createQuery({page, limit, ...filters});
    return {
        [RSAA]: {
            endpoint: `${notiApi}?${query}`,
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            types: [
                NotificationActionType.NOTI_REQUEST,
                NotificationActionType.NOTI_REQUEST_SUCCESS,
                NotificationActionType.NOTI_REQUEST_FAILURE
            ]
        }
    }
}
export const readNotification = (notiID, token) => {
    return {
        [RSAA]: {
            endpoint: `${notiApi}/${notiID}`,
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(data),
            types: [
                NotificationActionType.READ_NOTIFICATION_REQUEST,
                NotificationActionType.READ_NOTIFICATION_REQUEST_SUCCESS,
                NotificationActionType.READ_NOTIFICATION_REQUEST_FAILURE
            ]
        }
    }
}

// export const cancelClass = (data, token) => {
//     return {
//         [RSAA]: {
//             endpoint: `https://smartr-api.herokuapp.com/class`,
//             method: 'DELETE',
//             headers: { 
//                 'Content-Type': 'application/json',
//                 'token': token
//             },
//             body: JSON.stringify(data),
//             types: [
//                 BookingActionType.BOOKING_REQUEST,
//                 BookingActionType.BOOKING_REQUEST_SUCCESS,
//                 BookingActionType.BOOKING_REQUEST_FAILURE
//             ]
//         }
//     }
// }