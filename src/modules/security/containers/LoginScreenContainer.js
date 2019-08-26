import {connect} from 'react-redux';
import * as action from '../actions/SecurityAction'; 
import LoginScreen from '../components/LoginScreen'

const mapPropsFromState = (state) => {
    const {
        securityReducer
    } = state;

    return {
        securityReducer
    }
}

const mapPropsFromDispatch = (dispatch) => {
    return {
        login: (username, password, playerId) => {
            dispatch(action.login(username, password, playerId));
        },
        loadCredential: (data) => {
            dispatch(action.loadCredential(data))
        },
        checkToken: (token) => {
            return dispatch(action.checkToken(token))
        },
        reset: () => {
            dispatch(action.reset())
        }
    }
}

const LoginScreenContainer = connect(mapPropsFromState, mapPropsFromDispatch)(LoginScreen);
export default LoginScreenContainer;