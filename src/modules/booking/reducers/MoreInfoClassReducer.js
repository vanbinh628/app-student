import BookingActionType from '../actions/BookingActionType';

const defaultState = {
    isRequesting: false,
    hasError: false,
    done: false,
}

const MoreInfoReducer = (state = defaultState, action) => {
    switch(action.type) {
        case BookingActionType.DETAIL_CLASS_REQUEST:
            return {
                isRequesting: true
            }
        case BookingActionType.DETAIL_CLASS_REQUEST_SUCCESS:
            const {
                payload: {
                    status,
                    data
                }
            } = action;
            return {
                isRequesting: false,
                done: status === 'FAIL' ? false : true,
                hasError: status === 'FAIL' ? true : false,
                data,
                status
            }
        case BookingActionType.DETAIL_CLASS_REQUEST_SUCCESS:
            if (action.payload.status !== 'FAIL') {
                console.log('Danh Sach Students',data.studentIDs);
                return {
                    isRequesting: false,
                    done: true,
                    hasError: false,
                    ...action.payload
                }
                    
            } 

            return state;
        case BookingActionType.DETAIL_CLASS_REQUEST_FAILURE:
            return {
                isRequesting: false,
                done: false,
                ...action.payload,
                hasError: true
            }
        case BookingActionType.BOOKING_RESET: 
            return defaultState;
        default: return state;
    }
}

export default MoreInfoReducer;