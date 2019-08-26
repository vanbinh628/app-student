import {connect} from 'react-redux';
import * as action from '../actions/NotificationAction'; 
import {cancelClass, reset} from '../../booking/actions/BookingAction';
import Notification from '../components/Notification'

const mapPropsFromState = (state) => {
    const {
        securityReducer: {
            data: {
                token
            }
        },
        notiReducer
    } = state;

    return {
        token,
        notiReducer
    }
}

const mapPropsFromDispatch = (dispatch) => {
    return {
        fetchNoti: (page = 1, limit = 20, filters = {}, token) => {
            dispatch(action.fetchNotification(page, limit, filters, token));
        },
    }
}

const mergeProps = (fromState, fromDispatch, ownProps) => {
    return {
        ...fromState,
        ...fromDispatch,
        ...ownProps,
        fetchNoti: (page = 1, limit = 20, filters = {}) => {
            fromDispatch.fetchNoti(page, limit, filters, fromState.token);
        },
    }
}

const NotificationContainer = connect(mapPropsFromState, mapPropsFromDispatch, mergeProps)(Notification);
export default NotificationContainer;