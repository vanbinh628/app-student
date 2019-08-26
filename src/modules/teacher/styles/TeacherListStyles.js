import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import StarRating from 'react-native-star-rating';

export const MainViewer = styled.View`
    flex: 1;
    position: relative;
`

export const BackgroundImage = styled.Image`
    width: 100%;
    height: 100%;
`

export const LoadingView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const BackgroundGradient = styled(LinearGradient)`
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    opacity: 0.7;
`

export const TeacherListWrapper = styled.View`
    position: absolute;
    top: 15px;
    width: 100%;
    height: 60%;
    padding-top: 22px;
    borderRadius: 10px;
`

export const TeacherList = styled(Carousel)`
    margin-top: 15px;
`

export const TeacherPictureView = styled.TouchableOpacity`
    flex: 1;
`

export const TeacherPicture = styled.Image`
    flex: 1;
    borderRadius: 10;
`

export const TeacherDescriptionView = styled.View`
    position: absolute;
    align-items: center;
    bottom: 0px;
    width: 100%;
    height: 40%;
`
export const TeacherName = styled.Text`
    margin-top: 25px;
    font-size: 24px;
    font-weight: bold;
    color: white;
`

export const TeacherRating = {
    width: 100,
    marginTop: 8,
}

export const TeacherDescription = styled.Text`
    font-size: 14px;
    color: white;
    margin: 10px 40px;
    margin-top: 0px;
    textAlign: justify;
`

export const TeacherInfoWrapper = styled.ScrollView`
  margin-top: 10px;
`
