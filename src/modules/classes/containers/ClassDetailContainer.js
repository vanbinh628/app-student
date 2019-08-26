import {connect} from 'react-redux';
import {checkIn, reviewClass, reset} from '../../booking/actions/BookingAction';
import * as action from '../actions/ViewUserClassesAction';
import ClassDetail from '../components/ClassDetail'

const mapPropsFromState = (state) => {
    const {
        securityReducer: {
            data: {
                token
            }
        },
        classNotificationReducer,
        classReducer,
        bookingReducer
    } = state;

    return {
        classNotificationReducer,
        token,
        classReducer,
        bookingReducer
    }
}

const mapPropsFromDispatch = (dispatch) => {
    return {
        fetchBookingDetail: (BookingId, token) => {
            dispatch(action.fetchBookingDetail(BookingId, token))
        },
        fetchDetailClass: (classId, token) => {
            dispatch(action.fetchDetailClass(classId, token))
        },
        checkIn: (bookingID, data, token) => {
            dispatch(checkIn(bookingID, data, token))
        },
        reviewClass: (data, token) => {
            dispatch(reviewClass(data, token))
        },
        resetBooking: () => {
            dispatch(reset())
        }
    }
}

const mergeProps = (fromState, fromDispatch, ownProps) => {
    return {
        ...fromState,
        ...fromDispatch,
        ...ownProps,
        fetchBookingDetail: (BookingId) => {
            fromDispatch.fetchBookingDetail(BookingId, fromState.token);
        },
        fetchDetailClass: (classId) => {
            fromDispatch.fetchDetailClass(classId, fromState.token);
        },
        reviewClass: (data) => {
            fromDispatch.reviewClass(data, fromState.token);
        },
        checkIn: (bookingID, data) => {
            fromDispatch.checkIn(bookingID, data, fromState.token);
        }
    }
}

const ClassDetailContainer = connect(mapPropsFromState, mapPropsFromDispatch, mergeProps)(ClassDetail);
export default ClassDetailContainer;