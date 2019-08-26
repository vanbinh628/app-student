import React, {Component} from 'react';
import {StatusBar, NativeModules, LayoutAnimation, ActivityIndicator} from 'react-native';
import StarRating from 'react-native-star-rating';
import { StackActions, NavigationActions } from 'react-navigation';
import * as styled from '../styles/TeacherScheduleStyles';
import HorizontalCalender from '../../common/calender/HorizontalCalender';
import moment from 'moment';
import TopicSelectionContainer from '../containers/TopicSelectionContainer';
import TeacherMessageModal from './TeacherMessageModal';
import LoadingModal from '../../common/LoadingModal';
import MessageModal from '../../common/MessageModal';

const BACK_ARROW = require('../../../../assets/icons/back-arrow.png');
const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const getHourFormat = (start, end) => {
    const startDate = moment(start).format('HH:mm');
    const endDate = moment(end).format('HH:mm');

    return `${startDate} - ${endDate}`
}
const classTypeText = ["1-on-1 Class", "Group Class", "Workshop"]

class TeacherSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessageModal: false,
            bookingStep: 1,
            selectedClass: {},
            topicId: '',
            topicName: '',
            message: '',
        }

        const teacher = props.navigation.getParam("teacher", {});
        const location = props.navigation.getParam("location", {});
        const initialDate = moment();
        const filters = {
            start: initialDate.valueOf(),
            end: initialDate.endOf("day").valueOf()
        }

        if (teacher._id) {
            filters.teacherID = teacher._id;
            this.state.fromLocation = false;
            props.fetchSchedule(1, 20, filters);
        } else if (location._id) {
            filters.locationID = location._id;
            this.state.fromLocation = true;
            // props.requestSchedule();
            // props.fetchStationSchedule(1, 20, filters);
            props.fetchClass(1, 20, filters);
        }
    }

    keyExtractor = (item, index) => `schedule-${index}`;

    handleSelectDate = (date, index) => {
        const teacher = this.props.navigation.getParam("teacher", {});
        const location = this.props.navigation.getParam("location", {});
        const filters = {
            start: index ? date.startOf("day").valueOf() : moment().valueOf(),
            end: date.endOf("day").valueOf(),
        }

        if (teacher._id) {
            filters.teacherID = teacher._id;
            this.props.fetchSchedule(1, 20, filters);
        } else if (location._id) {
            filters.locationID = location._id;
            // filters.status = 2;
            // this.props.requestSchedule();
            // this.props.fetchStationSchedule(1, 20, filters);
            this.props.fetchClass(1, 20, filters);
        }
    }

    handleBooking = (item) => {
        this.setState({
            bookingStep: this.state.bookingStep + 1,
            selectedClass: { ...item }
        });
    }

    handleTopicNext = () => {
        this.setState({
            bookingStep: this.state.bookingStep + 1,
        });
    }

    handleSelectTopic = (topicId, topicName, subjectId, subjectName) => {
        this.setState({
            topicId,
            topicName,
            subjectId,
            subjectName
        })
    }

    handleBack = () => {
        const {
            bookingStep,
            fromLocation
        } = this.state;

        const {
            bookingReducer,
            navigation
        } = this.props;

        if (bookingReducer.done) {
            if (fromLocation) {
                navigation.navigate("Location");
            } else {
                navigation.navigate("Teacher");
            }
        }

        if (bookingStep === 1) {
            // if (fromLocation) {
            //     const resetAction = StackActions.reset({
            //         index: 0,
            //         actions: [
            //           NavigationActions.navigate({ routeName: 'Home' }),
            //         ],
            //       });
            //     this.props.navigation.dispatch(resetAction);
            //     this.props.navigation.navigate("Location");
            // } else {
            //     this.props.navigation.goBack();
            // }
            this.props.navigation.goBack();
        }

        this.setState({
            bookingStep: bookingStep - 1
        });
    }

    handleOpenTeacherMessage = () => {
        this.setState({
            showMessageModal: true
        });
    }

    handleCloseMessageModal = () => {
        this.setState({
            showMessageModal: false
        });
    }

    handleTeacherMessage = (message) => {
        this.setState({
            message,
            showMessageModal: false,
        });
    }

    handleCloseModal = () => {
        this.props.reset();
    }

    handleViewClasses = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
            //   NavigationActions.navigate({ routeName: this.state.fromLocation ? 'Location' : 'Home' }),
                NavigationActions.navigate({ routeName: 'Home' }),
            ],
          });
        this.props.navigation.dispatch(resetAction);
        this.props.navigation.navigate("YourClass");
    }

    handleBookClass = () => {
        const {
            selectedClass,
            message
        } = this.state;
        // const {
        //     navigation,
        //     bookClass
        // } = this.props;
        // const teacher = navigation.getParam("teacher", {});
        // const location = navigation.getParam("location", {});
        // console.log(schedule, teacher);
        // bookClass({
        //     topicID: topicId, 
        //     subjectID: subjectId,
        //     teacherID: schedule.teacherID || teacher._id, 
        //     stationID: schedule.stationID || location._id, 
        //     dateStarted: schedule.dateStarted,
        //     dateEnded: schedule.dateEnded,
        //     message
        // })
        this.props.bookClass({
            classID: selectedClass._id,
            message
        })
    }

    renderItem = ({item}) => {
        const {
            classType,
            dateStarted,
            dateEnded,
            locationName,
            locationAddress,
            topicName,
            subjectName,
            teacherName,
            status,
            studentIDs
        } = item;

        const isFull = item.status === 2;
        const isOwner = Array.isArray(studentIDs) && studentIDs.indexOf(this.props.userId) >= 0;

        return (
            <styled.ClassCardWrapper
                isBooked={isFull || isOwner}
                isOwner={isOwner}
            >
                <styled.ClassCard>
                    <styled.ClassInfo>
                        <styled.ClassTimePlace>{`${getHourFormat(dateStarted, dateEnded)}  |  ${classTypeText[classType]}`}</styled.ClassTimePlace>
                        <styled.ClassAddress>{`Teacher: ${teacherName}`}</styled.ClassAddress>
                        <styled.ClassAddress>{`${topicName} - ${subjectName}`}</styled.ClassAddress>
                        <styled.ClassAddress>{`Location: ${locationAddress}`}</styled.ClassAddress>
                    </styled.ClassInfo>
                    <styled.BookButton
                        onPress={() => this.handleBooking(item)}
                        // disabled={status === 0}
                        disabled={isOwner}
                        isBooked={isFull || isOwner}
                        isOwner={isOwner}
                    >
                        <styled.BookButtonText 
                            isBooked={isFull || isOwner}
                            isOwner={isOwner}
                        >
                            {/* {`${!status ? "BOOKED" : "BOOK"}`} */}
                            {`${(isFull || isOwner) && isOwner ? "BOOKED" : "BOOK"}`}
                        </styled.BookButtonText>
                    </styled.BookButton>
                </styled.ClassCard>
            </styled.ClassCardWrapper>
        )
    }

    renderSchedule = () => {
        const {
            scheduleReducer
        } = this.props;

        const {
            bookingStep
        } = this.state;

        if (scheduleReducer.isRequesting) {
            return (
                <styled.LoadingView>
                    <ActivityIndicator size="large" color="#6DCFF6"/>
                </styled.LoadingView>
            )
        } else if (!scheduleReducer.isRequesting && scheduleReducer.done && bookingStep === 1) {
            const {
                data: {
                    items: schedule
                }
            } = scheduleReducer;

            return (
                <styled.ClassCardView
                    data={schedule}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                />
            )
        }

        return null;
    }

    renderBookedInfo = () => {
        const {
            bookingStep,
            selectedClass : {
                classType,
                dateStarted,
                dateEnded,
                locationName,
                locationAddress,
                topicName,
                subjectName,
                teacherName
            },
            message
        } = this.state;

        // if (bookingStep === 2) {
        //     return (
        //         <styled.BookedClassOverview>
        //             <styled.BookedInfo>
        //                 <styled.ClassInfo>
        //                     <styled.ClassTimePlace>{`${getHourFormat(dateStarted, dateEnded)}  |  ${locationName}`}</styled.ClassTimePlace>
        //                     <styled.ClassAddress>{locationAddress}</styled.ClassAddress>
        //                 </styled.ClassInfo>
        //             </styled.BookedInfo>
        //         </styled.BookedClassOverview>
        //     )
        // } else 
        if (bookingStep === 2) {
            const {
                bookingReducer
            } = this.props;
            const isBookingSuccess = !bookingReducer.isRequesting && bookingReducer.done;
            let overview = [
                <styled.BookedClassOverview key="time">
                    <styled.BookedInfo hideShadow>
                        <styled.ClassInfo>
                            <styled.ClassTimePlace>{`${getHourFormat(dateStarted, dateEnded)}  |  ${classTypeText[classType]}`}</styled.ClassTimePlace>
                            <styled.ClassAddress>{`Teacher: ${teacherName}`}</styled.ClassAddress>
                        </styled.ClassInfo>
                    </styled.BookedInfo>
                </styled.BookedClassOverview>,
                <styled.BookedClassOverview key="station">
                <styled.BookedInfo hideShadow>
                    <styled.ClassInfo>
                        <styled.ClassTimePlace>{`Location: ${locationName}`}</styled.ClassTimePlace>
                        <styled.ClassAddress>{locationAddress}</styled.ClassAddress>
                    </styled.ClassInfo>
                </styled.BookedInfo>
            </styled.BookedClassOverview>,
                <styled.BookedClassOverview key="topic">
                    <styled.BookedInfo hideShadow>
                        <styled.ClassInfo>
                            <styled.ClassInfoText>{subjectName}</styled.ClassInfoText>
                            <styled.ClassSubInfoText>{topicName}</styled.ClassSubInfoText>
                        </styled.ClassInfo>
                    </styled.BookedInfo>
                </styled.BookedClassOverview>,
                <styled.BookedClassOverview key="message">
                    <styled.BookedInfo hideShadow>
                        <styled.ClassInfo>
                            <styled.ClassInfoText>Message to teacher</styled.ClassInfoText>
                        </styled.ClassInfo>
                        {
                            !isBookingSuccess &&
                            <styled.AddMessageButton
                                onPress={this.handleOpenTeacherMessage}
                            >
                                <styled.AddMessageButtonText>{`${!!message ? 'Edit' : 'Add'}`}</styled.AddMessageButtonText>
                            </styled.AddMessageButton>
                        }
                    </styled.BookedInfo>
                    {
                        !!message && 
                        <styled.TeacherMessageView>
                            <styled.TeacherMessageText
                                numberOfLines={9}
                                ellipsizeMode='tail'
                            >{message}</styled.TeacherMessageText>
                        </styled.TeacherMessageView>
                    }
                </styled.BookedClassOverview>
            ];
            

            if (isBookingSuccess) {
                overview.push((<styled.BookedClassOverview key="booking_status">
                    <styled.BookedInfo>
                        <styled.ClassInfo isBookingSuccess>
                            <styled.ClassInfoText isBookingSuccess>Waiting for teacher to accept</styled.ClassInfoText>
                        </styled.ClassInfo>
                    </styled.BookedInfo>
                </styled.BookedClassOverview>))
            }

            return overview;
        }

        return null;
    }

    renderTopic = () => {
        const {
            bookingStep,
            schedule,
            topicId,
            subjectId
        } = this.state;
        const teacher = this.props.navigation.getParam("teacher", {});

        if (bookingStep === 2) {
            return <TopicSelectionContainer
                onSelect={this.handleSelectTopic}
                onNext={this.handleTopicNext}
                topicId={topicId}
                subjectId={subjectId}
                teacherId={teacher._id || schedule.teacherID}
                weekday={moment(schedule.dateStarted).day() + 1}
            />
        }

        return null;
    }

    renderMessage = (shouldRender) => {
        if (!shouldRender) {
            return null;
        }

        const {
            bookingReducer
        } = this.props;

        if (bookingReducer.isRequesting) {
            return (
                <LoadingModal
                    isVisible={bookingReducer.isRequesting}
                    message="Booking your class..."
                />
            )
        }

        if (bookingReducer.hasError) {
            return (
                <MessageModal
                    isVisible={bookingReducer.hasError}
                    closeModal={this.handleCloseModal}
                    message={bookingReducer.data}
                />
            )
        }
    }

    render(){
        const {
            bookingStep,
            showMessageModal,
            message
        } = this.state;

        const {
            navigation,
            bookingReducer
        } = this.props;

        const teacher = navigation.getParam("teacher", {});
        const location = navigation.getParam("location", {});
        const isBookingSuccess = !bookingReducer.isRequesting && bookingReducer.done;

        return (
            <styled.MainViewer>
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                />
                <TeacherMessageModal
                    message={message}
                    isVisible={showMessageModal}
                    closeModal={this.handleCloseMessageModal}
                    onNext={this.handleTeacherMessage}
                />
                {this.renderMessage(navigation.isFocused())}
                <styled.CoverViewer shouldMinimize={bookingStep === 2}>
                    <styled.CoverImage source={{uri: teacher.avatar || location.avatar}} resizeMode="cover"/>
                    <styled.CoverGradient
                        colors={['#C4C4C4', '#000']}
                    />
                    <styled.HeaderView>
                        <styled.BackButton
                            onPress={this.handleBack}
                        >
                            <styled.BackButtonIcon source={BACK_ARROW}/>
                        </styled.BackButton>
                        <styled.TeacherInfoView>
                            <styled.TeacherName>
                                {teacher.name || location.name}
                            </styled.TeacherName>
                            {
                                teacher._id &&
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={teacher.rating}
                                    starSize={15}
                                    containerStyle={styled.TeacherRating}
                                    fullStarColor='#FEAF34'
                                    emptyStarColor='#FEAF34'
                                    halfStarEnabled={true}
                                />
                            }
                        </styled.TeacherInfoView>
                    </styled.HeaderView>
                </styled.CoverViewer>
                <styled.ContentViewer>
                    <HorizontalCalender
                        shouldCenterActiveDate={false}
                        showMonthYear={false}
                        showDaysBeforeCurrent={0}
                        showDaysAfterCurrent={14}
                        defaultSelectedDate={0}
                        disabled={bookingStep > 1}
                        onSelectDate={this.handleSelectDate}
                    />
                    {this.renderBookedInfo()}
                    {this.renderSchedule()}
                    {/* {this.renderTopic()} */}
                    {
                        bookingStep === 2 &&
                        <styled.ConfirmButtonWrapper>
                            <styled.ConfirmButton
                                onPress={isBookingSuccess ? this.handleViewClasses : this.handleBookClass}
                            >
                                <styled.ConfirmButtonText>{`${isBookingSuccess ? 'View your classes' : 'Confirm'}`}</styled.ConfirmButtonText>
                            </styled.ConfirmButton>
                        </styled.ConfirmButtonWrapper>
                    }
                </styled.ContentViewer>
            </styled.MainViewer>
        )
    }
}

export default TeacherSchedule;