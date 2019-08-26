import BookingActionType from '../actions/BookingActionType';

const defaultState = {
    isRequesting: false,
    done: false,
    hasError: false,
    data: {
        page: 1
    }
}

const TopicReducer = (state = defaultState, action) => {
    const {
        data: {
            page,
            items
        },
        done
    } = state;

    switch(action.type) {
        case BookingActionType.TOPIC_REQUEST:
            if (done) {
                return state;
            }

            return {
                ...state,
                isRequesting: true
            };
        case BookingActionType.TOPIC_REQUEST_SUCCESS:
            const {
                payload: {
                    status,
                    data
                }
            } = action;

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
        case BookingActionType.TOPIC_REQUEST_FAIURE:
            return {
                isRequesting: false,
                done: false,
                ...action.payload,
                hasError: true
            };
        default: return state;
    }
}

export default TopicReducer;