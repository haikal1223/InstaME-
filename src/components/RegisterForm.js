import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Icon, Button} from 'react-native-elements'
import { connect } from 'react-redux'
import {StackActions, NavigationActions} from 'react-navigation'
import {
    emailRegisterChanged,
    usernameRegisterChanged,
    passwordRegisterChanged,
    conPasswordRegisterChanged,
    registerUser
} from '../actions'

class RegisterForm extends Component {
    state ={
        passHidden: true,
        conPassHidden: true
    }

    componentDidUpdate() { //akan jalan saat ada perubahan state atau props di component ini
        if(this.props.user) {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'MainMenu'})],
            });
            this.props.navigation.dispatch(resetAction)            
        }
    }
    
    onBtnRegisterPress=() => {
    this.props.registerUser(
        this.props.email,
        this.props.username,
        this.props.password,
        this.props.conPassword
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
        return (
            <View style={containerStyle}>
                <Text h3 h3Style={{color: '#4388d6'}}>Hi, Good To See You! </Text>
            <View style={inputStyle}>
                <Input 
                placeholder='Email'
                value={this.props.email} 
                leftIcon={<Icon name='email' 
                size={24} 
                color='#4388d6'/>} 
                onChangeText={(text)=> this.props.emailRegisterChanged(text)}
                />

                <Input placeholder='Username' 
                value={this.props.username} 
                leftIcon={<Icon name='account-box' 
                size={24} 
                color='#4388d6'/>}
                onChangeText={(text)=> this.props.usernameRegisterChanged(text)}
                />

                <Input secureTextEntry={this.state.passHidden} placeholder='Password' 
                value={this.props.password}
                leftIcon={<Icon name='lock' size={24} color='#4388d6' />}
                rightIcon={<Icon name={this.state.passHidden 
                    ?'visibility-off' 
                    : 'visibility'} 
                    size={24} 
                    color={this.state.passHidden
                        ? '#bfc3c9' 
                        : '#4388d6'} 
                        onPress={()=> this.setState({passHidden: !this.state.passHidden})} />} 
                onChangeText={(text)=> this.props.passwordRegisterChanged(text)}
                        
                />
                <Input secureTextEntry={this.state.conPassHidden} placeholder='Confirm Password' 
                value={this.props.conPassword}
                leftIcon={ <Icon name='lock' size={24} color='#4388d6' />}
                rightIcon={ <Icon name={this.state.conPassHidden ?'visibility-off' : 'visibility'} size={24} color={this.state.conPassHidden ? '#bfc3c9' : '#4388d6' } onPress={()=> this.setState({conPassHidden: !this.state.conPassHidden})} />} 
                onChangeText={(text)=> this.props.conPasswordRegisterChanged(text)}
                />
             </View>
             {this.renderError()}
                <Button
                containerStyle={buttonStyle} 
                icon={<Icon name="account-circle" size={20} color="white" />} 
                title="Register"
                loading={this.props.loading}
                onPress={this.onBtnRegisterPress}
                />
            </View>
        )
    }
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

const mapStateToProps = ({registerForm, auth}) => {
   return {
       email: registerForm.email,
       username: registerForm.username,
       password: registerForm.password,
       conPassword: registerForm.conPassword,
       loading: registerForm.loading,
       error: registerForm.error,
       user: auth.user
   }

}

export default connect(mapStateToProps,{
                        emailRegisterChanged,
                        passwordRegisterChanged,
                        usernameRegisterChanged,
                        conPasswordRegisterChanged,
                        registerUser
                    })(RegisterForm)