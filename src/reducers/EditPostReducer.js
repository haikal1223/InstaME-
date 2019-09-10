import {
EDIT_POST,
EDIT_POST_FAIL,
EDIT_POST_SUCCESS,
EDIT_POST_INIT,
CAPTION_POST_CHANGED
} from '../actions/types'

const INITIAL_STATE = {
    idPost: null,
    caption: '',
    postImage: null,
    loading: false,
    error:'',
    postUpdated: false,
    modalShow: false
}

export default (state = INITIAL_STATE, action) => {
        switch(action.type) {
            case EDIT_POST_INIT:
                return{...INITIAL_STATE, ...action.payload}
             default:
                    return state
        }
}