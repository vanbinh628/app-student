import NotificationActionType from '../actions/NotificationActionType';

const defaultState = {
    isRequesting: false,
    done: false,
    hasError: false,
}

const BookingReducer = (state = defaultState, action) => {
    switch(action.type) {
        case NotificationActionType.READ_NOTIFICATION_REQUEST:
            return {
                ...state,
                isRequesting: true
            };
        case NotificationActionType.READ_NOTIFICATION_REQUEST_SUCCESS:
            const {
                payload: {
                    status,
                    data,
                    message
                }
            } = action;
            
            return {
                isRequesting: false,
                done: status === 'FAIL' ? false : true,
                hasError: status === 'FAIL' ? true : false,
                data,
                message,
                status
            };
        case NotificationActionType.READ_NOTIFICATION_REQUEST_FAILURE:
            return {
                isRequesting: false,
                done: false,
                ...action.payload,
                hasError: true
            };
        case NotificationActionType.READ_NOTIFICATION_RESET:
            return defaultState;
        default: return state;
    }
}

export default ReadNotificationReducer;