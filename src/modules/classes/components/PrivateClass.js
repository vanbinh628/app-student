import React, {Component} from 'react';
import {Image, AsyncStorage, Alert,AppRegistry,Text} from 'react-native';
const LOGO_PATH = require('../../../../assets/logos/white.png');
import styled from 'styled-components';
class PrivateClass extends Component {

    render() {
       
        return (
          <MainViewer>
              <BodyImage>
                  <Circle>
                  <ImageGroup source={require('../../../../assets/private.png')}/>
                  </Circle>
              </BodyImage>
              <BodyTexts>
                  <TitleText>
                      Private Class
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

export default PrivateClass;

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
    width: 260px;
    height: 260px;
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
    background-color:#6DCFF6;
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
