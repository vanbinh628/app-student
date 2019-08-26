import {connect} from 'react-redux';
import * as action from '../actions/ViewUserClassesAction'; 
import {cancelClass, reset} from '../../booking/actions/BookingAction';
import ViewUserClasses from '../components/ViewUserClasses'

const mapPropsFromState = (state) => {
    const {
        securityReducer: {
            data: {
                token
            }
        },
        userClassesReducer,
        bookingReducer,
    } = state
    return {
        token,
        userClassesReducer,
        bookingReducer
    }
}

const mapPropsFromDispatch = (dispatch) => {
    return {
        fetchUserClasses: (page, limit, filters = {}, token) => {
            dispatch(action.fetchUserClasses(page, limit, filters, token));
        },
        cancelClass: (bookingID, token) => {
            console.log('Call container 11111',bookingID)
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
        fetchUserClasses: (page, limit, filters = {}) => {
           
            fromDispatch.fetchUserClasses(page, limit, filters, fromState.token);
        },
        cancelClass: (bookingID) => {
            console.log('Call container 4444',bookingID);
            fromDispatch.cancelClass(bookingID, fromState.token);
        }
    }
}

const ViewUserClassesContainer = connect(mapPropsFromState, mapPropsFromDispatch, mergeProps)(ViewUserClasses);
export default ViewUserClassesContainer;