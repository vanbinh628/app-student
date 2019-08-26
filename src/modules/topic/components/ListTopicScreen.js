import React, { Component } from 'react';
import Styled from '../styles/ListTopicStyles';
import {
    Dimensions, StatusBar, ActivityIndicator, View, FlatList,
    TextInput, Image, TouchableOpacity, Text, ScrollView,
} from 'react-native';
import { topics } from '../../../FakeData';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const SEARCH_ICON = require('../../../../assets/icons/ic_search.png');
const BACK_ARROW = require('../../../../assets/icons/back-arrow.png');

import LinearGradient from 'react-native-linear-gradient';


const debounce = (callback, wait) => {
    let timeout = null
    return (...args) => {
        const next = () => callback(...args)
        clearTimeout(timeout)
        timeout = setTimeout(next, wait)
    }
}

class ListTopicScreen extends Component {
    static navigationOptions = {
        header: null,
    }
    // static navigationOptions = {
    //     title: 'List topic',
    //     headerStyle: {
    //         paddingTop:45,
    //         height:100,
    //         backgroundColor: '#5CB9FC',
    //         shadowOpacity: 0,
    //         shadowOffset: {
    //             height: 0,
    //         },
    //         shadowRadius: 0,
    //         elevation: 0,
    //     },
    //     headerTintColor: 'white',
    //     headerTitleStyle: {
    //         flex: 1,
    //         fontWeight: 'bold',
    //         alignSelf: 'center',
    //         textAlign: 'center',
    //         marginRight: 50,
    //     },
    // };
    constructor(props) {
        super(props);
        console.log('List Topic constructor');

        const getClassType = props.navigation.getParam('classType');
        console.log('ListTopic gia tri cua classType', getClassType);

        props.fetchTopicList(1, 20, {});

        this.state = {
            index: 0,
            searchQuery: '',

            filters: {
                name: ''
            },
            classType: getClassType,
        }
    }
    handleBack = () => {
        this.props.navigation.goBack();
    }

    handleSearchQuery = debounce((value) => {
        this.setState({
            filters: {
                ...this.state.filters,
                name: value,
            }
        })
        console.log('List Topic setState');
        this.props.fetchTopicList(1, 20, this.state.filters);
    }, 1000)

    handleChangText = (value) => {
        this.setState({
            filters: {
                ...this.state.filters,
                name: value,
            }
        })
    }

    handleSearch = () => {
        this.props.fetchTopicList(1, 20, this.state.filters);
    }

    handlePress = (topic) => {
        const {
            navigation
        } = this.props;

        navigation.navigate('ListClass', {
            topic: { ...topic }, classType: this.state.classType,
        });
    }

    handleEndReached = () => {
        const {
            topicListReducer: {
                data: {
                    total,
                    page,
                    limit
                }
            },
            fetchTopicList
        } = this.props;

        if (page * limit < total) {
            fetchTopicList(+page + 1, limit);
        }
    }

    renderTopicList = () => {
        const { topicListReducer } = this.props;

        if (topicListReducer.isRequesting) {
            return (
                <View style={Styled.loadingView}>
                    <ActivityIndicator size="large" color="#6DCFF6" />
                </View>
            )
        } else if (!topicListReducer.isRequesting && topicListReducer.done) {
            let {
                data: {
                    items: topics
                }
            } = topicListReducer;
            console.log('list topic', topicListReducer.isRequesting);
            return (
                <FlatList
                    data={topics}
                    style={Styled.list}
                    showsVerticalScrollIndicator={false}
                    overScrollMode="never"

                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.isRefreshing}

                />
            )
        }
        console.log('list topic', topicListReducer.done);

        return null;
    }

    keyExtractor = (item, index) => `${index}`;

    renderItem = ({ item }) => {

        return (
            <TouchableOpacity
                style={Styled.item}
                onPress={() => this.handlePress(item)} >
                <View style={{ width: 120, height: 120, borderRadius: 5 }}>
                    <Image
                        style={{ flex: 1, borderRadius: 5 }}
                        source={item.imageUrl !== '' ?  uri: item.imageUrl  }
                        resizeMode="cover"
                    />
                </View>
                <View style={Styled.contentContainer}>
                    <Text
                        numberOfLines={2}
                        ellipSizeMode='tail'
                        style={Styled.name}
                    >
                        {item.name}

                    </Text>
                    <View style={{ width: '82%' }}>
                        <Text
                            numberOfLines={3}
                            ellipSizeMode='tail'
                            style={Styled.description}
                        >
                            {item.description}
                        </Text>
                    </View>
                    <Text
                        numberOfLines={1}
                        ellipSizeMode='tail'
                        style={Styled.tag}
                    >
                        {item.hashtags}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        console.log('List Topic render()');

        const searchArea = (
            <View style={Styled.searchContainer}>
                <Image style={{ marginLeft: 16 }} source={SEARCH_ICON} />
                <TextInput
                    placeholder="Search Topic"
                    style={Styled.inputSearch}
                    onChangeText={this.handleChangText}
                    returnKeyType="search"
                    onSubmitEditing={this.handleSearch}
                />
            </View>
        );
        const headerContainer = (
            <View style={Styled.headerContainer}>

                <LinearGradient style={Styled.linearGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#6DCFF6', '#5CB9FC']}
                />

                <TouchableOpacity
                    style={Styled.backIconContainer}
                    onPress={() => this.handleBack()}
                >
                    <Image style={Styled.backIcon} source={BACK_ARROW} />
                </TouchableOpacity>

                <Text style={Styled.TextHeader}>List Topic</Text>
            </View>
        );

        // const listTopic = (
        //     <FlatList
        //         data={topics}
        //         style={Styled.list}
        //         showsVerticalScrollIndicator={false}
        //         keyExtractor={this.keyExtractor}
        //         renderItem={this.renderItem}
        //         overScrollMode="never"
        //         onRefresh={this.handleRefresh}
        //     />
        // );

        return (
            <ScrollView style={Styled.container}>
                {headerContainer}
                {searchArea}
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="transparent"
                    translucent={true}
                />
                {/* <ActionBar
                    title="Set schedule for"
                /> */}
                {this.renderTopicList()}
            </ScrollView>
        )
    }
}
export default ListTopicScreen;
