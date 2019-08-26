import React, {Component} from 'react';
import {StatusBar, ActivityIndicator} from 'react-native';
import moment from 'moment';
import { NavigationEvents } from 'react-navigation';
import * as styled from '../styles/UserClassesStyles';
import {getHourFormat, getDateFromString} from '../../../utils/helper';
import LoadingModal from '../../common/LoadingModal';
import MessageModal from '../../common/MessageModal';

const DELETE_ICON = require("../../../../assets/icons/delete.png")

class UserClasses extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectedKey: '',
            isRefreshing: false
        }

        props.fetchHistory(1, 20, {sortBy: "status", orderBy: 1});
    }

    static getDerivedStateFromProps(props, state) {
        const {
            historyReducer
        } = props;

        if (historyReducer.isRequesting) {
            return {
                selectedKey: "",
                isRefreshing: true
            }
        } else {
            return {
                isRefreshing: false
            }
        }

        return null;
    }

    componentDidUpdate() {
        const {
            bookingReducer,
            fetchHistory,
            resetBooking,
            navigation
        } = this.props;

        if (navigation.isFocused() && bookingReducer.done) {
            resetBooking();
            fetchHistory(1, 20, {sortBy: "status", sortType: 1});
        }
    }

    keyExtractor = (item, index) => `history-${index}`;

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

    handleCheckIn = (bookingItem) => {
        this.props.navigation.navigate("ClassDetail", {
            bookingID: bookingItem._id,
            isCheckIn: true
        })
    }

    handleCloseModal = () => {
        this.props.resetBooking();
    }

    handleCancelClass = (bookingID) => {
        this.props.cancelClass(bookingID);
    }

    handleRefresh = () => {
        this.props.fetchHistory(1, 20, {sortBy: "status", sortType: 1});
    }

    handleWillFocus = (payload) => {
        const {
            bookingReducer,
            fetchHistory,
        } = this.props;

        if (bookingReducer.done) {
            fetchHistory(1, 20, {sortBy: "status", sortType: 1});
        }
    }

    renderCore = (item, type = 'completed', index = 0) => {
        const {
            _id,
            class: classData
        } = item

        const {
            dateStarted,
            dateEnded,
            stationName,
            teacherName,
            teacherImage
        } = classData[0];
        
        const itemKey = `${type}-${index}`;
        const isSelected = itemKey === this.state.selectedKey;

        return (
            <styled.ClassCardBoundary
                key={itemKey}
            >
                <styled.ClassCardWrapper
                    type={type}
                    isSelected={isSelected}
                    onLongPress={() => type != "completed" ? this.handleClassLongPress(itemKey) : false}
                    onPress={() => this.handleClassPress(item, itemKey, type)}
                >
                    <styled.ClassCard>
                        <styled.TeacherAvatarWrapper>
                            <styled.TeacherAvatar source={{uri: teacherImage}} resizeMode="cover"/>
                        </styled.TeacherAvatarWrapper>
                        <styled.ClassInfo>
                            <styled.ClassInfoText>{`${getHourFormat(dateStarted, dateEnded)} | ${getDateFromString(dateStarted)}`}</styled.ClassInfoText>
                            <styled.ClassInfoText>{stationName}</styled.ClassInfoText>
                            <styled.ClassSubInfo>{`Teacher: ${teacherName}`}</styled.ClassSubInfo>
                        </styled.ClassInfo>
                        {
                            type === "active" &&
                            <styled.ClassButton
                                onPress={() => this.handleCheckIn(item)}
                                type={type}
                            >
                                <styled.ClassButtonText>Check in</styled.ClassButtonText>
                            </styled.ClassButton>
                        }
                    </styled.ClassCard>

                </styled.ClassCardWrapper>
                {
                    isSelected && type != "completed" &&
                    <styled.CancelButton
                        onPress={() => this.handleCancelClass(_id)}
                    >
                        <styled.CancelButtonIcon source={DELETE_ICON}/>
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
                    pending.map((item, index) => this.renderCore(item, "pending", index))
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
                    active.map((item, index) => this.renderCore(item, "active", index))
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
                    approved.map((item, index) => this.renderCore(item, "approved", index))
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
                    completed.map((item, index) => this.renderCore(item, "completed", index))
                }
            </styled.ClassCardContainer>
        )
    }

    renderItem = ({item, index}) => {
        const {
            pending,
            active,
            approved,
            completed
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
            historyReducer
        } = this.props;

        if (historyReducer.isRequesting) {
            return (
                <styled.LoadingView>
                    <ActivityIndicator size="large" color="#6DCFF6"/>
                </styled.LoadingView>
            )
        } else if (!historyReducer.isRequesting && historyReducer.done) {
            let {
                data: {
                    items: history
                }
            } = historyReducer;

            return (
                <styled.ClassCardView
                    data={history}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.isRefreshing}
                />
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
                    message="Cancelling your class..."
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

    render() {
        const {
            navigation
        } = this.props;

        return (
            <styled.MainView>
                <NavigationEvents
                    onWillFocus={this.handleWillFocus}
                />
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                    barStyle="dark-content"
                />
                {this.renderMessage(navigation.isFocused())}
                {this.renderUserClasses()}
            </styled.MainView>
        )
    }
}

export default UserClasses;
