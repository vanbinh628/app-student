import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';

export const MainView = styled.View`
    flex: 1;
`

export const LoadingView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const LocationList = styled.FlatList`
    flex: 1;
    margin-top: 30px;
    margin-right: 20px;
    margin-left: 20px;
`
export const LocationContainer = styled.TouchableOpacity`
    width: 99%;
    flex-direction: row;
    elevation: 1;
    border-radius: 5px;
    margin-top: 20px;
    background-color: #FCFCFC;
`
export const LocationImageWrapper = styled.View`
    width: 120px;
    height: 120px;
    border-radius: 5px;
    elevation: 1;
`
export const LocationImage = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 5px;
`

export const LocationInfo = styled.View`
    flex: 1;
    margin-left: 15px;
    justify-content: center;
`

export const LocationName = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #414040;
`

export const LocationAddress = styled.Text`
    font-size: 13px;
    color: #7A7A7A;
    margin-top: 5px;
`