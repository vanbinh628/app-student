import React, {PureComponent} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const BACK_ARROW = require('../../../assets/icons/white-back-arrow.png');

const MainView = styled.View`
    flex-direction: row;
    width: 100%;
    height: 56px;
    background-color: #6DCFF6;
    align-items: center;
    justify-content: center;
    position: relative;
`

const ActionBarTitle = styled.Text`
    font-size: 16px;
    color: #FFF;
    font-weight: bold;
`

const BackButton = styled.TouchableOpacity`
    width: 56px;
    height:56px;
    position: absolute;
    justify-content: center;
    align-items: center;
    left: 5px;
`
const BackButtonImage = styled.Image``

class ActionBar extends PureComponent {
    render() {
        const {
            showBackButton,
            onBackPress,
            title
        } = this.props;

        return (
                <MainView>
                    {
                        showBackButton &&
                        <BackButton onPress={onBackPress}>
                            <BackButtonImage source={BACK_ARROW}/>
                        </BackButton>
                    }
                    <ActionBarTitle>
                        {title}
                    </ActionBarTitle>
                </MainView>
        )
    }
}

ActionBar.propTypes = {
    title: PropTypes.string,
    showBackButton: PropTypes.bool,
    onBackPress: PropTypes.func
}

ActionBar.defaultProps = {
    title: "",
    showBackButton: false,
    onBackPress: () => null,
}

export default ActionBar;