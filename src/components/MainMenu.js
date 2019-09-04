import React from 'react'
import { createBottomTabNavigator } from 'react-navigation';
import Home from './Home'
import PostPhoto from './PostPhoto'
import Profile from './Profile'
import { Icon } from 'react-native-elements'

export default createBottomTabNavigator(
  {
    Home: Home,
    PostPhoto: PostPhoto,
    Profile: Profile
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
            iconName = 'home'
        } else if (routeName === 'PostPhoto') {
          iconName = `add-box`;
        } else if (routeName === 'Profile') {
                iconName='account-box'
        }

        return <Icon name={iconName} size={35} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#4388d6',
      inactiveTintColor: 'gray',
    },
  }
);