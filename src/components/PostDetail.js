import React,{ Component} from 'react'
import { View, Text, Image} from 'react-native'
import { connect } from 'react-redux'
class PostDetail extends Component {
    render(){
        return(
            <View style={{height:'auto'}}>
                <Text>{this.props.Caption}</Text>
                <View>
                <Image source={{uri: this.props.image}} style={{height:400, width: null, alignSelf:'stretch', resizeMode:'stretch'}} />
                {console.log(this.props.image)}
                </View>
            </View>
        )
    }
}

const mapStateToProps = ({editPost}) => {
    return{
        image: editPost.postImage,
        Caption: editPost.caption
    }
}
export default connect(mapStateToProps)(PostDetail)