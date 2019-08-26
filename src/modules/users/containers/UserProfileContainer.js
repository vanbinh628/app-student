import {connect} from 'react-redux';
import * as action from '../actions/UserAction';
import {reset, logout} from '../../security/actions/SecurityAction';
import UserProfile from '../components/UserProfile'

const mapPropsFromState = (state) => {
    const {
        securityReducer: {
            data: {
                token
            }
        },
        userReducer
    } = state;

    return {
        token,
        userReducer
    }
}

const mapPropsFromDispatch = (dispatch) => {
    return {
        fetchProfile: (token) => {
            dispatch(action.fetchProfile(token));
        },
        logout: (playerId, token) => {
            dispatch(logout(playerId, token))
        },
        resetSecurity: () => {
            dispatch(reset())
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
        fetchProfile: () => {
            fromDispatch.fetchProfile(fromState.token);
        },
        logout: (playerId) => {
            fromDispatch.resetSecurity();
            fromDispatch.logout(playerId, fromState.token)
        }
    }
}

const UserProfileContainer = connect(mapPropsFromState, mapPropsFromDispatch, mergeProps)(UserProfile);
export default UserProfileContainer;
