import {connect} from 'react-redux';
import * as action from '../actions/UserAction';
import UserProfileEdit from '../components/UserProfileEdit'

const mapPropsFromState = (state) => {
    const {
        securityReducer: {
            data: {
                token
            }
        },
        userReducer,
        userFormReducer
    } = state;

    return {
        token,
        userReducer,
        userFormReducer
    }
}

const mapPropsFromDispatch = (dispatch) => {
    return {
        updateProfile: (data, token) => {
            dispatch(action.updateProfile(data, token));
        },
        uploadImage: (data) => {
            return dispatch(action.uploadImage(data));
        },
        reset: () => {
            dispatch(action.resetForm())
        }
    }
}

const mergeProps = (fromState, fromDispatch, ownProps) => {
    return {
        ...fromState,
        ...fromDispatch,
        ...ownProps,
        updateProfile: (data) => {
            fromDispatch.updateProfile(data,  fromState.token);
        },
    }
}

const UserProfileEditContainer = connect(mapPropsFromState, mapPropsFromDispatch, mergeProps)(UserProfileEdit);
export default UserProfileEditContainer;
