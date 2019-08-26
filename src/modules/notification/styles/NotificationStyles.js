import styled from 'styled-components';

export const MainView = styled.View`
    flex: 1;
    margin-top: 22px;
`

export const SText = styled.Text`
    font-size: 14px;
    color: #6DCFF6;
    font-weight: bold;
`
export const NotiWrap = styled.View`
  background-color: white;
  flex: 1;
  height: 500px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 5px;
`
export const NotiHeader = styled.View`
  ${'' /* background-color: white; */}
  height: 40px;
  justify-content:center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: #DADADA;
  
`
export const NotiHeaderText = styled.Text`
  position: absolute;
  right: 10px;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: #6DCFF6;
`
export const TeacherName = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #404040;
`

export const MaskView = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  height: 45px;
  line-height: 50px;
  padding-right: 10px;
  padding-top: 15px;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: #DADADA;
`

export const NotiItem = styled.TouchableOpacity`
  border-color: #DADADA;
  border-bottom-width: 1px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 8px;
  padding-bottom: 8px;
  flex-direction: row;
  justify-content: center;
  ${'' /* background: rgba(109, 207, 246, 0.1); */}
  background-color: ${props => {
        if (props.status === 0) {
          return  'rgba(109, 207, 246, 0.1)';
        }
        else return 'white'
    }
  }
`

export const NotiInfo = styled.View`
  flex: 1;
  padding-left: 10px;
`
export const subText = styled.Text`
  font-size: 12px;
  color: #7A7A7A;
`
export const NotiList = styled.FlatList`
  flex: 1;
`

export const LoadingView = styled.View`
    margin-top: 30px;
`
export const NotiPictureWrapper = styled.View`
    align-items: center;
    justify-content: center;
`
export const NotiPicture = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 25px;
`
