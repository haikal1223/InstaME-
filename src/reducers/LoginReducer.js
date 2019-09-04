import {
    EMAIL_LOGIN_CHANGED,
    PASSWORD_LOGIN_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
 } from '../actions/types'

 const INITIAL_STATE = {
     email: '',
     password: '',
     loading: false,
     eror: ''
 };

 export default (state= INITIAL_STATE, action) => {
     switch (action.type) {
        case EMAIL_LOGIN_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_LOGIN_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            return { ...state, loading: false}
        case LOGIN_USER_FAIL:
            return {...state, error: action.payload, loading: false}
        default:
            return state

            
     }
 }