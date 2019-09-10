import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RegisterReducer from './RegisterReducer';
import LoginReducer from './LoginReducer'
import editProfileReducer from './EditProfileReducer'
import editPostReducer from './EditPostReducer'
export default combineReducers({
    auth: AuthReducer,
    registerForm: RegisterReducer,
    loginForm: LoginReducer,
    editProfile: editProfileReducer,
    editPost: editPostReducer
});