import {connect} from 'react-redux';
import * as action from '../actions/SecurityAction'; 
import Register from '../components/Register'

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
        register: (name, phone, email, password) => {
            dispatch(action.register(name, phone, email, password));
        },
        reset: () => {
            dispatch(action.reset())
        }
    }
}

const RegisterContainer = connect(mapPropsFromState, mapPropsFromDispatch)(Register);
export default RegisterContainer;