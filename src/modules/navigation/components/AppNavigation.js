import {createSwitchNavigator } from 'react-navigation';
import SwiperClass from '../../topic/components/ListTopicScreen';
import LoginScreenContainer from '../../security/containers/LoginScreenContainer';
import BottomMenuNavigation from './BottomMenuNavigation';
import RegisterContainer from '../../security/containers/RegisterContainer';
import ForgotPasswordContainer from '../../security/containers/ForgotPasswordContainer';
// import UserProfileEdit from '../../users/components/UserProfileEdit';

const AppNavigation = createSwitchNavigator({
    
    Login: LoginScreenContainer,
    //ChooseClass:SwiperClass,
    Home: BottomMenuNavigation,
    Register: RegisterContainer,
    ForgotPassword: ForgotPasswordContainer,
},
{
    navigationOptions: {
        header: null,
    }
}
);

export default AppNavigation;
