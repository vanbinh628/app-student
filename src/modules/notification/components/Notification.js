import React, { Component } from 'react';
import { StatusBar, View, Text, ActivityIndicator } from 'react-native';
import HTML from 'react-native-render-html';
import * as styled from '../styles/NotificationStyles';
import {
    NOTI_TYPE_APPROVED,
    NOTI_TYPE_DECLINED,
    NOTI_TYPE_EXPIRED,
    NOTI_TYPE_12REMIND,
    NOTI_TYPE_1REMIND
} from '../../../params'
import moment from 'moment';

class Notification extends Component {
    static navigationOptions = {
        title: 'Notification',
        headerStyle: {
            backgroundColor: 'none',
            paddingTop: 57,
        },
        headerTitleStyle: {
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 16,
            lineHeight: 17,
            textAlign: 'center',
            color: '#7A7A7A'
        },
    }
    constructor(props) {
        super(props);

        props.fetchNoti();
    };

    keyExtractor = (_, index) => `notification-${index}`;

    handleNotiPress = (noti) => {
        console.log('xem gia tri noti',noti.targetID);
        
        const {
            navigation
        } = this.props;
        navigation.navigate('ClassDetail', {
            classID: noti.targetID
        })
        // switch (noti.type) {
        //     case NOTI_TYPE_APPROVED:
        //     case NOTI_TYPE_DECLINED:
        //     case NOTI_TYPE_EXPIRED:
        //     case NOTI_TYPE_12REMIND:
        //     case NOTI_TYPE_1REMIND:
        //         navigation.navigate('ClassDetail', {
        //             bookingID: noti.targetID
        //         })
        //     default: break;
        // }
    }

    renderItem = ({ item, index }) => {
        const {
            avatar,
            content,
            dateCreated,
            status,
            notiData: {
                stationName,
                timeStarted,
                timeEnded,
                formattedDate
            }
        } = item;

        return (
            <styled.NotiItem 
                status = {status}
                onPress={() => this.handleNotiPress(item)}
            >
                <styled.NotiPictureWrapper>
                    <styled.NotiPicture source={{ uri: avatar }} />
                </styled.NotiPictureWrapper>

                <styled.NotiInfo>
                    <HTML html={content} />
                    {/* <styled.subText>{`${timeStarted} - ${timeEnded} | ${formattedDate}`}</styled.subText> */}
                    {/* <styled.subText>{stationName}</styled.subText> */}
                    <styled.subText>{moment(dateCreated).format('HH:mm')} | {moment(dateCreated).format('DD/MM/YYYY')}</styled.subText>
                    <styled.subText>Location:</styled.subText>
                    <styled.subText>Lesson:</styled.subText>
                </styled.NotiInfo>
            </styled.NotiItem>
        )
    }
    renderHeader = () => {
        //View to set in Header
        return (
            <styled.NotiHeader>
                <styled.NotiHeaderText>Mask as all seen</styled.NotiHeaderText>
            </styled.NotiHeader>
        );
    };
    renderNotification = () => {
        const {
            notiReducer
        } = this.props;

        if (notiReducer.isRequesting) {
            return (
                <styled.LoadingView>
                    <ActivityIndicator size="large" color="#6DCFF6" />
                </styled.LoadingView>
            )
        } else if (!notiReducer.isRequesting && notiReducer.done) {
            let {
                data: {
                    items: notifications
                }
            } = notiReducer;

            return (
                <styled.NotiList
                    data={notifications}
                    ListHeaderComponent={this.renderHeader}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                />
            )
        }

        return null;
    }

    render() {
        return (
            <styled.MainView>
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                    barStyle="dark-content"
                />
                <styled.NotiWrap>
                    {/* <styled.MaskView>
                  <styled.SText>Mask as all seen</styled.SText>
                </styled.MaskView> */}
                    {this.renderNotification()}
                </styled.NotiWrap>
            </styled.MainView>
        )
    }
}

export default Notification;
