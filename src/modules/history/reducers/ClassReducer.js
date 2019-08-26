import HistoryActionType from '../actions/HistoryActionType';

const defaultState = {
    isRequesting: false,
    done: false,
    hasError: false,
    data: {}
}

const ClassReducer = (state = defaultState, action) => {

    switch(action.type) {
        case HistoryActionType.CLASS_REQUEST:
            return {
                ...state,
                isRequesting: true
            };
        case HistoryActionType.CLASS_REQUEST_SUCCESS:
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
        case HistoryActionType.CLASS_REQUEST_FAILURE:
            return {
                isRequesting: false,
                done: false,
                ...action.payload,
                hasError: true
            };
        case HistoryActionType.CLASS_RESET:
            return defaultState;
        default: return state;
    }
}

export default ClassReducer;