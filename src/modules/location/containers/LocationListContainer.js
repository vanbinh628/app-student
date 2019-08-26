import {connect} from 'react-redux';
import * as action from '../actions/LocationAction'; 
import LocationList from '../components/LocationList'

const mapPropsFromState = (state) => {
    const {
        securityReducer: {
            data: {
                token
            }
        },
        locationListReducer
    } = state;

    return {
        token,
        locationListReducer
    }
}

const mapPropsFromDispatch = (dispatch) => {
    return {
        fetchLocationList: (page = 1, limit = 20, filters = {}, token) => {
            dispatch(action.fetchLocationList(page, limit, filters, token));
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
        fetchLocationList: (page = 1, limit = 20, filters = {}) => {
            fromDispatch.fetchLocationList(page, limit, filters, fromState.token);
        }
    }
}

const LocationListContainer = connect(mapPropsFromState, mapPropsFromDispatch, mergeProps)(LocationList);
export default LocationListContainer;