import React, { Component } from 'react'
import { View, Text, Platform, ScrollView, Image } from 'react-native'
import { Header } from 'react-native-elements'
import firebase from '@firebase/app'
import "@firebase/auth"
import '@firebase/database'
import _ from 'lodash'
import { CardItem, Thumbnail, Left, Body, Container,Card } from 'native-base';
class Home extends Component { 
    state = {
        postList: []
    }

    componentDidMount() {
        firebase.database().ref('/post')
        .on('value', snapshot => {
            // console.log(snapshot.val())
            var postList = []
            _.map(snapshot.val(), (val,id) => {
                firebase.database().ref(`/users/${val.userId}`)
                .once('child_added', (snapshot) => {
                    var value = snapshot.val()
                    // console.log(value)
                    postList.push({
                        ...val,
                        id,
                        username: value.displayName,
                        userPhoto: value.photoURL
                    })
                    this.setState({postList})
                    // console.log(this.state.postList)
                })
                // console.log(val)
                // console.log(id)
            })
        })
    }

    renderListPhoto = () => {
        return this.state.postList.map((val) => {
            return (

            <Card>
                <CardItem>
                    <Left>
                    <Thumbnail source={{uri: val.userPhoto}} />
                    <Body>
                        <Text>{val.username}</Text>
                    </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image style={{width: '100%', height: 300}} source={{uri:val.imageURL}} />
                </CardItem>
                <CardItem>
                    <Text>{val.caption}</Text>
                </CardItem>
            </Card>
            )
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>
               <Header
                    leftComponent={{ 
                        text: 'INSTAME!',
                        style: {color: 'black', fontSize: 18}
                     }}
                    leftContainerStyle={{ flex: 3}}
                    containerStyle={{
                        backgroundColor: `#fff`,
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0: -25
                    }}
                />
                <ScrollView>
                    {this.renderListPhoto()}
                </ScrollView>
            </View>
        )
    }
}

export default Home