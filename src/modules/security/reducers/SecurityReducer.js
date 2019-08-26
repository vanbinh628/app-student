import SecurityActionType from '../actions/SecurityActionType';

const defaultState = {
    isRequesting: false,
    hasError: false,
    done: false,
}

const SecurityReducer = (state = defaultState, action) => {
    switch(action.type) {
        case SecurityActionType.SECURITY_LOGIN_REQUEST:
            return {
                isRequesting: true
            }
        case SecurityActionType.SECURITY_LOGIN_SUCCESS:
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
            }
        case SecurityActionType.SECURITY_LOAD_SUCCESS:
            return {
                isRequesting: false,
                done: true,
                hasError: false,
                data: action.payload,
                isLoaded: true,
            }
        case SecurityActionType.SECURITY_LOGIN_FAILURE:
            return {
                isRequesting: false,
                done: false,
                ...action.payload,
                hasError: true
            }
        case SecurityActionType.SECURITY_LOGIN_RESET: 
            return defaultState;
        default: return state;
    }
}

export default SecurityReducer;