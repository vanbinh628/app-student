import ViewUserClassesActionType from '../actions/ViewUserClassesActionType';

const defaultState = {
    isRequesting: false,
    done: false,
    hasError: false,
    data: {}
}

const ClassNotificationReducer = (state = defaultState, action) => {

    switch(action.type) {
        case ViewUserClassesActionType.DETAIL_CLASS_REQUEST:
            return {
                ...state,
                isRequesting: true
            };
        case ViewUserClassesActionType.DETAIL_CLASS_REQUEST_SUCCESS:
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
            };
        case ViewUserClassesActionType.USER_CLASSES_REQUEST_FAILURE:
            return {
                isRequesting: false,
                done: false,
                ...action.payload,
                hasError: true
            };
        case ViewUserClassesActionType.DETAIL_CLASS_RESET:
            return defaultState;
        default: return state;
    }
}
export default ClassNotificationReducer;