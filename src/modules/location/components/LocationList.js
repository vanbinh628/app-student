import React, {Component} from 'react';
import {Dimensions, StatusBar, ActivityIndicator} from 'react-native';
import * as styled from '../styles/LocationListStyles';
// import ActionBar from '../../common/ActionBar';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class LocationList extends Component {
    constructor(props){
        super(props);
        this.state={
            index: 0,
        }

        props.fetchLocationList(1, 20);
    }

    handlePress = (location) => {
        const {
            navigation
        } = this.props;

        navigation.navigate('Schedule', {
            location: {...location}
        });
    }

    handleEndReached = () => {
        const {
            locationListReducer: {
                data: {
                    total,
                    page,
                    limit
                }
            },
            fetchLocationList
        } = this.props;

        if (page * limit < total) {
            fetchLocationList(+page + 1, limit);
        }
    }

    keyExtractor = (item, index) => `${index}`;

    renderItem = ({item}) => {
        return (
            <styled.LocationContainer
                onPress={() => this.handlePress(item)}
            >
                <styled.LocationImageWrapper>
                    <styled.LocationImage source={{uri: item.avatar}} resizeMode="cover"/>
                </styled.LocationImageWrapper>
                <styled.LocationInfo>
                    <styled.LocationName>{item.name}</styled.LocationName>
                    <styled.LocationAddress>{item.address}</styled.LocationAddress>
                </styled.LocationInfo>
            </styled.LocationContainer>
        );
    }

    renderLocationList = () => {
        const {
            locationListReducer
        } = this.props;

        if (locationListReducer.isRequesting) {
            return (
                <styled.LoadingView>
                    <ActivityIndicator size="large" color="#6DCFF6"/>
                </styled.LoadingView>
            )
        } else if (!locationListReducer.isRequesting && locationListReducer.done) {
            let {
                data: {
                    items: locations
                }
            } = locationListReducer;

            return (
                <styled.LocationList
                    data={locations}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.isRefreshing}
                />
            )
        }

        return null;
    }

    render() {
        return (
            <styled.MainView>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="transparent"
                    translucent={true}
                />
                {/* <ActionBar
                    title="Set schedule for"
                /> */}
                {this.renderLocationList()}
            </styled.MainView>
        )
    }
}

export default LocationList;
