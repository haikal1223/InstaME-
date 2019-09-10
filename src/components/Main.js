import React from 'react'
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
            screen: ({ navigation }) => <MainMenu screenProps={{rootStackNavigator: navigation }} /> //rootStacknavigator bebas, screenprops wajib, navigation wajib
        }
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }
));