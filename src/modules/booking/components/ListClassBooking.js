import React, { Component } from 'react';
import { StatusBar, NativeModules, LayoutAnimation, ActivityIndicator, Image, View, Alert } from 'react-native';
import StarRating from 'react-native-star-rating';
import { StackActions, NavigationActions } from 'react-navigation';
import * as styled from '../styles/ListClassBookingStyle';
import HorizontalCalender from '../../common/calender/HorizontalCalender';
import moment from 'moment';
import TopicSelectionContainer from '../containers/TopicSelectionContainer';
import TeacherMessageModal from './TeacherMessageModal';
import BookingDialogModal from './BookingDialogModal';
import LoadingModal from '../../common/LoadingModal';
import MessageModal from '../../common/MessageModal';
import { unit, teacher, moreInfoClassData } from '../../../FakeData';
const SEARCH_ICON = require('../../../../assets/icons/ic_search.png');
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

const debounce = (callback, wait) => {
    let timeout = null
    return (...args) => {
        const next = () => callback(...args)
        clearTimeout(timeout)
        timeout = setTimeout(next, wait)
    }
}


class TeacherSchedule extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);

        const topic = props.navigation.getParam('topic', {})
        const getClassType = props.navigation.getParam('classType')
        console.log('ListClass gia tri cua classType', getClassType)
        const initialDate = moment()
        const filters = {
            start: initialDate.valueOf(),
            end: initialDate.endOf("day").valueOf()
        }

        this.state = {
            showMessageModal: false,
            showDialogModal: false,
            bookingStep: 1,
            selectedClass: {},
            topicId: '',
            topicName: '',

            message: '',
            textInputSearch: '',

            isSendSuccess: false,
            classType: getClassType,

            startDate: initialDate.valueOf(),
            endDate: initialDate.endOf("day").valueOf()
        }


        if (topic._id) {
            filters.topicID = topic._id
            filters.classType = getClassType

            this.state.fromTeacher = false;
            this.state.fromLocation = false;
            this.state.fromTopic = true;

            //this.state.fromClassDe=topic.
            // props.requestSchedule();
            // props.fetchStationSchedule(1, 20, filters);
            props.fetchClass(1, 20, filters);
        }
        else {
            Alert.alert('Loi topic id bi sai')
        }

    }

    keyExtractor = (item, index) => `schedule-${index}`;

    handleSearchQuery = debounce((value) => {
        var filters = {}
        filters.start = this.state.startDate;
        filters.end = this.state.endDate;
        const topic = this.props.navigation.getParam("topic", {});
        filters.topicID = topic._id;
        filters.teacherName = value;
        filters.classType = this.state.classType;
        console.log('xem gia tri la gi nao', filters);
        this.props.fetchClass(1, 20, filters);
    }, 1000)

    handleSearch = () => {
        var filters = {}
        filters.start = this.state.startDate;
        filters.end = this.state.endDate;
        const topic = this.props.navigation.getParam("topic", {});
        filters.topicID = topic._id;
        filters.teacherName = this.state.textInputSearch;
        filters.classType = this.state.classType;
        console.log('xem gia tri la gi nao', filters);
        this.props.fetchClass(1, 20, filters);
    }
    handleChangeText = (value) => {
        this.setState({
            textInputSearch: value
        })
    }



    handleSelectDate = (date, index) => {
        const topic = this.props.navigation.getParam("topic", {});
        const filters = {
            start: index ? date.startOf("day").valueOf() : moment().valueOf(),
            end: date.endOf("day").valueOf(),
        }
        this.setState({
            startDate: filters.start,
            endDate: filters.end
        })

        if (topic._id) {
            filters.topicID = topic._id;
            // filters.status = 2;
            // this.props.requestSchedule();
            // this.props.fetchStationSchedule(1, 20, filters);
            filters.classType = this.state.classType
            console.log('ListClass xem gia tri la gi nao', filters);
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
    handleNavigateMoreInfo = (classID) => {
        console.log('helllo', classID);
        const {
            navigation
        } = this.props
        navigation.navigate('MoreInfoClass', { classID });

    }

    handleBack = () => {
        this.props.navigation.goBack();


    }


    handleOpenDialogModal = () => {
        this.setState({
            showDialogModal: true,
            isSendSuccess: false
        });

    }

    handleCloseDialogModal = () => {
        this.setState({
            showDialogModal: false
        });
    }

    handleViewYourClass = () => {
        this.setState({
            showDialogModal: false
        });
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        sleep(500).then(() => {
            this.props.navigation.goBack();
            this.props.navigation.navigate('ViewUserClasses');
        })
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
                NavigationActions.navigate({ routeName: 'ChooseClass' }),
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
        this.props.bookClass({
            classID: selectedClass._id,
            message
        })
        //boolean de show dialog booking
        this.setState({
            isSendSuccess: true,
        })

    }

    renderItem = ({ item }) => {
        const {
            _id,
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
        console.log('Book class id', topicName);
        var statusClass = '';
        var allowClick = false;
        var textButton = 'BOOK'
        const isFull = item.status === 2;
        const isOwner = Array.isArray(studentIDs) && studentIDs.indexOf(this.props.userId) >= 0;
        if(isFull){
            statusClass = 'full'
            allowClick = true
            textButton = 'FULLY BOOKED'
        }
        else if (isOwner){
            statusClass = 'booked'
            allowClick = true
            textButton = 'BOOKED'
        } else statusClass = 'book'


        return (
            <styled.ClassCardWrapper
            >
                <styled.ClassCard>
                    <styled.ClassInfo>
                        <styled.ClassTimePlace
                            numberOfLines={2}
                            ellipSizeMode='tail'
                        >{`${getHourFormat(dateStarted, dateEnded)} |  ${locationName}`}
                        </styled.ClassTimePlace>
                        <styled.ClassAddress
                            numberOfLines={2}
                            ellipSizeMode='tail'
                        >{`${locationAddress}`}
                        </styled.ClassAddress>
                        <styled.ClassAddress
                            numberOfLines={1}
                            ellipSizeMode='tail'
                        >{`Coach: ${teacherName}`}
                        </styled.ClassAddress>
                        {/* <styled.ClassLesson
                            numberOfLines={2}
                            ellipSizeMode='tail'
                        >
                            <styled.ClassAddress>Lesson: </styled.ClassAddress>
                            <styled.ClassLink
                            >{`${subjectName}`}
                            </styled.ClassLink>
                        </styled.ClassLesson> */}
                        <styled.ClassLesson>
                            <styled.ClassLesson>Lesson: </styled.ClassLesson>
                            <styled.ClassLink onPress={() => this.handleNavigateMoreInfo(_id)}>{`${subjectName}`}</styled.ClassLink>
                        </styled.ClassLesson>
                    </styled.ClassInfo>
                    <styled.BookButton
                        onPress={() => this.handleBooking(item)}
                        // disabled={status === 0}
                        disabled={allowClick}
                        statusClass = {statusClass}
                    >
                        <styled.BookButtonText
                            statusClass = {statusClass}
                        >
                            {/* {`${!status ? "BOOKED" : "BOOK"}`} */}
                            {textButton}
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
                    <ActivityIndicator size="large" color="#6DCFF6" />
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
            selectedClass: {
                _id,
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
        console.log('Class detail id class 121212', _id);

        if (bookingStep === 2) {
            const {
                bookingReducer
            } = this.props;

            let overview = [
                <styled.BookedClassOverview key="time">
                    <styled.BookedInfo hideShadow>
                        <styled.ClassInfo>
                            <styled.ClassTimePlace>{`${getHourFormat(dateStarted, dateEnded)}  |  ${locationName}`}</styled.ClassTimePlace>
                            <styled.ClassAddress>{locationAddress}</styled.ClassAddress>
                        </styled.ClassInfo>
                        <styled.MapText>Map</styled.MapText>
                    </styled.BookedInfo>
                </styled.BookedClassOverview>,
                <styled.BookedClassOverview>
                    <styled.BookedInfo hideShadow>
                        <styled.ClassInfo>
                            <styled.ClassTimePlace>Coach</styled.ClassTimePlace>
                            <styled.ClassAddress>{teacherName}</styled.ClassAddress>
                        </styled.ClassInfo>
                    </styled.BookedInfo>
                </styled.BookedClassOverview>,

                <styled.BookedClassOverview>
                    <styled.BookedInfo hideShadow>
                        <styled.ClassInfo>
                            <styled.ClassTimePlace>Class Descriptions</styled.ClassTimePlace>
                            <styled.ClassAddress></styled.ClassAddress>
                        </styled.ClassInfo>
                    </styled.BookedInfo>
                </styled.BookedClassOverview>,

                <styled.BookedClassOverview>
                    <styled.BookedInfo hideShadow>
                        <styled.ClassInfo>
                            <styled.ClassInfoText>Lesson</styled.ClassInfoText>
                            <styled.ClassSubInfoText>{subjectName}</styled.ClassSubInfoText>
                        </styled.ClassInfo>
                    </styled.BookedInfo>
                </styled.BookedClassOverview>,
                <styled.BookedClassOverview key="message">
                    <styled.BookedInfo hideShadow>
                        <styled.ClassInfo>
                            <styled.ClassInfoText>Message to teacher</styled.ClassInfoText>
                        </styled.ClassInfo>
                        {
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
        if (bookingReducer.done && this.state.isSendSuccess) {
            this.handleOpenDialogModal()

        }
        if (bookingReducer.hasError) {
            console.log('bookingReducer.hasError');
            return (
                <MessageModal
                    isVisible={bookingReducer.hasError}
                    closeModal={this.handleCloseModal}
                    message={bookingReducer.data}
                />
            )
        }

    }

    render() {

        const {
            bookingStep,
            showMessageModal,
            showDialogModal,
            message
        } = this.state;

        const {
            navigation,
            bookingReducer
        } = this.props;

        const teacher = navigation.getParam("teacher", {});
        const location = navigation.getParam("location", {});
        const topic = navigation.getParam("topic", {});


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
                <BookingDialogModal
                    navigation={this.props.navigation}
                    isVisible={showDialogModal}
                    onNext={this.handleViewYourClass}
                    closeModal={this.handleCloseDialogModal}

                />
                {this.renderMessage(navigation.isFocused())}
                <styled.CoverViewer>
                    <styled.CoverImage source={topic.imageUrl !== '' ? { uri: topic.imageUrl } : {}} />
                    <styled.CoverGradient
                        colors={['#C4C4C4', '#000']}
                    />
                    <styled.HeaderView>
                        <styled.BackButton
                            onPress={this.handleBack}
                        >
                            <styled.BackButtonIcon source={BACK_ARROW} />
                        </styled.BackButton>
                        <styled.TeacherInfoView>
                            <styled.TeacherName
                                numberOfLines={1}
                                ellipSizeMode='tail'
                            >
                                {topic.name}
                            </styled.TeacherName>
                            {
                                topic._id &&
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    rating={topic.rating}
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

                <HorizontalCalender
                    shouldCenterActiveDate={false}
                    showMonthYear={false}
                    showDaysBeforeCurrent={0}
                    showDaysAfterCurrent={14}
                    defaultSelectedDate={0}
                    disabled={bookingStep > 1}
                    onSelectDate={this.handleSelectDate}
                />
                {
                    bookingStep === 1 &&
                    <styled.searchContainerView>
                        <Image style={{ marginLeft: 16 }} source={SEARCH_ICON} />
                        <styled.inputSearchTextInput
                            placeholder="Search the teacher"
                            onChangeText={this.handleChangeText}
                            returnKeyType='search'
                            onSubmitEditing={this.handleSearch}
                        />
                    </styled.searchContainerView>
                }
                <styled.ContentViewer>
                    {this.renderBookedInfo()}
                    {this.renderSchedule()}
                    {/* {this.renderTopic()} */}

                    {
                        bookingStep === 2 &&
                        <styled.ConfirmButtonWrapper>
                            <styled.ConfirmButton
                                onPress={this.handleBookClass}
                            >
                                <styled.ConfirmButtonText>Confirm</styled.ConfirmButtonText>
                            </styled.ConfirmButton>
                        </styled.ConfirmButtonWrapper>
                    }

                </styled.ContentViewer>
            </styled.MainViewer>
        )
    }
}

export default TeacherSchedule;