import React, {PureComponent} from 'react';
import Modal from "react-native-modal";
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MainView = styled.View`
    width: 60%;
    height: auto;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding-bottom: 5px;
    background-color: #FFF;
`

const HeaderView = styled.View`
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-bottom-color: #DADADA;
    border-style: solid;
    background-color: #FAFAFA;
    width: 100%
    height: 40px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-top: 1px;
`

const HeaderText = styled.Text`
    font-size: 14px;
    font-weight: bold;
`
const ParticipantItem = styled.Image`
    width:30px;
    height:30px;
    
    border-radius: 20px;
    border-width: 3px;
    border-color: #C4C4C4;
    background-color: #C4C4C4;
`

export const ClassCard = styled.View`
    padding: 7px;
    
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    flex-direction: row;
    width: auto;
    height: auto;
    background-color: white;
    align-items: center;
`

export const StudentAvatarWrapper = styled.View`
    width: 60px;
    height: 60px;
    border-radius: 60px;
    overflow: hidden;

    border-width: 3px;
    border-color: #C4C4C4;
    background-color: #C4C4C4;
`

export const StudentAvatar = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 30px;
`

export const ClassInfo = styled.View`
    flex: 1;
    margin-left: 20px;
`

export const ClassNameText = styled.Text`
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    text-align: justify;
`
export const ClassAboutText = styled.Text`
    font-family: Lato;
    font-size: 9px;
    line-height: 11px;
    text-align: justify;
`

export const ClassLevelText =styled.Text`
    font-family: Lato;
    font-style: normal;
    font-size: 8px;
    line-height: 10px;
    text-align: justify;
`
export const ClassContentLevel = styled.View`
    max-width: 80px;

`
export const ClassLevelLine= styled.View`
    height: 1px;
    margin-top: 6px;
    background: #C4C4C4;
`

class InformationUserBasic extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            student: {
                ...props.student
            },
        }
    }

    // handleMessage = (message) => {
    //     this.setState({
    //         message
    //     });
    // }

    // handleNext = () => {
    //     this.props.onNext(this.state.message);
    // }

    render() {
        const {
            isVisible,
            closeModal,
            student
        } = this.props;

        return (
            <Modal 
                style = {{flex:1, alignItems:'center'}}
                isVisible={isVisible}
                onBackButtonPress={closeModal}
                onBackdropPress={closeModal}
                backdropOpacity={0.5}
                avoidKeyboard={true}
            >
                <MainView>
                    {/* <ParticipantItem  source={{ uri: 'https://avatars2.githubusercontent.com/u/31912747?s=180&v=4' }}/> */}

                    <ClassCard>
                        <StudentAvatarWrapper>
                            <StudentAvatar source={{ uri: student.avatar }}
                                resizeMode="cover" />
                        </StudentAvatarWrapper>
                        <ClassInfo>
                            <ClassNameText>{student.name}</ClassNameText>
                            <ClassAboutText>{student.about}</ClassAboutText>
                            <ClassContentLevel>
                                <ClassLevelLine></ClassLevelLine>
                                <ClassLevelText>Level: {student.level}</ClassLevelText>
                            </ClassContentLevel>
                            
                        </ClassInfo>
                    </ClassCard>


                </MainView>
            </Modal>
        )
    }
}

InformationUserBasic.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func,
    student: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        dod: PropTypes.string,
        avatar:PropTypes.string,
        level: PropTypes.string
      })
}

InformationUserBasic.defaultProps = {
    closeModal: () => null
}

export default InformationUserBasic;
