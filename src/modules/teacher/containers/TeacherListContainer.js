import {connect} from 'react-redux';
import * as action from '../actions/TeacherAction'; 
import TeacherList from '../components/TeacherList'

const mapPropsFromState = (state) => {
    const {
        securityReducer: {
            data: {
                token
            }
        },
        teacherListReducer
    } = state;

    return {
        token,
        teacherListReducer
    }
}

const mapPropsFromDispatch = (dispatch) => {
    return {
        fetchTeacherList: (page = 1, limit = 20, filters = {}, token) => {
            dispatch(action.fetchTeacherList(page, limit, filters, token));
        },
        reset: () => {
            dispatch(action.reset())
        }
    }
}

const mergeProps = (fromState, fromDispatch, ownProps) => {
    return {
        ...fromState,
        ...fromDispatch,
        ...ownProps,
        fetchTeacherList: (page = 1, limit = 20, filters = {}) => {
            fromDispatch.fetchTeacherList(page, limit, filters, fromState.token);
        }
    }
}

const TeacherListContainer = connect(mapPropsFromState, mapPropsFromDispatch, mergeProps)(TeacherList);
export default TeacherListContainer;