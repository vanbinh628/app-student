import { combineReducers } from 'redux';

import SecurityReducer from './modules/security/reducers/SecurityReducer';
import TeacherListReducer from './modules/teacher/reducers/TeacherListReducer';
import ScheduleReducer from './modules/booking/reducers/ScheduleReducer';
import TopicReducer from './modules/booking/reducers/TopicReducer';
import BookingReducer from './modules/booking/reducers/BookingReducer';
import HistoryReducer from './modules/history/reducers/HistoryReducer';
import NotificationReducer from './modules/notification/reducers/NotificationReducer';
//import ClassReducer from './modules/history/reducers/ClassReducer';
import UserReducer from './modules/users/reducers/UserReducer';
import UserFormReducer from './modules/users/reducers/UserFormReducer';
import LocationListReducer from './modules/location/reducers/LocationListReducer';
import TopicListReducer from './modules/topic/reducers/TopicListReducer'
import MoreInfoClassReducer from './modules/booking/reducers/MoreInfoClassReducer';
import ViewUserClassesReducer from './modules/classes/reducers/ViewUserClassesReducer';
import UserBasicReducer from './modules/booking/reducers/UserBasicReducer';
import ClassReducer from './modules/classes/reducers/ClassReducer';
import ReviewReducer from './modules/classes/reducers/ReviewReducer';
import ClassNotificationReducer from './modules/classes/reducers/ClassNotificationReducer'

export default combineReducers({
    securityReducer: SecurityReducer,
    teacherListReducer: TeacherListReducer,
    scheduleReducer: ScheduleReducer,
    topicReducer: TopicReducer,
    bookingReducer: BookingReducer,
    historyReducer: HistoryReducer,
    notiReducer: NotificationReducer,
    userReducer: UserReducer,
    userFormReducer: UserFormReducer,
    locationListReducer: LocationListReducer,
    topicListReducer:TopicListReducer,
    detailClassReducer:MoreInfoClassReducer,
    userClassesReducer:ViewUserClassesReducer,
    userBasicReducer:UserBasicReducer,
    classReducer: ClassReducer,
    reviewReducer: ReviewReducer,
    classNotificationReducer: ClassNotificationReducer,
});