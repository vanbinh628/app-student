import UserActionType from '../actions/UserActionType';

const defaultState = {
    isRequesting: false,
    hasError: false,
    done: false,
}

const UserFormReducer = (state = defaultState, action) => {
    switch(action.type) {
        case UserActionType.USER_FORM_REQUEST:
            return {
                isRequesting: true
            }
        case UserActionType.USER_FORM_REQUEST_SUCCESS:
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
        case UserActionType.USER_FORM_REQUEST_FAILURE:
            return {
                isRequesting: false,
                done: false,
                ...action.payload,
                hasError: true
            }
        case UserActionType.USER_FORM_RESET: 
            return defaultState;
        default: return state;
    }
}

export default UserFormReducer;