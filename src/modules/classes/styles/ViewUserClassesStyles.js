import styled from 'styled-components';

export const MainView = styled.View`
    flex: 1;
    margin-top: 22px;
`

export const Text = styled.Text`
    font-size: 32px;
    color: blue;
`

export const LoadingView = styled.View`
    margin-top: 30px;
`

export const ClassCardView = styled.FlatList`
    flex: 1;
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
`

export const ClassCardContainer = styled.View`
    width: 100%;
`

export const ClassCardHeader = styled.Text`
    color: #7A7A7A;
    font-size: 14px;
    font-weight: bold;
`

export const ClassCardBoundary = styled.View`
    width: 100%;
    height: 85px;
    flex-direction: row;
    margin: 10px 0px;
    align-items: center;
`

export const ClassCardWrapper = styled.TouchableOpacity`
    width: 100%;
    height: 85px;
    background-color: ${props => {
        switch (props.typeClass) {
            case "group":
                return "#3CBA54";
            case "private":
                return "#6DCFF6";
            case "workshop":
                return "#029CC7";
            case "completed":
            default:
                return "#FFF";
        }
    }};
    border-radius: 5px;
    overflow: hidden;
    padding-left: 5px;
    elevation: 1;
    margin-left: ${props => props.isSelected ? "-120px" : "0px"}
`

export const ClassCard = styled.View`
    flex-direction: row;
    width: 100%;
    height: 85px;
    background-color: white;
    align-items: center;
`

export const TeacherAvatarWrapper = styled.View`
    width: 60px;
    height: 60px;
    border-radius: 60px;
    overflow: hidden;
    margin-left: 5px;
`

export const TeacherAvatar = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 30px;
`

export const ClassInfo = styled.View`
    flex: 1;
    margin-left: 20px;
`

export const ClassInfoText = styled.Text`
    font-size: 14px;
    color: #404040;
    font-weight: bold;
`

export const ClassSubInfo =styled.Text`
    font-size: 12px;
    color: #7A7A7A;
`
export const ClassSubInfoLesson =styled.Text`
    font-size: 12px;
    color: #6DCFF6;
`
export const ClassRating = styled.View`
    marginRight: 14px;
`
export const ClassButton = styled.TouchableOpacity`
    
    width: 80px;
    height: 30px;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    border-radius: 2px;
    position: absolute;
    right: 5px;
    top: 27px;
    background-color: ${props => {
        switch (props.type) {
            case "active":
                return "#3CBA54";
            case "canceled":
                return "#C4C4C4";
            case "completed":
                return "#6DCFF6";
            default:
                return "#FFF";
        }
    }};
`

export const ClassButtonText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #FFF;
`

export const CancelButton = styled.TouchableOpacity`
    width: 120px;
    height: 50px;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #DB3236;
    flex-direction: row;
`

export const CancelButtonIcon = styled.Image`
    width: 20px;
    height: 20px;
    margin-right: 3px;
`

export const CancelButtonText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #FFF;
`
