import BookingActionType from '../actions/BookingActionType';

const defaultState = {
    isRequesting: false,
    done: false,
    hasError: false,
}

const BookingReducer = (state = defaultState, action) => {
    switch(action.type) {
        case BookingActionType.BOOKING_REQUEST:
            return {
                ...state,
                isRequesting: true
            };
        case BookingActionType.BOOKING_REQUEST_SUCCESS:
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
        case BookingActionType.BOOKING_REQUEST_FAILURE:
            return {
                isRequesting: false,
                done: false,
                ...action.payload,
                hasError: true
            };
        case BookingActionType.BOOKING_RESET:
            return defaultState;
        default: return state;
    }
}

export default BookingReducer;