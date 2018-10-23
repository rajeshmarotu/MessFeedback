import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";



class FeedbackItem extends Component {
  constructor(props){
    super(props)
    this.state={
      text:""
    }
  }
  didIUpvote(doc,item,user){
    return Object.keys(doc[item]).indexOf(user)!=-1;
    // backgroundColor:this.didIUpvote(feedback[key],"upvotes","c1cWG2v24am4uNWLBERM")==true?"red":"#cdcdcd"
  }
    render() {
      const {feedback, upvoteFeedback, removeFeedback, itemid, index, key} = this.props;
      console.log(feedback);
        return (
          <View  key={index} style={{marginLeft:"4%",marginRight:"4%",marginBottom:"2%",marginTop:"2%"}}>
            <TouchableOpacity
              style={{flex:0.8,paddingHorizontal:"5%",paddingVertical:"2%",backgroundColor:'orange'}}
              onPress={
                () => {
                      removeFeedback("ysmjkYIXumzbHCOCfRaz",itemid,key)
                    }
              }
            >
              <Text>{feedback[key]["review"]}</Text>
              <Text>{feedback[key]["timestamp"]} days ago</Text>
            </TouchableOpacity>
            <View style={{flex:0.2,flexDirection:"row",backgroundColor:'#cdcdcd'}}>
              <TouchableOpacity  onPress={async ()=>{await upvoteFeedback("ysmjkYIXumzbHCOCfRaz",itemid,key,"c1cWG2v24am4uNWLBERM"); }} style={{flex:0.3,alignSelf:"center",justifyContent:'center',alignItems:"center",paddingHorizontal:"5%",paddingVertical:"3%",}}>
                <Text style={{color:this.didIUpvote(feedback[key],"upvotes","c1cWG2v24am4uNWLBERM")==false?'black':"orange"}}>Upvote</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={async ()=>{await upvoteFeedback("ysmjkYIXumzbHCOCfRaz",itemid,key,"c1cWG2v24am4uNWLBERM"); }} style={{flex:0.3,alignSelf:"center",justifyContent:'center',alignItems:"center",paddingHorizontal:"5%",paddingVertical:"3%"}}>
                <Text style={{color:this.didIUpvote(feedback[key],"downvotes","c1cWG2v24am4uNWLBERM")==false?'black':"orange"}}>Downvote</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
}
export default FeedbackItem;
