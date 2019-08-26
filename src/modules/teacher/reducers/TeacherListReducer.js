import TeacherActionType from '../actions/TeacherActionType';

const defaultState = {
    isRequesting: false,
    done: false,
    hasError: false,
    data: {
        page: 1,
    },
}

const TeacherListReducer = (state = defaultState, action) => {
    const {
        data: {
            page,
            items
        },
        done
    } = state;

    switch (action.type) {
        case TeacherActionType.TEACHER_LIST_REQUEST:
            if (done) {
                return state;
            }

            return {
                ...state,
                isRequesting: true
            };
        case TeacherActionType.TEACHER_LIST_REQUEST_SUCCESS:
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
        case TeacherActionType.TEACHER_LIST_REQUEST_FAILURE:
            return {
                isRequesting: false,
                done: false,
                ...action.payload,
                hasError: true
            };
        case TeacherActionType.TEACHER_LIST_RESET:
            return defaultState;
        default: return state;
    }
}

export default TeacherListReducer;