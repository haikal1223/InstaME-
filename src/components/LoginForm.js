import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Icon, Button} from 'react-native-elements'
import {StackActions, NavigationActions} from 'react-navigation'
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {
    emailLoginChanged,
    passwordLoginChanged,
    loginUser
} from '../actions/LoginActions'

class LoginForm extends Component {
    state = {
        passHidden: true
    }

    componentDidUpdate() { //akan jalan saat ada perubahan state atau props di component ini// jalan saat render jalan
        if(this.props.user) {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'MainMenu'})],
            });
            this.props.navigation.dispatch(resetAction)
        }
    }

    onBtnLoginPress=() => {
        this.props.loginUser(
            this.props.email,
            this.props.password
        )        
        
        }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{marginBottom: 15}}>
                    <Text style={{color: 'red'}}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    render() {
   const { containerStyle, inputStyle, buttonStyle } = styles
        if(this.props.checkedAuth && !this.props.user) {
            return (
                <View style={containerStyle}>
                    <Animatable.Text animation={'fadeInDown'} >
                        <Text h3 h3Style={{color: '#4388d6'}}>InstaME!</Text>
                    </Animatable.Text>
                <Animatable.View   style={inputStyle}>
                    <Input 
                    placeholder='Email' 
                    leftIcon={<Icon name='email' size={24} color='#4388d6'/>} 
                    value={this.props.email}
                    onChangeText={(text)=> this.props.emailLoginChanged(text)}
                    />
                    
                    <Input secureTextEntry={this.state.passHidden} placeholder='Password' 
                    leftIcon={ <Icon name='lock' size={24} color='#4388d6' />}
                    rightIcon={ <Icon name={this.state.passHidden ?'visibility-off' : 'visibility'} size={24} color={this.state.passHidden ? '#bfc3c9' : '#4388d6' } onPress={()=> this.setState({passHidden: !this.state.passHidden})} />} 
                    value={this.props.password}
                    onChangeText={(text) => this.props.passwordLoginChanged(text)}
                    />
                 </Animatable.View>
                 {this.renderError()}
                <Button
                containerStyle={buttonStyle}
                icon={<Icon name='vpn-key' 
                size={20} 
                color="white" />} 
                title="Login" 
                type='solid'
                loading={this.props.loading}
                onPress={this.onBtnLoginPress}
                />
    
                <Button 
                containerStyle={buttonStyle} 
                icon={<Icon name="account-circle" size={20} color="#4388d6" />} 
                title="Register" 
                type='outline'
                onPress={()=> this.props.navigation.navigate('Register')}/>
    
                </View>
            )
        };
        return (
            <View style={containerStyle}>
                <Animatable.Text animation={'bounce'} iterationCount={'infinite'}>
                    <Text h3 h3Style={{color: '#4388d6'}}> Authenticating</Text>
                </Animatable.Text>
            </View>
        )
    } //
}

const styles = StyleSheet.create({
        containerStyle: {
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems:'center',
            height: '100%',
            padding : 10
        },
        inputStyle: {
            marginBottom: 15,
            marginTop:15,
            width: '100%'
        },
        buttonStyle: {
            marginBottom: 10,
            width: '95%'
        }
})

const mapStateToProps = ({loginForm, auth}) => {
    return {
        email: loginForm.email,
        password: loginForm.password,
        loading: loginForm.loading,
        error: loginForm.error,
        user: auth.user,
        checkedAuth: auth.checkedAuth
    }
}

export default connect(mapStateToProps, { 
    emailLoginChanged,
    passwordLoginChanged,
    loginUser})
    (LoginForm)