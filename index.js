/** @format */

import React, {Component} from 'react';
import {AppRegistry, AsyncStorage} from 'react-native';
import codePush from "react-native-code-push";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose} from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import SplashScreen from 'react-native-splash-screen';
import OneSignal from 'react-native-onesignal';
import rootReducers from './src/reducer';
import App from './App';
import {name as appName} from './app.json';
import {ONE_SIGNAL_APP_ID} from './env';
import checkToken from './src/middlewares/checkExpiredToken';

const store = createStore(
    rootReducers, 
    compose(applyMiddleware(thunk, apiMiddleware, checkToken))
    );

if (__DEV__) {
    GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
}
// const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);
class SmartRApp extends Component {
    constructor(props) {
        super(props);

        OneSignal.init(ONE_SIGNAL_APP_ID);
        OneSignal.configure();
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentDidMount() {
        SplashScreen.hide();
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        console.log("Notification received: ", notification);
      }

    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }

    onIds(device) {
        console.log('ZZZZZZZZZZZ', device);
        if (device.userId) {
            AsyncStorage.setItem("PLAYER_ID", device.userId).catch(e => {
                console.log('AAAAAAAAAAAA', e);
            })
            console.log("User id ", device.userId);
        }
    }

    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

SmartRApp = codePush(SmartRApp);
AppRegistry.registerComponent(appName, () => SmartRApp);
