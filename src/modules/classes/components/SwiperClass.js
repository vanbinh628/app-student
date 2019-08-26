import React, { Component } from 'react';
import {
    Text,View,Button
} from 'react-native';
import Swiper from 'react-native-swiper';
import PrivateClass from './PrivateClass'
import GroupClass from './GroupClass'
import Workshop from './Workshop'
class SwiperClass extends Component {


    
    static navigationOptions = {
            header: null,
    };
    constructor(props){
        super(props)
        console.log('view switch class constructor');
    }
    handlePress = () => {
        const {
            navigation
        } = this.props;

        navigation.navigate('Home');
        console.log('view switch classang goi ham');
    }
    render() {
        console.log('view switch class render()');
        return (
            
            <Swiper style={styles.wrapper} 
            dot={<View style={styles.dotStyle} />}
            activeDot={<View style={styles.activeDot} />}
            >
                {/* <View>
                <Button
                    title='hello'
                    onPress={()=>this.handlePress()}
                />
                </View> */}
               
                
                <PrivateClass/>
                <GroupClass _navigation={this.props.navigation}/>
                <Workshop _navigation={this.props.navigation}/>
                
            </Swiper>
        );
    }
}

const styles = {
    wrapper: {
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    dotStyle:{
        backgroundColor:'rgba(0,0,0,.2)',
        width: 8,
        height: 8,
        borderRadius: 4, 
        marginLeft: 3, 
        marginRight: 3, 
        marginTop: 3, 
        marginBottom: 3
    },
    activeDot:{
        backgroundColor: '#000', 
        width: 8, 
        height: 8, 
        borderRadius: 4, 
        marginLeft: 3, 
        marginRight: 3, 
        marginTop: 3, 
        marginBottom: 3,
    },

}
export default SwiperClass;

