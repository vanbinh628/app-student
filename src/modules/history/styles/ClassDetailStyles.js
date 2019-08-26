import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';

export const MainViewer = styled.View`
    flex: 1;
    position: relative;
`

export const CoverViewer = styled.View`
    flex: ${props => props.shouldMinimize ? 1 : 3};
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

export const BookedClassOverview = styled.View`
    width: 100%;
    height: auto;
`

export const ClassInfo = styled.View`
    ${props => props.rowContent ? "flex-direction: row;" : ""}
    flex: 1;
    margin-left: 20px;
    ${props => props.isBookingSuccess ? "align-items: center; justify-content: center;" : ""}
`

export const ClassTimePlace = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #404040;
`

export const ClassSubInfoText =styled.Text`
    font-size: 12px;
    color: #7A7A7A;
`

export const ClassAddress =styled.Text`
    font-size: 12px;
    color: #7A7A7A;
`

export const ClassInfoText = styled.Text`
    font-size: ${props => props.isBookingSuccess ? "18px" : "14px"};
    color: ${props => props.isBookingSuccess ? "#FEAF34" : "#404040"};
    font-weight: bold;
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
`

export const ConfirmButton = styled.TouchableOpacity`
    width: 180px;
    height: 40px;
    align-items: center;
    justify-content: center;
    background-color: #6DCFF6;
    border-radius: 5px;
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
    elevation: ${props => props.hideShadow ? 0 : 1};
`

export const TeacherMessageText = styled.Text`
    font-size: 14px;
    color: #404040;
`

export const EnjoyClassIcon = styled.Image`
    width: 20px;
    height: 20px;
    margin-right: 3px;
`

export const EnjoyClassText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #3CBA54;
`

export const ActionButtonWrapper = styled.View`
    margin-top: 20px;
    margin-bottom: 20px;
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`

export const AcceptButton = styled.TouchableOpacity`
    width: 130px;
    height: 40px;
    align-items: center;
    justify-content: center;
    background-color: #6DCFF6;
    border-radius: 5px;
    margin-left: 10px;
`

export const AcceptButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #FFF;
`

export const ClassRating = {
    marginLeft: 10,
    width: 80,
    marginTop: 5,
}
