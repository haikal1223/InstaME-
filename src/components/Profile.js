import React, { Component } from 'react'
import { View, Platform, ScrollView, Image, TouchableOpacity } from 'react-native'
import { ListItem, Header, Button} from 'react-native-elements'
import { connect } from 'react-redux'
import {editProfileInit} from '../actions'
import { Card, CardItem} from 'native-base'
import firebase from '@firebase/app'
import "@firebase/auth"
import '@firebase/database'
import _ from 'lodash'
import {editPostInit} from '../actions'

class Profile extends Component { 
    state = {
        postList: []
    }

    componentDidMount() {
        firebase.database().ref('/post')
        .on('value', snapshot => {
            // console.log(snapshot.val())
            var postList = []
            _.map(snapshot.val(), (val,id) => {
                if(this.props.user.user.uid === val.userId) {
                    postList.push({...val, id})
                    this.setState({postList})
                    console.log(postList)
                    // console.log(this.state.postListUser)
                }
                    
            })
        })
    }

    

    renderListPhoto = () => {
        return this.state.postList.map((val, index) => {
            return (  

                    <TouchableOpacity style={{padding: 1, width: '33.3%'}} onPress={() => this.onPressDetail(index)}>
                        <Image style={{width: '100%' , height: 100,  }} source={{uri:val.imageURL}}  />
                    </TouchableOpacity>
                                
            )
        })
    }

    onPressDetail = (index) => {
        var idPost = this.state.postList[index].id
        var Image = this.state.postList[index].imageURL
        var caption = this.state.postList[index].caption
        
        console.log(Image)
        this.props.editProfileInit(
            this.props.user.user.displayName,
            this.props.user.user.photoURL
            );
        this.props.editPostInit(idPost,Image,caption)
        this.props.navigation.navigate('PostDetail')
    }

    onBtnEditProfilePress = () => {
        this.props.editProfileInit(
            this.props.user.user.displayName,
            this.props.user.user.photoURL
            );
            this.props.navigation.navigate('EditProfile')
    }
    render() {


        if(this.props.user) {
            return (
                <View>
                    <Header
                        leftComponent={{ 
                            text: this.props.user.user.displayName,
                            style: {color: 'black', fontSize: 18}
                         }}
                         leftContainerStyle={{ flex: 3}}
                        rightComponent={{
                            icon: 'menu',
                            color: 'black',
                            onPress: ()=> this.props.navigation.toggleDrawer()
                     }}
                        containerStyle={{
                            backgroundColor: `#fff`,
                            justifyContent: 'space-around',
                            marginTop: Platform.OS === 'ios' ? 0: -25
                        }}
                    />
                <ScrollView>
                    <ListItem
                        leftAvatar={{
                        source: { uri: this.props.user.user.photoURL },
                                     }}
                        title={this.props.user.user.displayName}
                        subtitle={'InstaME! User'}
                        />
                    <Button
                        
                        title='Edit Profile'
                        containerStyle={{marginTop: 15, marginHorizontal: 15}}
                        buttonStyle={{borderColor: 'black'}}
                        titleStyle={{color:'black'}}
                        type='outline'
                        onPress={this.onBtnEditProfilePress}
                    />
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1, marginVertical:10}}>
                              {this.renderListPhoto()}       
                    </View>
                 
                </ScrollView>
                </View>
            )
        }
        return <View/>
    }
}

const mapStateToProps = ({auth, editPost}) => {
    return {
        user: auth.user,
        idPost: editPost.idPost,
        postImage: editPost.postImage,
        caption: editPost.caption
    }
}

export default connect(mapStateToProps,{editProfileInit,editPostInit})(Profile)