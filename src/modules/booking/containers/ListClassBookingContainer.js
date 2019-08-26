import {connect} from 'react-redux';
import * as action from '../actions/BookingAction'; 
import ListClassBooking from '../components/ListClassBooking'

const mapPropsFromState = (state) => {
    const {
        securityReducer: {
            data: {
                _id,
                token
            }
        },
        scheduleReducer,
        bookingReducer
    } = state;

    return {
        userId: _id,
        token,
        scheduleReducer,
        bookingReducer
    }
}

const mapPropsFromDispatch = (dispatch) => {
    return {
        fetchClass: (page = 1, limit = 20, filters = {}, token) => {
            dispatch(action.fetchClass(page, limit, filters, token));
        },
        fetchSchedule: (page = 1, limit = 20, filters = {}, token) => {
            dispatch(action.fetchSchedule(page, limit, filters, token));
        },
        fetchStationSchedule: (page = 1, limit = 20, filters = {}, token) => {
            dispatch(action.fetchStationSchedule(page, limit, filters, token))
        },
        bookClass: (data, token) => {
            dispatch(action.bookClass(data, token))
        },
        requestSchedule: () => {
            dispatch(action.requestSchedule())
        },
        reset: () => {
            dispatch(action.reset());
        }
    }
}

const mergeProps = (fromState, fromDispatch, ownProps) => {
    return {
        ...fromDispatch,
        ...fromState,
        ...ownProps,
        fetchClass: (page = 1 , limit = 20, filters = {}) => {
            fromDispatch.fetchClass(page, limit, filters, fromState.token);
        },
        fetchSchedule: (page = 1 , limit = 20, filters = {}) => {
            fromDispatch.fetchSchedule(page, limit, filters, fromState.token);
        },
        fetchStationSchedule: (page = 1 , limit = 20, filters = {}) => {
            fromDispatch.fetchStationSchedule(page, limit, filters, fromState.token);
        },
        bookClass: (data) => {
            fromDispatch.bookClass(data, fromState.token);
        }
    }
}

const ListClassBookingContainer = connect(mapPropsFromState, mapPropsFromDispatch, mergeProps)(ListClassBooking);
export default ListClassBookingContainer;