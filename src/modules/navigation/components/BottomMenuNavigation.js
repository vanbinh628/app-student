import React from 'react';
import {createBottomTabNavigator,StackActions } from 'react-navigation';
import {Image} from 'react-native';
import LocationListContainer from '../../location/containers/LocationListContainer';
import {ChooseClassNavigation,NotificationNavigation,ViewUserClassesNavigation,ViewUserClassesContainer,HistoryNavigation, UserNavigation, StationNavigation} from './StackNavigation';

const CHOOSE_CLASS_ICON = require('../../../../assets/icons/teacher.png');
const CHOOSE_CLASS_ACTIVE_ICON = require('../../../../assets/icons/teacher-active.png');
const VIEW_CLASS_ICON = require('../../../../assets/icons/class.png');
const VIEW_CLASS_ACTIVE_ICON = require('../../../../assets/icons/class-active.png');
const NOTIFICATION_ICON = require('../../../../assets/icons/history.png');
const NOTIFICATION_ACTIVE_ICON = require('../../../../assets/icons/history-active.png');
const PROFILE_ICON = require('../../../../assets/icons/profile.png');
const PROFILE_ACTIVE_ICON = require('../../../../assets/icons/profile-active.png');



  
const AppNavigation = createBottomTabNavigator({
    //Teacher: TeacherNavigation,
    Class:ChooseClassNavigation,
    ViewUserClasses: ViewUserClassesNavigation,
    Notification: NotificationNavigation,
    //History: HistoryNavigation,
    User: UserNavigation
},{
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
    },
    navigationOptions: ({navigation }) => ({
        tabBarIcon: ({focused, tintColor}) => {
            switch (navigation.state.routeName) {
                case 'Class':
                    return focused ? <Image source={CHOOSE_CLASS_ACTIVE_ICON}/> : <Image source={CHOOSE_CLASS_ICON}/>
                case 'ViewUserClasses':
                    return focused ? <Image source={VIEW_CLASS_ACTIVE_ICON}/> : <Image source={VIEW_CLASS_ICON}/>
                case 'Notification':
                    return focused ? <Image source={NOTIFICATION_ACTIVE_ICON}/> : <Image source={NOTIFICATION_ICON}/>
                case 'User':
                    return focused ? <Image source={PROFILE_ACTIVE_ICON}/> : <Image source={PROFILE_ICON}/>
                default: return null;
            }
        },
        tabBarOnPress: ({defaultHandler, navigation}) => {
            if (navigation.state.routeName === "Class") {
                navigation.navigate("ChooseClass");
            } 
                defaultHandler();
        }
        
    })
});

export default AppNavigation;
