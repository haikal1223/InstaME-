import React,{ Component} from 'react'
import { View, Image} from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Header, Button} from 'react-native-elements'
import { CardItem, Thumbnail, Left, Body,Text,Card } from 'native-base';
import firebase from '@firebase/app'
import "@firebase/database"
class PostDetail extends Component {
    onRemoveButtonPress = () => {
        firebase.database().ref(`/post/${this.props.userId}`).remove()
        .then(()=> {
            this.props.navigation.navigate('Profile')
        })
    }
    render(){
        return(
            <View>
                   <Header
                        placement='left'
                        leftComponent={{ 
                            icon:'keyboard-backspace',
                            color:'black',
                            onPress: () => this.props.navigation.goBack()

                         }}
                         centerComponent={{ 
                            text: 'Post',
                            style: {color: 'black', fontSize: 18, fontWeight:'bold'}
                         }}
                        containerStyle={{
                            backgroundColor: `#fff`,
                            justifyContent: 'space-around',
                            marginTop: Platform.OS === 'ios' ? 0: -25
                        }}
                    />
                    <View>
              <Card>
                <CardItem>
                    <Left>
                    <Thumbnail source={{uri: this.props.profileImage}} />
                    <Body>
                        <Text>{this.props.username}</Text>
                        <Text note>InstaME! Users</Text>
                        {/* <Text>{this.props.userId}</Text> */}
                    </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image style={{width: '100%', height: 300}} source={{uri:this.props.image}} />
                </CardItem>
                <CardItem>
                    <Text>{this.props.Caption}</Text>
                    <Button
                    title='Delete Post'
                    icon={{
                        name:'delete',
                        size:20,
                        color:'blue',
                        
                    }}
                    onPress= {this.onRemoveButtonPress}
                    containerStyle={{left:90}}
                    titleStyle={{color:'blue'}}
                    type='clear'
                /> 
                </CardItem>
            </Card>

                    </View>
            </View>
        )
    }
}

const mapStateToProps = ({editPost,editProfile}) => {
    return{
        userId: editPost.idPost,
        image: editPost.postImage,
        Caption: editPost.caption,
        profileImage: editProfile.profileImage,
        username: editProfile.username,
    }
}
export default connect(mapStateToProps)(PostDetail)