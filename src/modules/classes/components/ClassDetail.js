import React, { Component } from 'react';
import { StatusBar, Alert, ActivityIndicator, View, Text } from 'react-native';
import StarRating from 'react-native-star-rating';
import * as styled from '../styles/ClassDetailStyles';
import HorizontalCalender from '../../common/calender/HorizontalCalender';
import { getHourFormat, getDateFromString } from '../../../utils/helper';
import LoadingModal from '../../common/LoadingModal';

const BACK_ARROW = require('../../../../assets/icons/back-arrow.png');
const DONE = require("../../../../assets/icons/checkin-done.png")

class ClassDetail extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        
        const bookingID = props.navigation.getParam('bookingID', '');
        const classID = props.navigation.getParam('classID');
        console.log('class detail xem gia tri notification', classID)
        if(bookingID)
        {
            this.state = {
                modalVisible: false,
                message: '',
                isBookingSuccess: false,
                isClassDetailBooking: true,
            }
            props.fetchBookingDetail(bookingID);
            
        }
        else{
            this.state = {
                modalVisible: false,
                message: '',
                isBookingSuccess: false,
                isClassDetailBooking: false,
            }
            props.fetchDetailClass(classID);
            
        }
        
    }

    keyExtractor = (item, index) => `schedule-${index}`;

    handleBack = () => {
        this.props.navigation.goBack();
    }

    handleScanQRCode = () => {
        const {
            navigation
        } = this.props;
        const bookingID = navigation.getParam("bookingID", "");

        navigation.navigate("Scanner", {
            bookingID
        });
    }

    handleCloseModal = () => {
        this.props.resetBooking();
    }

    handleReviewPress = () => {
        this.setState({ modalVisible: true });
    }

    handleCloseReviewModal = () => {
        this.setState({ modalVisible: false })
    }

    handleReview = (message, rating) => {
        const bookingID = this.props.navigation.getParam("bookingID", "");
        this.setState({ modalVisible: false, message, rating });
        this.props.reviewClass({
            classID: bookingID,
            feedback: message,
            rating
        })
    }

    renderScanQR = (shouldRender = false) => {
        const {
            bookingReducer
        } = this.props;

        if (!shouldRender) {
            return null;
        }

        if (bookingReducer.done) {
            return (
                <styled.ConfirmButtonWrapper>
                    <styled.EnjoyClassIcon source={DONE} />
                    <styled.EnjoyClassText>Enjoy your class</styled.EnjoyClassText>
                </styled.ConfirmButtonWrapper>
            )
        } else {
            return (
                <styled.ConfirmButtonWrapper>
                    <styled.ConfirmButton
                        onPress={this.handleScanQRCode}
                    >
                        <styled.ConfirmButtonText>{`Scan the QR Code`}</styled.ConfirmButtonText>
                    </styled.ConfirmButton>
                </styled.ConfirmButtonWrapper>
            )
        }
    }

    renderReviewAction = (shouldRender = false) => {
        if (shouldRender) {
            return (
                <styled.ActionButtonWrapper>
                    <styled.AcceptButton
                        onPress={this.handleReviewPress}
                    >
                        <styled.AcceptButtonText>Review</styled.AcceptButtonText>
                    </styled.AcceptButton>
                </styled.ActionButtonWrapper>
            )
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
                    message="Sending"
                />
            )
        }

        if (bookingReducer.done) {
            setTimeout(() => {
                Alert.alert('', 'Successful', [{
                    text: 'OK',
                    onPress: this.handleCloseModal
                }]);
            }, 1000);
        }

        if (bookingReducer.hasError) {
            setTimeout(() => {
                Alert.alert('', bookingReducer.message || bookingReducer.data, [{
                    text: 'OK',
                    onPress: this.handleCloseModal
                }]);
            }, 1000);
        }

        // if (bookingReducer.hasError) {
        //     return (
        //         <MessageModal
        //             isVisible={bookingReducer.hasError}
        //             closeModal={this.handleCloseModal}
        //             message={bookingReducer.data}
        //         />
        //     )
        // }
    }

    renderClassDetailBooking() {
        const {
            navigation,
            classReducer
        } = this.props;


        if (classReducer.isRequesting) {
            return (
                <styled.LoadingView>
                    <ActivityIndicator size="large" color="#6DCFF6" />
                </styled.LoadingView>
            )
        }

        const isCheckIn = navigation.getParam("isCheckIn", false);
        const isReview = navigation.getParam("isReview", false);

        const {
            _id,
            message,
            classID,
            class: classData,
            topic
        } = classReducer.data;
        console.log('Screen detail booking bookingID ', _id);

        if (classData) {
            const {
                dateStarted,
                dateEnded,
                locationName,
                locationAddress,
                teacherImage,
                // message: studentMessage,
                teacherName,
                topicName,
                subjectName,
                // feedback,
                // rating
            } = classData[0];
            return (
                <styled.MainViewer>
                    <StatusBar
                        backgroundColor="transparent"
                        translucent={true}
                    />
                    {/* {this.renderMessage(navigation.isFocused())} */}
                    <styled.CoverViewer>
                        <styled.CoverImage source={{ uri: topic.imageUrl }} resizeMode="cover" />
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
                                <styled.TeacherName>
                                    {topicName}
                                </styled.TeacherName>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={topic.rating}
                                    starSize={15}
                                    containerStyle={styled.TeacherRating}
                                    fullStarColor='#FEAF34'
                                    emptyStarColor='#FEAF34'
                                    halfStarEnabled={true}
                                />
                            </styled.TeacherInfoView>
                        </styled.HeaderView>
                    </styled.CoverViewer>
                    <HorizontalCalender
                        shouldCenterActiveDate={false}
                        showMonthYear={false}
                        showDaysBeforeCurrent={3}
                        showDaysAfterCurrent={11}
                        defaultSelectedDate={3}
                        disabled={true}
                        shouldHideAll={true}
                        currentDate={dateStarted}
                        onSelectDate={this.handleSelectDate}
                    />
                    <styled.ContentViewer>
                        <styled.BookedClassOverview>
                            <styled.BookedInfo hideShadow>
                                <styled.ClassInfo>
                                    <styled.ClassTimePlace>{`${getHourFormat(dateStarted, dateEnded)}  |  ${locationName}`}</styled.ClassTimePlace>
                                    <styled.ClassAddress>{locationAddress}</styled.ClassAddress>
                                </styled.ClassInfo>
                                <styled.MapText>Map</styled.MapText>
                            </styled.BookedInfo>
                        </styled.BookedClassOverview>

                        <styled.BookedClassOverview>
                            <styled.BookedInfo hideShadow>
                                <styled.ClassInfo>
                                    <styled.ClassInfoText>Coach</styled.ClassInfoText>
                                    <styled.ClassSubInfoText>{teacherName}</styled.ClassSubInfoText>
                                </styled.ClassInfo>
                            </styled.BookedInfo>
                        </styled.BookedClassOverview>

                        <styled.BookedClassOverview>
                            <styled.BookedInfo hideShadow>
                                <styled.ClassInfo>
                                    <styled.ClassInfoText>Class Descriptions</styled.ClassInfoText>
                                    <styled.ClassSubInfoText></styled.ClassSubInfoText>
                                </styled.ClassInfo>
                            </styled.BookedInfo>
                        </styled.BookedClassOverview>

                        <styled.BookedClassOverview>
                            <styled.BookedInfo hideShadow>
                                <styled.ClassInfo>
                                    <styled.ClassInfoText>Lesson</styled.ClassInfoText>
                                    <styled.ClassSubInfoText>{subjectName}</styled.ClassSubInfoText>
                                </styled.ClassInfo>
                            </styled.BookedInfo>
                        </styled.BookedClassOverview>
                        <styled.BookedClassOverview key="message">
                            <styled.BookedInfo hideShadow>
                                <styled.ClassInfo>
                                    <styled.ClassInfoText>Message to teacher</styled.ClassInfoText>
                                </styled.ClassInfo>

                                <styled.AddMessageButton
                                    onPress={this.handleOpenTeacherMessage}
                                >
                                    {/* <styled.AddMessageButtonText>{`${!!message ? '' : 'Add'}`}</styled.AddMessageButtonText> */}
                                </styled.AddMessageButton>

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
                        {this.renderScanQR(isCheckIn)}
                    </styled.ContentViewer>
                </styled.MainViewer>
            )
        }

        return null;
    }
    renderClassDetailNotification() {
        const {
            navigation,
            classNotificationReducer
        } = this.props;


        if (classNotificationReducer.isRequesting) {
            return (
                <styled.LoadingView>
                    <ActivityIndicator size="large" color="#6DCFF6" />
                </styled.LoadingView>
            )
        }

        console.log('class detail gia tri classNotificationReducer',classNotificationReducer);
        const {
            _id,
            message,
            rating,
            dateStarted,
            dateEnded,
            locationName,
            locationAddress,
            teacherImage,
            teacherName,
            subjectName,
        } = classNotificationReducer.data;
        console.log('Screen detail class id ', _id);
            return (
                <styled.MainViewer>
                    <StatusBar
                        backgroundColor="transparent"
                        translucent={true}
                    />
                    {/* {this.renderMessage(navigation.isFocused())} */}
                    <styled.CoverViewer>
                        <styled.CoverImage source={{ uri: teacherImage }} resizeMode="cover" />
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
                                <styled.TeacherName>
                                    {teacherName}
                                </styled.TeacherName>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={rating}
                                    starSize={15}
                                    containerStyle={styled.TeacherRating}
                                    fullStarColor='#FEAF34'
                                    emptyStarColor='#FEAF34'
                                    halfStarEnabled={true}
                                />
                            </styled.TeacherInfoView>
                        </styled.HeaderView>
                    </styled.CoverViewer>
                    <HorizontalCalender
                        shouldCenterActiveDate={false}
                        showMonthYear={false}
                        showDaysBeforeCurrent={3}
                        showDaysAfterCurrent={11}
                        defaultSelectedDate={3}
                        disabled={true}
                        shouldHideAll={true}
                        currentDate={dateStarted}
                        onSelectDate={this.handleSelectDate}
                    />
                    <styled.ContentViewer>
                        <styled.BookedClassOverview>
                            <styled.BookedInfo hideShadow>
                                <styled.ClassInfo>
                                    <styled.ClassTimePlace>{`${getHourFormat(dateStarted, dateEnded)}  |  ${locationName}`}</styled.ClassTimePlace>
                                    <styled.ClassAddress>{locationAddress}</styled.ClassAddress>
                                </styled.ClassInfo>
                                <styled.MapText>Map</styled.MapText>
                            </styled.BookedInfo>
                        </styled.BookedClassOverview>

                        <styled.BookedClassOverview>
                            <styled.BookedInfo hideShadow>
                                <styled.ClassInfo>
                                    <styled.ClassInfoText>Coach</styled.ClassInfoText>
                                    <styled.ClassSubInfoText>{teacherName}</styled.ClassSubInfoText>
                                </styled.ClassInfo>
                            </styled.BookedInfo>
                        </styled.BookedClassOverview>

                        <styled.BookedClassOverview>
                            <styled.BookedInfo hideShadow>
                                <styled.ClassInfo>
                                    <styled.ClassInfoText>Class Descriptions</styled.ClassInfoText>
                                    <styled.ClassSubInfoText></styled.ClassSubInfoText>
                                </styled.ClassInfo>
                            </styled.BookedInfo>
                        </styled.BookedClassOverview>

                        <styled.BookedClassOverview>
                            <styled.BookedInfo hideShadow>
                                <styled.ClassInfo>
                                    <styled.ClassInfoText>Lesson</styled.ClassInfoText>
                                    <styled.ClassSubInfoText>{subjectName}</styled.ClassSubInfoText>
                                </styled.ClassInfo>
                            </styled.BookedInfo>
                        </styled.BookedClassOverview>
                        <styled.BookedClassOverview key="message">
                            <styled.BookedInfo hideShadow>
                                <styled.ClassInfo>
                                    <styled.ClassInfoText>Message to teacher</styled.ClassInfoText>
                                </styled.ClassInfo>

                                <styled.AddMessageButton
                                    onPress={this.handleOpenTeacherMessage}
                                >
                                    {/* <styled.AddMessageButtonText>{`${!!message ? '' : 'Add'}`}</styled.AddMessageButtonText> */}
                                </styled.AddMessageButton>

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
                    </styled.ContentViewer>
                </styled.MainViewer>
            )

        return null;
    }
    render() {

        return (
            <styled.MainViewer>
                {this.state.isClassDetailBooking ? this.renderClassDetailBooking() : this.renderClassDetailNotification()}
            </styled.MainViewer>
        )
    }
}

export default ClassDetail;
