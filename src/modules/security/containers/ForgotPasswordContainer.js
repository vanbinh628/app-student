import {connect} from 'react-redux';
import * as action from '../actions/SecurityAction'; 
import ForgotPassword from '../components/ForgotPassword'

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
        forgotPassword: (email) => {
            dispatch(action.forgotPassword(email));
        },
        reset: () => {
            dispatch(action.reset())
        }
    }
}

const ForgotPasswordContainer = connect(mapPropsFromState, mapPropsFromDispatch)(ForgotPassword);
export default ForgotPasswordContainer;