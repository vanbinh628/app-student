import {connect} from 'react-redux';
import * as action from '../actions/BookingAction'; 
import TopicSelection from '../components/TopicSelection'

const mapPropsFromState = (state) => {
    const {
        securityReducer: {
            data: {
                token,
                level
            }
        },
        topicReducer
    } = state;

    return {
        token,
        level,
        topicReducer
    }
}

const mapPropsFromDispatch = (dispatch) => {
    return {
        fetchTopic: (page = 1, limit = 20, filters = {}, token) => {
            dispatch(action.fetchTopic(page, limit, filters, token));
        },
    }
}

const mergeProps = (fromState, fromDispatch, ownProps) => {
    return {
        ...fromState,
        ...fromDispatch,
        ...ownProps,
        fetchTopic: (page = 1, limit = 20, filters = {}) => {
            fromDispatch.fetchTopic(page, limit, filters, fromState.token);
        }
    }
}

const TopicSelectionContainer = connect(mapPropsFromState, mapPropsFromDispatch, mergeProps)(TopicSelection);
export default TopicSelectionContainer;