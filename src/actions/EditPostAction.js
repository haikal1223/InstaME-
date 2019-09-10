import firebase from '@firebase/app'
import "@firebase/database"
import "@firebase/auth"
import "@firebase/storage"

import {
    EDIT_POST_INIT
}from './types'

export const editPostInit = (idPost, postImage, caption) => {
    return{
        type: EDIT_POST_INIT,
        payload:{
            idPost,
            postImage,
            caption,
        }
    }
}