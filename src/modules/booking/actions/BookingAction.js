import {RSAA} from 'redux-api-middleware';
import axios from 'axios'
import BookingActionType from './BookingActionType';
import {createQuery} from '../../../utils/helper';
import {
    classApi,
    scheduleApi,
    topicApi,
    feedback,
    feedbackApi,
    newClassApi,
    bookingApi,
    detailClass,
    basicUser,
    userBasic
} from '../../../../env';

export const reset = () => ({type: BookingActionType.BOOKING_RESET});

export const requestSchedule = () => ({type: BookingActionType.SCHEDULE_REQUEST});

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
                BookingActionType.SCHEDULE_REQUEST,
                BookingActionType.SCHEDULE_REQUEST_SUCCESS,
                BookingActionType.SCHEDULE_REQUEST_FAILURE
            ]
        }
    }
}
//Binh
export const fetchDetailClass = (classID, token) => {
    return {
        [RSAA]: {
            endpoint: `${detailClass}/${classID}`,
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            types: [
                BookingActionType.DETAIL_CLASS_REQUEST,
                BookingActionType.DETAIL_CLASS_REQUEST_SUCCESS,
                BookingActionType.DETAIL_CLASS_REQUEST_FAILURE
            ]
        }
    }
}
export const fetchUserBasic = (userID, token) => {
    return {
        [RSAA]: {
            endpoint: `${userBasic}/${userID}/profile`,
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            types: [
                BookingActionType.USER_REQUEST,
                BookingActionType.USER_REQUEST_SUCCESS,
                BookingActionType.USER_REQUEST_FAILURE
            ]
        }
    }
}

const fetchAvailableTeacher = (query, token) => {
    return axios({
        method: 'GET',
        url: `${basicUser}/stationteacher?${query}`,
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    }).then((result) => {
        // console.log('adasdasdasd', result);
        if (result && result.data.status === 'SUCCESS') {
            const teacherIds = result.data.data.teacherIDList;
            return teacherIds
        }

        return [];
    });
}

export const fetch = (classID, token) => {
    return {
        [RSAA]: {
            endpoint: `${detailClass}/${classID}`,
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            types: [
                BookingActionType.DETAIL_CLASS_REQUEST,
                BookingActionType.DETAIL_CLASS_REQUEST_SUCCESS,
                BookingActionType.DETAIL_CLASS_REQUEST_FAILURE
            ]
        }
    }
}

const fetchBasicDetail = (userID, token) => {
    return axios({
        method: 'GET',
        url: `${scheduleApi}/${userID}/profile`,
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    }).then((result) => {
        // console.log('adasdasdasd', result);
        if (result && result.data.status === 'SUCCESS') {
            const basicUser = result.data.data;
            return basicUser
        }

        return [];
    });
}

const fetchAvailableTeacherSchedule = (page = 1, limit = 20, filters = {}, token) => {
    const query = createQuery({page, limit, ...filters});
    return fetchAvailableTeacher(query, token).then((teacherIds) => {
        if (teacherIds && Array.isArray(teacherIds)) {
            return Promise.all(teacherIds.map((id) => {
                const newFilter = {...filters};
                delete newFilter.stationID;
                newFilter.teacherID = id;
                return axios({
                    method: 'GET',
                    url: `${scheduleApi}?${createQuery({page, limit,  ...newFilter})}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    }
                })
            }))
        }

        return [];
    })
}

export const fetchStationSchedule = (page = 1, limit = 20, filters = {}, token) => (dispatch) => {
    // console.log('ASDASDASD');
    // const query = createQuery({page, limit, ...filters});
    return fetchAvailableTeacherSchedule(page, limit, filters, token).then((results) => {
        let schedule = [];
        let sortedSchedule = [];


        results.forEach((item) => {
            if (item.data.status !== 'SUCCESS') {
                return false;
            }

            const teacherSchedule = item.data.data.items;

            if (teacherSchedule && Array.isArray(teacherSchedule)) {
                schedule = schedule.concat(teacherSchedule);
            }
        })

        sortedSchedule = schedule.sort((a,b) => (a.dateStarted > b.dateStarted) ? 1 : ((b.dateStarted > a.dateStarted) ? -1 : 0));

        return dispatch({
            type: BookingActionType.SCHEDULE_REQUEST_SUCCESS,
            payload: {
                status: 'SUCCESS',
                data: {
                    total: 1,
                    page: 1, 
                    limit: 1,
                    items: [...sortedSchedule]
                }
            }
        })
    })
}

export const fetchTopic = (page = 1, limit = 20, filters = {}, token) => {
    const query = createQuery({page, limit, ...filters});
    return {
        [RSAA]: {
            endpoint: `${topicApi}?${query}`,
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            types: [
                BookingActionType.TOPIC_REQUEST,
                BookingActionType.TOPIC_REQUEST_SUCCESS,
                BookingActionType.TOPIC_REQUEST_FAIURE
            ]
        }
    }
}

export const fetchClass = (page = 1, limit = 20, filters = {}, token) => {
    const query = createQuery({page, limit, ...filters});
    return {
        [RSAA]: {
            endpoint: `${newClassApi}?${query}`,
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            types: [
                BookingActionType.SCHEDULE_REQUEST,
                BookingActionType.SCHEDULE_REQUEST_SUCCESS,
                BookingActionType.SCHEDULE_REQUEST_FAILURE
            ]
        }
    }
}

// export const bookClass = (data, token) => {
//     return {
//         [RSAA]: {
//             endpoint: `${classApi}`,
//             method: 'POST',
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

export const bookClass = (data, token) => {
    return {
        [RSAA]: {
            endpoint: `${bookingApi}`,
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(data),
            types: [
                BookingActionType.BOOKING_REQUEST,
                BookingActionType.BOOKING_REQUEST_SUCCESS,
                BookingActionType.BOOKING_REQUEST_FAILURE
            ]
        }
    }
}

export const cancelClass = (data, token) => {
   
    return {
        [RSAA]: {
            endpoint: `${bookingApi}/${data}`,
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            // body: JSON.stringify(data),
            types: [
                BookingActionType.BOOKING_REQUEST,
                BookingActionType.BOOKING_REQUEST_SUCCESS,
                BookingActionType.BOOKING_REQUEST_FAILURE
            ]
        }
    }
}

export const checkIn = (bookingID, data, token) => {
    return {
        [RSAA]: {
            endpoint: `${bookingApi}/${bookingID}`,
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(data),
            types: [
                BookingActionType.BOOKING_REQUEST,
                BookingActionType.BOOKING_REQUEST_SUCCESS,
                BookingActionType.BOOKING_REQUEST_FAILURE
            ]
        }
    }
}

export const createFeedBack = (data, token) => {
    console.log('API createFeedBack',data);
    console.log('API createFeedBack',JSON.stringify(data));
    return {
        [RSAA]: {
            endpoint: `${feedback}`,
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(data),
            types: [
                BookingActionType.BOOKING_REQUEST,
                BookingActionType.BOOKING_REQUEST_SUCCESS,
                BookingActionType.BOOKING_REQUEST_FAILURE
            ]
        }
    }
}