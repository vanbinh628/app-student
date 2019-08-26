import {connect} from 'react-redux';
import {checkIn, reviewClass, reset} from '../../booking/actions/BookingAction';
import * as action from '../actions/';
import ClassDetail from '../components/ClassDetail'

const mapPropsFromState = (state) => {
    const {
        securityReducer: {
            data: {
                token
            }
        },
        historyReducer,
        classReducer,
        bookingReducer
    } = state;

    return {
        token,
        historyReducer,
        classReducer,
        bookingReducer
    }
}

const mapPropsFromDispatch = (dispatch) => {
    return {
        fetchBookingDetail: (classId, token) => {
            dispatch(action.fetchBookingDetail(classId, token))
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
        fetchBookingDetail: (classId) => {
            fromDispatch.fetchBookingDetail(classId, fromState.token);
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