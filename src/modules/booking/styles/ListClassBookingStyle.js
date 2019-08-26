import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';

export const MainViewer = styled.View`
    flex: 1;
    position: relative;
`

export const CoverViewer = styled.View`
    flex: 3;
`

export const ContentViewer = styled.ScrollView`
    flex: 5;
`

export const LoadingView = styled.View`
    margin-top: 30px;
`

export const CoverImage = styled.Image`
    margin-left: -5%;
    width: 110%;
    height: 100%;
`

export const CoverGradient = styled(LinearGradient)`
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    opacity: 0.7;
`

export const HeaderView = styled.View`
    flex-direction: row;
    position: absolute;
    bottom: 0px;
    width: 100%;
`

export const BackButton = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    border-radius: 5px;
    background-color: #FFF;
    margin-left: 15px;
    margin-top: 5px;
    align-items: center;
    justify-content: center;
`

export const TeacherInfoView = styled.View`
    flex: 1;
    margin-left: 10px;
    margin-bottom: 15px;
`

export const TeacherName = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #FFF;
`

export const BackButtonIcon = styled.Image``

export const TeacherRating = {
    width: 80,
    marginTop: 5,
}

export const ClassCardView = styled.FlatList`
    flex: 1;
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
`

export const ClassCardWrapper = styled.View`
    width: 100%;
    height: 100px;
    background-color:white;
    margin: 5px 0px;
    border-radius: 5px;
    overflow: hidden;
    padding-left: 5px;
    elevation: 1;
`

export const ClassCard = styled.View`
    flex-direction: row;
    width: 100%;
    height: 100px;
    background-color: white;
    align-items: center;
`

export const ClassInfo = styled.View`
    flex: 1;
    margin-left: 20px;
    ${props => props.isBookingSuccess ? "align-items: center; justify-content: center;" : ""}
`

export const ClassInfoText = styled.Text`
    font-size: ${props => props.isBookingSuccess ? "18px" : "14px"};
    color: ${props => props.isBookingSuccess ? "#FEAF34" : "#404040"};
    font-weight: bold;
`
export const searchContainerView= styled.View`
    flexDirection: row;
    height: 30px;
    backgroundColor: white;
    margin: 10px;
    marginBottom: 0px;
    borderRadius: 30px;
    elevation: 2;
    alignItems: center;
`
export const  inputSearchTextInput= styled.TextInput`
    flex: 1;
    height: 30px;
    alignItems: center;
    fontSize: 14;
    font-style: italic;
    marginRight: 16px;
    marginLeft: 5px;                                                                                                                                                                                                                                                                            
    padding: 5px;
`

export const ClassSubInfoText =styled.Text`
    font-size: 12px;
    color: #7A7A7A;
`

export const ClassTimePlace = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #404040;
`

export const ClassAddress =styled.Text`
    font-size: 12px;
    color: #7A7A7A;
`
export const MapText = styled.Text`
    color: #6DCFF6;
    fontSize: 14px;
    marginRight: 20px;
    fontWeight: bold;
`
export const ClassLesson =styled.Text`
    flexDirection:row;
    font-size: 12px;
    color: #7A7A7A;
`
export const ClassLink =styled.Text`
    textDecorationLine: underline;
    flexDirection:row;
    font-size: 12px;
    color: #6DCFF6;
`

export const BookButton = styled.TouchableOpacity`
    width: 80px;
    height: 80px;
    align-items: center;
    justify-content: center;
    border-left-width: 1px;
    border-left-color:#DADADA;

    border-style: solid;
`

export const BookButtonText = styled.Text`
    font-weight: bold;
    font-family: Lato;
    font-style: normal;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    color: ${props => {
        switch (props.statusClass) {
            case "booked":
                return "#3CBA54";
            case "book":
                return "#6DCFF6";
            case "full":
                return "#DADADA";
            default:
                return "#DADADA";
        }
    }};
`

export const BookedClassOverview = styled.View`
    width: 100%;
    height: auto;
`

export const BookedInfo = styled.View`
    flex-direction: row;
    width: 100%;
    height: 60px;
    background-color: white;
    align-items: center;
    elevation: ${props => props.hideShadow ? 0 : 1};
    border-top-width: 1px;
    border-top-color: #DADADA;
    border-style: solid;
`
export const AddMessageButton = styled.TouchableOpacity`
    width: 80px;
    justify-content: center;
    align-items: center;
`

export const AddMessageButtonText = styled.Text`
    color: #6DCFF6;
    font-size: 14px;
    font-weight: bold;
`
export const ConfirmButtonWrapper = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    margin-top: 30px;
`

export const ConfirmButton = styled.TouchableOpacity`
    width: 180px;
    height: 40px;
    align-items: center;
    justify-content: center;
    background-color: #6DCFF6;
    border-radius: 5px;
    margin-bottom: 40px;
`

export const ConfirmButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #FFF;
`

export const TeacherMessageView = styled.View`
    width: 100%;
    height: auto;
    background-color: #FFF;
    padding: 0px 20px 20px 20px;
    elevation: 1;
`

export const TeacherMessageText = styled.Text`
    font-size: 14px;
    color: #404040;
`
