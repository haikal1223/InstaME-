import React, { Component } from 'react'
import { View, Platform } from 'react-native'
import { ListItem, Header} from 'react-native-elements'
import { connect } from 'react-redux'


class Profile extends Component { 
    render() {
        return (
            <View>
                <Header
                    leftComponent={{ 
                        text: this.props.user.user.displayName,
                        style: {color: 'black', fontSize: 18}
                     }}
                     leftContainerStyle={{ flex: 3}}
                    rightComponent={{ icon: 'menu', color: 'black' }}
                    containerStyle={{
                        backgroundColor: `#fff`,
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0: -25
                    }}
                />
                <ListItem
                    leftAvatar={{
                    source: { uri: this.props.user.user.photoURL },
                    showEditButton: true,
                                 }}
                    title={this.props.user.user.displayName}
                    subtitle={'InstaME! User'}
                    />
            </View>
        )
    }
}

const mapStateToProps = ({auth}) => {
    return {
        user: auth.user
    }
}

export default connect(mapStateToProps)(Profile)