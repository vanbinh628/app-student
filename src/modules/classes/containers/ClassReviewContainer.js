import {connect} from 'react-redux';
import {createFeedBack} from '../../booking/actions/BookingAction';
import * as action from '../actions/ViewUserClassesAction';
import ClassReview from '../components/ClassReview'

const mapPropsFromState = (state) => {
    const {
        securityReducer: {
            data: {
                token
            }
        },
        classReducer,
        reviewReducer,
        bookingReducer
    } = state;

    return {
        token,
        classReducer,
        reviewReducer,
        bookingReducer,
    }
}

const mapPropsFromDispatch = (dispatch) => {
    return {
        fetchBookingDetail: (classId, token) => {
            dispatch(action.fetchBookingDetail(classId, token))
        },
        fetchReviewDetail: (filters={}, token) => {
            dispatch(action.fetchReviewDetail(filters, token))
        },
        createFeedBack: (data, token) => {
            dispatch(createFeedBack(data, token))
        }
    }
}

const mergeProps = (fromState, fromDispatch, ownProps) => {
    return {
        ...fromState,
        ...fromDispatch,
        ...ownProps,
        fetchBookingDetail: (classId) => {
            fromDispatch.fetchBookingDetail(classId, fromState.token);
        },
        fetchReviewDetail: (filters={}) => {
            fromDispatch.fetchReviewDetail(filters, fromState.token);
        },
        createFeedBack: (data) => {
            fromDispatch.createFeedBack(data, fromState.token);
        }
    }
}

const ClassReviewContainer = connect(mapPropsFromState, mapPropsFromDispatch, mergeProps)(ClassReview);
export default ClassReviewContainer;