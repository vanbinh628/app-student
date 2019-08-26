import styled from 'styled-components';

export const MainView = styled.View`
    flex: 1;
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
    margin-bottom: 20px;
    align-items: center;
    border-radius: 5px;
    elevation: 1;
    padding-bottom: 10px;
    background-color: #FFF;
`

export const LoadingView = styled.View`
    margin-top: 30px;
`

export const HeaderView = styled.View`
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-bottom-color: #DADADA;
    border-style: solid;
    background-color: #FAFAFA;
    width: 99%
    height: 40px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-top: 1px;
`

export const HeaderText = styled.Text`
    font-size: 14px;
    font-weight: bold;
`
export const TopicScrollView = styled.ScrollView`
    flex: 1;
    width: 99%;
    padding: 0px 20px;
    background-color: #FFF;
    margin-bottom: 15px;
`
export const TopicView = styled.View`
    flex-direction: column;
    width: 100%;
    padding: 15px 10px;
`
export const TopicTextView = styled.View`
    flex: 1;
`

export const TopicText = styled.Text`
    font-size: 14px;
    color: #404040;
`

export const SubjectCheckedView = styled.View`
    width: 50px;
    justify-content: center;
    align-items: center;
`

export const SubjectChecked = styled.Image`

`

export const NextButton = styled.TouchableOpacity`
    width: 180px;
    height: 40px;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.disabled ? '#DADADA' : '#6DCFF6'};
    border-radius: 5px;
`

export const NextButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #FFF;
`

export const SubjectView = styled.TouchableOpacity`
    flex-direction: row;
    width: 100%;
    padding: 15px 10px;
    border-bottom-width: 1px;
    border-bottom-color: #DADADA;
    border-style: solid;
`

export const SubjectTextView = styled.View`
    flex: 1;
`

export const SubjectText = styled.Text`
    font-size: 14px;
    color: #404040;
`
