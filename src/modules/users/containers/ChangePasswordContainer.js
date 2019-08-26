import {connect} from 'react-redux';
import * as action from '../actions/UserAction';
import ChangePassword from '../components/ChangePassword'

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
        changePassword: (data, token) => {
            dispatch(action.changePassword(data, token));
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
        changePassword: (data) => {
            fromDispatch.changePassword(data,  fromState.token);
        },
    }
}

const ChangePasswordContainer = connect(mapPropsFromState, mapPropsFromDispatch, mergeProps)(ChangePassword);
export default ChangePasswordContainer;
