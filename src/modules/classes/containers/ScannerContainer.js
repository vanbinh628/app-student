import {connect} from 'react-redux';
import {checkIn, reset} from '../../booking/actions/BookingAction';
import Scanner from '../components/Scanner'

const mapPropsFromState = (state) => {
    const {
        securityReducer: {
            data: {
                token
            }
        },
        bookingReducer
    } = state;

    return {
        token,
        bookingReducer
    }
}

const mapPropsFromDispatch = (dispatch) => {
    return {
        checkIn: (bookingID, data, token) => {
            dispatch(checkIn(bookingID, data, token))
        },
        resetBooking: () => {
            dispatch(reset())
        }
    }
}

const mergeProps = (fromState, fromDispatch, ownProps) => {
    return {
        ...fromState,
        ...fromDispatch,
        ...ownProps,
        checkIn: (qrCode, bookingID) => {
            fromDispatch.checkIn(bookingID, {qrCode}, fromState.token);
        }
    }
}

const ScannerContainer = connect(mapPropsFromState, mapPropsFromDispatch, mergeProps)(Scanner);
export default ScannerContainer;