import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import MainMenu from './MainMenu'

export default createAppContainer(createStackNavigator(
    {
        Login: {
            screen: LoginForm
        },
        Register: {
            screen: RegisterForm
        },
        MainMenu: {
            screen: MainMenu
        }
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }
));