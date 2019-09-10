import React from 'react'
import { createDrawerNavigator, createAppContainer } from 'react-navigation'
import { Icon } from 'react-native-elements'
import Profile from './Profile'
import Settings from './Settings'
import EditProfile from './EditProfile'
import PostDetail from './PostDetail'

const DrawerNavigator = createAppContainer(createDrawerNavigator(
    {
        Profile: {
            screen: Profile,
            navigationOptions: {
                drawerLabel: ()=> null // buat profile ilang dari drawer
            }
        },
        Settings: {
            screen: Settings,
            navigationOptions: {
                drawerLabel:'Settings',
                drawerIcon: ({ tintcolor }) => (
                    <Icon name={'cog'} type='font-awesome' size={25} color={tintcolor} />
                )
            }
        },
        EditProfile: {
            screen: EditProfile,
            navigationOptions: {
                drawerLabel:() => null
            }
        },
        PostDetail: {
            screen: PostDetail,
            navigationOptions: {
                drawerLabel:() => null
            }
        }
    },
    {
        drawerBackgroundColor: '#fff',
        drawerPosition: 'right',
        drawerType: 'slide',
        overlayColor: 0,
        style: {
            borderWidth: 1,
            borderColor: '#cfcfcf'
        }
    }
));

export default DrawerNavigator