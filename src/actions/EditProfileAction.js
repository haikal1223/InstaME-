import firebase from '@firebase/app'
import "@firebase/database"
import "@firebase/auth"
import "@firebase/storage"
import RNFetchBlob from 'react-native-fetch-blob'

import {
EDIT_PROFILE_INIT,
USERNAME_PROFILE_CHANGED,
MODAL_SHOW,
MODAL_CLOSE,
IMAGE_PROFILE_CHANGED,
EDIT_PROFILE_SUCCES,
LOGIN_USER_SUCCESS,
EDIT_PROFILE
} from './types'
export const editProfileInit = (username, profileImage) => {
    return{
        type: EDIT_PROFILE_INIT,
        payload: {
            username,
            profileImage
        }
    }
}

export const usernameEditProfileChanged = (text) => {
    return {
        type: USERNAME_PROFILE_CHANGED ,
        payload: text
    }
}

export const modalShowing = () => {
    return{
        type: MODAL_SHOW
    }
}


export const modalClosing = () => {
    return{
        type: MODAL_CLOSE
    }
}

export const ImageEditProfileChanged = (imgPath) => {
    return {
        type: IMAGE_PROFILE_CHANGED,
        payload: imgPath
    }
}

export const saveUpdateProfile = (username, profileImage) => {
    return (dispatch) => {
        dispatch({
            type: EDIT_PROFILE // untuk bikin loading jadi true
        })
        const { currentUser } = firebase.auth()
        if(profileImage) { // if ini kalo profile image berubah
            const image = profileImage
 
            const Blob = RNFetchBlob.polyfill.Blob
            const fs = RNFetchBlob.fs
            window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
            window.Blob = Blob
         
           
            let uploadBlob = null
            
            var randLetter= String.fromCharCode(65 + Math.floor(Math.random() * 26))
            var uniqid = randLetter + Date.now() + '.jpg'
        
            const imageRef = firebase.storage().ref('users').child(uniqid)
            let mime = 'image/jpg'
            fs.readFile(image, 'base64')    
              .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` })//convert image sebelum upload
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: mime })
              })
              .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()//process uploading disini, execute bila upload berhasil
              })
              .then((url) => {
                // URL of the image uploaded on Firebase storage
                 return currentUser.updateProfile({
                    displayName: username,
                    photoURL: url
                })
                .then(() => {
                  return  firebase.database().ref(`/users/${currentUser.uid}`)
                    .once('value',snapshot => {
                       var id = Object.keys(snapshot.val())[0]//get id
                      return firebase.database().ref(`/users/${currentUser.uid}/${id}`)
                       .set({
                           displayName: username,
                           photoURL: url
                       })    
                    })
                })
                .then(()=> {
                    dispatch({
                        type: EDIT_PROFILE_SUCCES
                    })
                    dispatch({
                        type: LOGIN_USER_SUCCESS,
                        payload: { user: currentUser}
                    })
                })
                .catch((error) => {
                    dispatch({
                        type: EDIT_PROFILE_FAIL,
                        payload: error.message

                    })
                })
                
              })
              .catch((error) => {
                console.log(error);
         
              })
        }else { // else nya kalo tidak berubah 
                currentUser.updateProfile({
                displayName: username
            })
            .then(() => {
              return  firebase.database().ref(`/users/${currentUser.uid}`)
                .once('value',snapshot => {
                   var id = Object.keys(snapshot.val())[0]//get id
                  return firebase.database().ref(`/users/${currentUser.uid}/${id}`)
                   .set({// delete pake remove
                       displayName: username,
                       photoURL: currentUser.photoURL
                   })    
                })
            }).then(() => {
                dispatch({
                    type: EDIT_PROFILE_SUCCES
                })
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: { user: currentUser}
                })
            })
            .catch((error)=> {
                dispatch({
                    type: EDIT_PROFILE_FAIL,
                    payload: error.message

                })
            })
        }
    }
}       