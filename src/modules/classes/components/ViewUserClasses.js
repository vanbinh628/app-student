import React, { Component } from 'react';
import { StatusBar, ActivityIndicator, RefreshControl, Text } from 'react-native';
import moment from 'moment';
import { NavigationEvents } from 'react-navigation';
import * as styled from '../styles/ViewUserClassesStyles';
import { getHourFormat, getDateFromString } from '../../../utils/helper';
import LoadingModal from '../../common/LoadingModal';
import MessageModal from '../../common/MessageModal';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';
const DELETE_ICON = require("../../../../assets/icons/delete.png")

class ViewUserClasses extends Component {
    constructor(props) {
        super(props);
        console.log('View your class  constructor');
        
        this.state = {
            selectedKey: '',
            isRefreshing: false,

            isResetDataYourClass: false,
            isResetDataPrivateClass: false,
            isResetDataGroupClass: false,
            isResetDataWorkshop: false,

            isCanceling: false,
        }
       
    }
    

    // componentDidUpdate() {
    //     var routeName = this.props.navigation.state.routeName;
    //     if (routeName === 'PrivateClass') {
    //         console.log('ABC PrivateClass componentDidUpdate')
    //     } else if (routeName === 'GroupClass') {
    //         console.log('ABC GroupClass componentDidUpdate')
    //     } else {
    //         console.log('ABC AllClass componentDidUpdate')
    //     }


    //     const {
    //         bookingReducer,
    //         fetchUserClasses,
    //         resetBooking,
    //         navigation
    //     } = this.props;

    //     if (navigation.isFocused() && bookingReducer.done) {
    //         resetBooking();
    //         this.props.fetchUserClasses(1, 10, {});
    //     }
    // }



    keyExtractor = (item, index) => `userClasses-${index}`;

    handleClassLongPress = (selectedKey) => {
        if (selectedKey === this.state.selectedKey) {
            this.setState({
                selectedKey: ""
            })
        } else {
            this.setState({
                selectedKey
            })
        }
    }

    handleClassPress = (bookingItem, itemKey, type = '') => {
        console.log('view your class id 121212', bookingItem.classID);
        if (itemKey === this.state.selectedKey) {
            this.setState({
                selectedKey: ""
            })
        } else if (type === "completed") {
            this.props.navigation.navigate("ClassDetail", {
                bookingID: bookingItem._id,
                isReview: true
            })
        } else {
            this.props.navigation.navigate("ClassDetail", {
                bookingID: bookingItem._id
            })
        }
    }

    handleReviewClass = (bookingItem) => {
        console.log('navigation to screen class review')
        this.props.navigation.navigate("ClassReview", {
            bookingID: bookingItem._id,
            classID: bookingItem.classID,
            studentID: bookingItem.studentID,
        })
    }
    handleCheckIn = (bookingItem) => {
        this.props.navigation.navigate("ClassDetail", {
            bookingID: bookingItem._id,
            isCheckIn: true
        })
    }
    handleRating = (bookingItem) => {
        this.props.navigation.navigate("ClassDetail", {
            bookingID: bookingItem._id,
            isCheckIn: true
        })
    }


    handleCloseModal = () => {
        this.props.resetBooking();
    }

    handleCancelClass = (bookingID) => {
        console.log('cancel booking bookingID', bookingID);
        const {
            navigation,
            fetchUserClasses,
        } = this.props
        const routeName = navigation.state.routeName;
        this.setState({
            isCanceling: true
        })
        this.props.cancelClass(bookingID);

        // if (routeName === 'PrivateClass') {
        //     fetchUserClasses(1, 10, {type: "1"});
        // } else if (routeName === 'GroupClass') {
        //     fetchUserClasses(1, 10, { type: "2" });
        // } else {
        //     fetchUserClasses(1, 10, {});
        // }
    }

    handleRefresh = () => {
        const {
            navigation,
            fetchUserClasses,
        } = this.props
        const routeName = navigation.state.routeName;
        if (routeName === 'PrivateClass') {
            fetchUserClasses(1, 10, {type: "1"});
        } else if (routeName === 'GroupClass') {
            fetchUserClasses(1, 10, { type: "2" });
        } else {
            fetchUserClasses(1, 10, {});
        }
    }


    renderCore = (item, type, numberTypeClass, index = 0) => {
        const {
            _id,
            class: classData
        } = item

        const {
            dateStarted,
            dateEnded,
            teacherName,
            locationName,
            subjectName,
            teacherImage,
            rating
        } = classData[0];

        //test
        //kiem tra item nằm ngoài 24 h
        const itemKey = `${type}-${index}`;
        const isSelected = itemKey === this.state.selectedKey;
        var isAllowCancel = false;
        const diff = moment(dateStarted).diff(moment(), 'hour');
        if (diff >= 24) {
            isAllowCancel = true;
        }



        //xu ly input typeClass
        var typeClass = 'completed';
        if (type !== 'completed') {
            if (numberTypeClass === 1) {
                typeClass = 'private';
            } else if (numberTypeClass === 2) {
                typeClass = 'group';
            } else if (numberTypeClass === 3) {
                typeClass = 'workshop';
            }else {
                typeClass = 'completed';
            }
        }
        else {
            typeClass = 'completed';
        }
        //xu ly input type
        var typeButton = type;
        if (item.status == 4 || item.status == 5)
            typeButton = 'canceled';


        return (
            <styled.ClassCardBoundary
                key={itemKey}
            >
                <styled.ClassCardWrapper
                    type={type}
                    typeClass={typeClass}
                    isSelected={isSelected}
                    onLongPress={() => (isAllowCancel && type != "completed" && type != "active" && typeButton != 'canceled')
                        ? this.handleClassLongPress(itemKey) : false}
                    onPress={() => this.handleClassPress(item, itemKey, type)}
                >
                    <styled.ClassCard>
                        <styled.TeacherAvatarWrapper>
                            <styled.TeacherAvatar source={{ uri: teacherImage }}
                                resizeMode="cover" />
                        </styled.TeacherAvatarWrapper>
                        <styled.ClassInfo>
                            <styled.ClassInfoText>{`${getHourFormat(dateStarted, dateEnded)} | ${getDateFromString(dateStarted)}`}</styled.ClassInfoText>
                            <styled.ClassInfoText>{locationName}</styled.ClassInfoText>
                            <styled.ClassSubInfo>{`Coach: ${teacherName}`}</styled.ClassSubInfo>
                            <styled.ClassSubInfoLesson>{`Lesson: ${subjectName}`}</styled.ClassSubInfoLesson>
                        </styled.ClassInfo>
                        {
                            item.status == 2 && type == 'active' 
                            &&
                            <styled.ClassButton
                                onPress={() => this.handleCheckIn(item)}
                                type={typeButton}
                            >
                                <styled.ClassButtonText>Check in</styled.ClassButtonText>
                            </styled.ClassButton>

                        }
                        {/* item.status == 3 && (rating == null || rating == 0)   && */}
                        {/* type == 'completed' && (rating == null || rating == 0) //test && */}
                        {
                            item.status == 3 && (rating == null || rating == 0)   &&
                            <styled.ClassButton
                                onPress={() => this.handleReviewClass(item)}
                                type={typeButton}
                            >
                                <styled.ClassButtonText>Rate</styled.ClassButtonText>
                            </styled.ClassButton>

                        }
                        {
                            type == "completed" && rating > 0 &&
                            <styled.ClassRating>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    starSize={15}
                                    rating={rating}

                                    fullStarColor='#FEAF34'
                                    emptyStarColor='#FEAF34'
                                    halfStarEnabled={true}
                                    disabled={false} />
                            </styled.ClassRating>

                        }
                        {
                            (item.status == 4 || item.status == 5) &&
                            <styled.ClassButton
                                type={typeButton}
                            >
                                <styled.ClassButtonText>Canceled</styled.ClassButtonText>
                            </styled.ClassButton>

                        }

                    </styled.ClassCard>

                </styled.ClassCardWrapper>
                {
                    isSelected && type != "completed" &&
                    <styled.CancelButton
                        onPress={() => this.handleCancelClass(_id)}
                    >
                        <styled.CancelButtonIcon source={DELETE_ICON} />
                        <styled.CancelButtonText>CANCEL</styled.CancelButtonText>
                    </styled.CancelButton>
                }
            </styled.ClassCardBoundary>

        )
    }

    renderPending = (pending) => {
        if (!pending.length) {
            return null;
        }

        return (
            <styled.ClassCardContainer>
                <styled.ClassCardHeader>Waiting for accept</styled.ClassCardHeader>
                {
                    pending.map((item, index) =>
                        this.renderCore(item, "pending", item.type, index))
                }
            </styled.ClassCardContainer>
        )
    }

    renderActive = (active) => {
        if (!active.length) {
            return null;
        }

        return (
            <styled.ClassCardContainer>
                <styled.ClassCardHeader>On Going</styled.ClassCardHeader>
                {
                    active.map((item, index) =>
                        this.renderCore(item, "active", item.type, index))
                }
            </styled.ClassCardContainer>
        )
    }

    renderApproved = (approved) => {
        if (!approved.length) {
            return null;
        }

        return (
            <styled.ClassCardContainer>
                <styled.ClassCardHeader>Upcoming class</styled.ClassCardHeader>
                {
                    approved.map((item, index) =>
                        this.renderCore(item, "approved", item.type, index))
                }
            </styled.ClassCardContainer>
        )
    }

    renderCompleted = (completed) => {

        if (!completed.length) {
            return null;
        }

        return (
            <styled.ClassCardContainer>
                <styled.ClassCardHeader>Previous class</styled.ClassCardHeader>
                {
                    completed.map((item, index) =>
                        this.renderCore(item, "completed", item.type, index))
                }
            </styled.ClassCardContainer>
        )
    }

    renderItem = ({ item, index }) => {
        const {
            pending,
            active,
            approved,
            completed,
        } = item;

        if (!!pending) {
            return this.renderPending(pending);
        } else if (!!active) {
            return this.renderActive(active);
        } else if (!!approved) {
            return this.renderApproved(approved);
        } else if (!!completed) {
            return this.renderCompleted(completed);
        }

        return this.renderCore(item, index)
    }

    renderUserClasses = () => {
        const {
            userClassesReducer
        } = this.props;

        if (userClassesReducer.isRequesting) {
            return (
                <styled.LoadingView>
                    <ActivityIndicator size="large" color="#6DCFF6" />
                </styled.LoadingView>
            )
        } else if (userClassesReducer.done) {
            console.log('View Your Clas');
            let {
                data: {
                    items: userClasses
                }
            } = userClassesReducer;


            return (
                <styled.ClassCardView
                    data={userClasses}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.isRefreshing}
                />
            )
        }
    }

    renderMessage = (shouldRender) => {
        if (!shouldRender) {
            return null;
        }
        
        const {
            bookingReducer
        } = this.props;
        console.log('View your class nhay vao renderMessage',bookingReducer)
        if (bookingReducer.isRequesting) {
            console.log('View your class bookingReducer.isRequesting')
            return (
                <LoadingModal
                    isVisible={bookingReducer.isRequesting}
                    message="Cancelling your class..."
                />
            )
        }

        if (bookingReducer.done && this.state.isCanceling) {
            console.log('View your class isCanceling')
            this.setState({
                isCanceling: false,
            })
            
            const {
                navigation,
                fetchUserClasses,
            } = this.props
            const routeName = navigation.state.routeName;
            if (routeName === 'PrivateClass') {
                fetchUserClasses(1, 10, {type: "1"});
            } else if (routeName === 'GroupClass') {
                fetchUserClasses(1, 10, { type: "2" });
            } else {
                fetchUserClasses(1, 10, {});
            }
            return null;
        }

        if (bookingReducer.hasError) {
            this.setState({
                isCanceling: false
            })
            return (
                <MessageModal
                    isVisible={bookingReducer.hasError}
                    closeModal={this.handleCloseModal}
                    message={bookingReducer.data}
                />
            )
        }
        

        

    }

    handleDidFocus = () => {
        console.log('1212121212 handleWillFocus')
        var routeName = this.props.navigation.state.routeName;
        if (routeName === 'PrivateClass') {
            if (!this.state.isResetDataPrivateClass) {
                console.log('PrivateClass handleWillFocus')
                this.setState({
                    isResetDataPrivateClass: true,
                    isResetDataYourClass: false,
                    isResetDataGroupClass: false,
                    isResetDataWorkshop: false

                })
            }
            this.props.fetchUserClasses(1, 10, {type: "1"});
        } else if (routeName === 'GroupClass') {
            if (!this.state.isResetDataGroupClass) {
                console.log('GroupClass handleWillFocus')
                this.setState({
                    isResetDataGroupClass: true,
                    isResetDataPrivateClass: false,
                    isResetDataYourClass: false,
                    isResetDataWorkshop: false
                })
            }
            this.props.fetchUserClasses(1, 10, {type: "2"});
        }else if (routeName === 'Workshop') {
            if (!this.state.isResetDataWorkshop) {
                console.log('Workshop handleWillFocus')
                this.setState({
                    isResetDataWorkshop: true,
                    isResetDataGroupClass: false,
                    isResetDataPrivateClass: false,
                    isResetDataYourClass: false,
                    
                })
            }
            this.props.fetchUserClasses(1, 10, {type: "3"});
        } else {
            
            if (!this.state.isResetDataYourClass) {
                console.log('AllClass handleWillFocus')
                this.setState({
                    isResetDataYourClass: true,
                    isResetDataPrivateClass: false,
                    isResetDataGroupClass: false,
                    isResetDataWorkshop: false
                })
            }
            this.props.fetchUserClasses(1, 10, {});
        }
    }

    render() {
        var routeName = this.props.navigation.state.routeName;
        if (routeName === 'PrivateClass') {
            console.log('ABC PrivateClass render()')
        } else if (routeName === 'GroupClass') {
            console.log('ABC GroupClass render()')
        } else {
            console.log('ABC AllClass render()')
        }
        const {
            navigation
        } = this.props;

        return (
            <styled.MainView>
                <NavigationEvents
                    onDidFocus={this.handleDidFocus}
                />
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                    barStyle="dark-content"
                />
                {this.renderMessage(this.state.isCanceling)}
                {this.renderUserClasses()}

            </styled.MainView>
        )
    }
}
export default ViewUserClasses;