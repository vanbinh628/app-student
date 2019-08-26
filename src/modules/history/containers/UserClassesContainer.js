import {connect} from 'react-redux';
import * as action from '../actions/HistoryAction'; 
import {cancelClass, reset} from '../../booking/actions/BookingAction';
import UserClasses from '../components/UserClasses'

const mapPropsFromState = (state) => {
    const {
        securityReducer: {
            data: {
                token
            }
        },
        historyReducer,
        bookingReducer
    } = state;

    return {
        token,
        historyReducer,
        bookingReducer
    }
}

const mapPropsFromDispatch = (dispatch) => {
    return {
        fetchHistory: (page = 1, limit = 20, filters = {}, token) => {
            dispatch(action.fetchHistory(page, limit, filters, token));
        },
        cancelClass: (bookingID, token) => {
            dispatch(cancelClass(bookingID, token))
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
        fetchHistory: (page = 1, limit = 20, filters = {}) => {
            fromDispatch.fetchHistory(page, limit, filters, fromState.token);
        },
        cancelClass: (bookingID) => {
            fromDispatch.cancelClass({bookingID}, fromState.token);
        }
    }
}

const UserClassesContainer = connect(mapPropsFromState, mapPropsFromDispatch, mergeProps)(UserClasses);
export default UserClassesContainer;