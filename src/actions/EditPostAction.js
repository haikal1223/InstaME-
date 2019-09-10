import firebase from '@firebase/app'
import "@firebase/database"
import "@firebase/auth"
import "@firebase/storage"

import {
    EDIT_POST_INIT
}from './types'

export const editPostInit = (postId, postImage, caption) => {
    return{
        type: EDIT_POST_INIT,
        payload:{
            postId,
            postImage,
            caption,
        }
    }
}