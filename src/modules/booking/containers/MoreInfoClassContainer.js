import {connect} from 'react-redux';
import * as action from '../actions/BookingAction';
import MoreInfoClass from '../components/MoreInfoClass'

const mapPropsFromState = (state) => {
    const {
        securityReducer: {
            data: {
                token
            }
        },
        detailClassReducer,
        userBasicReducer,
    } = state;

    return {
        token,
        detailClassReducer,
        userBasicReducer,
    }
}

// const mapPropsFromDispatch = (dispatch) => {
//     return {
//         fetchProfile: (token) => {
//             dispatch(action.fetchProfile(token));
//         },
//     }
// }
const mapPropsFromDispatch = (dispatch) => {
    return {
        fetchDetailClass: (classID, token) => {
            dispatch(action.fetchDetailClass(classID, token));
        },
        fetchUserBasic: (userID, token) => {
            dispatch(action.fetchUserBasic(userID, token));
        },
    }
}
const mergeProps = (fromState, fromDispatch, ownProps) => {
    return {
        ...fromState,
        ...fromDispatch,
        ...ownProps,
        fetchDetailClass: (classID) => {
            fromDispatch.fetchDetailClass(classID,fromState.token);
        },
        fetchUserBasic: (userID) => {
            fromDispatch.fetchUserBasic(userID,fromState.token);
        }
    }
}

const MoreInfoClassContainer = connect(mapPropsFromState, mapPropsFromDispatch, mergeProps)(MoreInfoClass);
export default MoreInfoClassContainer;
