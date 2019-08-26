import HistoryActionType from '../actions/HistoryActionType';
import moment from 'moment';

const defaultState = {
    isRequesting: false,
    done: false,
    hasError: false,
    data: {
        page: 1
    }
}

const formatData = (history) => {
    let pending = [];
    let approved = [];
    let completed = [];
    let active = [];


    history.forEach((item) => {
        if (item.status === 0) {
            pending.push(item);
        } else if (item.status === 2 || item.status === 3) {
            const diff = moment(item.class[0].dateStarted).diff(moment(), 'minutes');
            const isBeforeEnd = moment(item.class[0].dateEnded).isAfter();
            if (diff <= 15 && isBeforeEnd) {
                active.push(item);
            } else if (diff > 15) {
                approved.push(item);
            } else {
                completed.push(item);
            }
        } else {
            completed.push(item);
        }
    })

    return [{pending}, {active}, {approved}, {completed}];
}

const HistoryReducer = (state = defaultState, action) => {
    const {
        data: {
            page,
            items
        },
        done
    } = state;
    
    switch(action.type) {
        case HistoryActionType.HISTORY_REQUEST:
            if (page > 1 && done) {
                return state;
            }

            return {
                ...state,
                isRequesting: true
            };
        case HistoryActionType.HISTORY_REQUEST_SUCCESS:
            let {
                payload: {
                    status,
                    data
                }
            } = action;

            if (data.page === 1) {
                data.items = formatData(data.items);
            }

            if (+data.page > +page) {
                return {
                    isRequesting: false,
                    done: status === 'FAIL' ? false : true,
                    hasError: status === 'FAIL' ? true : false,
                    data: {
                        ...data,
                        items: [...items, ...data.items]
                    },
                    status
                };
            }

            return {
                isRequesting: false,
                done: status === 'FAIL' ? false : true,
                hasError: status === 'FAIL' ? true : false,
                data,
                status
            };
        case HistoryActionType.HISTORY_REQUEST_FAILURE:
            return {
                isRequesting: false,
                done: false,
                ...action.payload,
                hasError: true
            };
        default: return state;
    }
}

export default HistoryReducer;