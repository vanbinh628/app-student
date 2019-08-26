import {connect} from 'react-redux';
import * as action from '../actions/TopicAction'; 
import ListTopicScreen from '../components/ListTopicScreen';
//import ListTopicTest from '../components/ListTopicTest'
const mapPropsFromState = (state) => {
    const {
        securityReducer: {
            data: {
                token
            }
        },
        topicListReducer
    } = state;

    return {
        token,
        topicListReducer
    }
}

const mapPropsFromDispatch = (dispatch) => {
    return {
        fetchTopicList: (page = 1, limit = 20,filters = {}, token) => {
            dispatch(action.fetchTopicList(page, limit, filters, token));
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
        fetchTopicList: (page = 1, limit = 20, filters = {}) => {
            fromDispatch.fetchTopicList(page, limit, filters, fromState.token);
        }
    }
}

const TopicListContainer = connect(mapPropsFromState, mapPropsFromDispatch, mergeProps)(ListTopicScreen);
export default TopicListContainer;