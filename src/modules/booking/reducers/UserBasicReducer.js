import BookingActionType from '../actions/BookingActionType';
const defaultState = {
    isRequesting: false,
    hasError: false,
    done: false,
}

const UserBasicReducer = (state = defaultState, action) => {
    switch(action.type) {
        case BookingActionType.USER_REQUEST:
            return {
                isRequesting: true
            }
        case BookingActionType.USER_REQUEST_SUCCESS:
            const {
                payload: {
                    status,
                    data
                }
            } = action;
            console.log('user Basic bbbb',data.name);
            return {
                isRequesting: false,
                done: status === 'FAIL' ? false : true,
                hasError: status === 'FAIL' ? true : false,
                data,
                status
            }
        case BookingActionType.USER_REQUEST_FAILURE:
            return {
                isRequesting: false,
                done: false,
                ...action.payload,
                hasError: true
            }
        default: return state;
    }
}

export default UserBasicReducer;