import React, {Component} from 'react';
import {Image, TouchableOpacity} from 'react-native';
const LOGO_PATH = require('../../../../assets/logos/white.png');
import styled from 'styled-components';

class GroupClass extends Component {
   constructor(props){
       super(props)
   }
   handlePress = () => {
    const {
        _navigation
    } = this.props;

     _navigation.navigate('ListTopic',{classType: 2});
     //_navigation.navigate('MoreInfoClass', {classID:'5cefbd4e6b357c18a37ffa35'});

}

    render() {
        return (
          <MainViewer>
              <BodyImage>
              <TouchableOpacity onPress={this.handlePress}>
                  <Circle>
                        <ImageGroup source={require('../../../../assets/Group.png')}/>
                  </Circle>
            </TouchableOpacity>
              </BodyImage>
              <BodyTexts>
                  <TitleText onPress={() => this.handlePress()}>
                      Group Class
                  </TitleText>
                  <RectagularUnder></RectagularUnder>
                  <TextInfor>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever.
                  </TextInfor>
              </BodyTexts>
          </MainViewer>
        )
    }
}

export default GroupClass;

export const MainViewer = styled.View`
    flex:1;
    background-color:#E5E5E5;
    flex-direction:column;
    justify-content:center;
` 
export const BodyImage = styled.View`
    align-items:center;
    justify-content:center;
` 
export const Circle= styled.View`
    flex-direction: column;
    width: 302px;
    height: 302px;
    background-color: white;
    borderRadius: 151px;
    align-items: center;
    justify-content:center;
    elevation: 1;
`
export const ImageGroup= styled.Image`
    width: 210px;
    height: 140px;
`
export const BodyTexts = styled.View`
    padding-top:21px;
    flex-direction:column;
    align-items:center;
` 

export const TitleText = styled.Text`
    font-family: Lato;
    font-style: normal;
    font-weight: 900
    font-size: 24;
    text-align: center;
    letter-spacing: -0.24;
    color: #7A7A7A;
`   
export const RectagularUnder = styled.View`
    width:134px;
    height:4px;
    background-color:#3CBA54;
`   
export const TextInfor = styled.Text`
    margin-top:13px;
    width:70%;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    text-align: justify;
    color: #7A7A7A;
`   
