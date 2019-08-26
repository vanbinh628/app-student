import React from 'react';
import { createStackNavigator, createMaterialTopTabNavigator, StackActions } from 'react-navigation';
import TeacherListContainer from '../../teacher/containers/TeacherListContainer';
import TeacherScheduleContainer from '../../booking/containers/TeacherScheduleContainer';
import NotificationContainer from '../../notification/containers/NotificationContainer';
import UserClassesContainer from '../../history/containers/UserClassesContainer';

import ListClassBookingContainer from '../../booking/containers/ListClassBookingContainer';

// import ClassDetailContainer from '../../history/containers/ClassDetailContainer';
// import ScannerContainer from '../../history/containers/ScannerContainer';
import UserProfileContainer from '../../users/containers/UserProfileContainer';
import UserProfileEditContainer from '../../users/containers/UserProfileEditContainer';
import ChangePasswordContainer from '../../users/containers/ChangePasswordContainer';
import LocationListContainer from '../../location/containers/LocationListContainer';

import TopicListContainer from '../../topic/containers/TopicListContainer';
import MoreInfoClassContainer from '../../booking/containers/MoreInfoClassContainer';
import SwiperClass from '../../classes/components/SwiperClass'
import ViewUserClassesContainer from '../../../modules/classes/containers/ViewUserClassesContainer';

//import MoreInfoClass from '../../booking/components/MoreInfoClass';
import ClassDetailContainer from '../../classes/containers/ClassDetailContainer';
import ScannerContainer from '../../classes/containers/ScannerContainer';
import ClassReviewContainer from '../../classes/containers/ClassReviewContainer';
export const TeacherNavigation = createStackNavigator({
  Home: TeacherListContainer,
  Schedule: TeacherScheduleContainer,
}, {
    initialRouteName: "Home",
    navigationOptions: () => ({
      header: null,
    })
  });
export const ChooseClassNavigation = createStackNavigator({

  ChooseClass: SwiperClass,
  ListTopic: TopicListContainer,
  ListClass: ListClassBookingContainer,
  MoreInfoClass: MoreInfoClassContainer,

}, {
    initialRouteName: "ChooseClass",
    navigationOptions: () => ({

    })
  });
  export const NotificationNavigation = createStackNavigator({
    Notification: NotificationContainer,
    ClassDetail: ClassDetailContainer,
  }, {
      initialRouteName: "Notification",
      //initialRouteName: "Location",
    }); 

export const StationNavigation = createStackNavigator({
  Location: LocationListContainer,
  Schedule: TeacherScheduleContainer,
}, {
    //initialRouteName: "LocationList",
    //initialRouteName: "Location",
    navigationOptions: () => ({
      header: null,
    })
  });

const ViewUserClassesTabNavigator = createMaterialTopTabNavigator({

  YourClass: {
    screen: ViewUserClassesContainer,
    navigationOptions: () => ({
      title: "All",
      swipeEnabled: true,
      tabBarOptions: {
        upperCaseLabel: false,
        scrollEnabled: true,
        labelStyle: {
          fontFamily: 'Lato',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: 11.5,
          textAlign: 'center',
          color: '#7A7A7A'
        },
        tabStyle: {
          width: 102,
          height: 80,
          paddingTop: 50,
          backgroundColor: 'none',
          alignItems: 'center',
        },
        style: {
          backgroundColor: 'none',
          paddingBottom: 5,
          elevation: 0,
          marginLeft: 12,
          marginRight:12
        },
        indicatorStyle: {
          borderBottomColor: '#FEAF34',
          borderBottomWidth: 5,
        }
      }
    })
  },
  PrivateClass: {
    screen: ViewUserClassesContainer,
    navigationOptions: () => ({
      title: "Private Class",
      swipeEnabled: true,
      tabBarOptions: {
        upperCaseLabel: false,
        scrollEnabled: true,
        labelStyle: {
          fontFamily: 'Lato',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: 11.5,
          textAlign: 'center',
          color: '#7A7A7A'
        },
        tabStyle: {
          width: 102,
          height: 80,
          paddingTop: 50,
          backgroundColor: 'none',
          alignItems: 'center',
        },
        style: {
          backgroundColor: 'none',
          paddingBottom: 5,
          elevation: 0,
          marginLeft: 12,
          marginRight:12
        },
        indicatorStyle: {
          borderBottomColor: '#6DCFF6',
          borderBottomWidth: 5,
        }
      }
    })
  },
  GroupClass: {
    screen: ViewUserClassesContainer,
    navigationOptions: () => ({
      title: "Group Class",
      swipeEnabled: true,
      tabBarOptions: {
        upperCaseLabel: false,
        scrollEnabled: true,
        labelStyle: {
          fontFamily: 'Lato',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: 11.5,
          textAlign: 'center',
          color: '#7A7A7A'
        },
        tabStyle: {
          width: 102,
          height: 80,
          paddingTop: 50,
          backgroundColor: 'none',
          alignItems: 'center',
        },
        style: {
          backgroundColor: 'none',
          paddingBottom: 5,
          elevation: 0,
          marginLeft: 12,
          marginRight:12
        },
        indicatorStyle: {
          borderBottomColor: '#3CBA54',
          borderBottomWidth: 5,
        }
      }
    })
  },
  Workshop: {
    screen: ViewUserClassesContainer,
    navigationOptions: () => ({
      title: "Workshop",
      swipeEnabled: true,
      tabBarOptions: {
        upperCaseLabel: false,
        scrollEnabled: true,
        labelStyle: {
          fontFamily: 'Lato',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: 11.5,
          textAlign: 'center',
          color: '#7A7A7A'
        },
        tabStyle: {
          width: 102,
          height: 80,
          paddingTop: 50,
          backgroundColor: 'none',
          alignItems: 'center',
        },
        style: {
          backgroundColor: 'none',
          paddingBottom: 5,
          elevation: 0,
          marginLeft: 12,
          marginRight:12
        },
        indicatorStyle: {
          borderBottomColor: '#029CC7',
          borderBottomWidth: 5,
        }
      }
    })
  },

},
  // {
  // navigationOptions: () => ({
  //   tabBarOnPress: ({defaultHandler, navigation}) => {
  //     navigation.dispatch(StackActions.popToTop());

  //       //defaultHandler();
  //   }
  // })
  // },
  {
    initialRouteName: "YourClass",
    lazy: true,

  })

const HistoryTabNavigator = createMaterialTopTabNavigator({
    YourClass: {
        screen: UserClassesContainer,
        navigationOptions: () => ({
            title: "Your Class",
        })
    },
    Notification: {
        screen: NotificationContainer,
        navigationOptions: () => ({
            title: "Notification"
        })
    }
}, {
    initialRouteName: "YourClass",
    lazy: true,
    tabBarOptions: {
        upperCaseLabel: false,
        style: {
            backgroundColor: "transparent",
            marginTop: 22
        },
        labelStyle: {
            color: "#404040",
            fontWeight: "bold"
        },
        indicatorStyle: {
            backgroundColor: "#6DCFF6",
        }
        
    }
})


export const ViewUserClassesNavigation = createStackNavigator({
  UserClasses: ViewUserClassesTabNavigator,
  ClassDetail: ClassDetailContainer,
  Scanner: ScannerContainer,
  ClassReview: ClassReviewContainer
}, {
    initialRouteName: "UserClasses",
    navigationOptions: () => ({
      header: null,
    })

  })

//Quan code
// export const HistoryNavigation = createStackNavigator({
//     History: HistoryTabNavigator,
//     ClassDetail: ClassDetailContainer,
//     Scanner: ScannerContainer
// }, {
//     initialRouteName: "History",
//     navigationOptions: () => ({
//         header: null,
//     })

// })

export const UserNavigation = createStackNavigator({
  Profile: UserProfileContainer,
  EditProfile: UserProfileEditContainer,
  ChangePassword: ChangePasswordContainer
}, {
    initialRouteName: "Profile",
    navigationOptions: () => ({
      header: null,
    })
  })

// export default StackNavigation;