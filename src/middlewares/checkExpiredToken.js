import {Alert} from 'react-native';

const checkExpiredToken = store => next => action => {
    if (action.payload /*&& action.payload.staus === "FAIL"*/) {
        console.log(action.type)
    }

    return next(action);
}

export default checkExpiredToken;