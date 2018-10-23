import React,{ Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, View, ListView, Text, Button, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import FeedbackItem from './feedbackItem.js';
export default class Feedback extends Component{
  constructor(props){
    super(props);
    this.state={
      load:false,
      itemid:this.props.navigation.state.params.item,
      text:"",
    }
  }
  static navigationOptions = {
    title: 'Feedback',
  };
  componentDidMount(){
    console.log("componentDidMount");
    this.props.loadFeedback("ysmjkYIXumzbHCOCfRaz",this.state.itemid)

  }
  componentWillUnmount(){
    this.props.clearFeedbackstate()
  }
  componentWillReceiveProps(nextProps){
    console.log("nextProps");
    // console.log(nextProps);
  }
  didIUpvote(doc,item,user){
    // console.log(Object.keys(doc[item]).indexOf(user)!=-1);
    // console.log(Object.keys(doc[item]).indexOf(user));
    return Object.keys(doc[item]).indexOf(user)!=-1;
    // backgroundColor:this.didIUpvote(feedback[key],"upvotes","c1cWG2v24am4uNWLBERM")==true?"red":"#cdcdcd"
  }
  render(){
    var { feedback,clearFeedbackstate,loadFeedback, downvoteFeedback,addFeedback, navigation, removeFeedback, upvoteFeedback } = this.props;
    // console.log("rendering feedback");
    console.log(feedback);

      return(
        <View style={{flex:1,flexDirection:"column"}}>
          <Text style={{alignSelf:"center"}}>
            {this.state.itemid}
          </Text>
          <ScrollView style={{flex:0.8}}>
            {
              Object.keys(feedback).length==0 && (
                <View style={{justifyContent:"center",alignItems:"center"}}>
                  <Text style={{marginTop:'30%'}}>No feedback found!</Text>
                </View>
              )
            }
            {
              Object.keys(feedback).length!=0 && Object.keys(feedback).map((key,index)=>{
                return(
                  <View  key={index} style={{marginLeft:"4%",marginRight:"4%",marginBottom:"2%",marginTop:"2%"}}>
                    <TouchableOpacity
                      style={{flex:0.8,paddingHorizontal:"5%",paddingVertical:"2%",backgroundColor:'orange'}}
                      onPress={
                        () => {
                              removeFeedback("ysmjkYIXumzbHCOCfRaz",this.state.itemid,key)
                            }
                      }
                    >
                      <Text>{feedback[key]["review"]}</Text>
                      <Text>{feedback[key]["timestamp"]} days ago</Text>
                    </TouchableOpacity>
                    <View style={{flex:0.2,flexDirection:"row",backgroundColor:'#cdcdcd'}}>
                      <TouchableOpacity  onPress={async ()=>{await upvoteFeedback("ysmjkYIXumzbHCOCfRaz",this.state.itemid,key,"c1cWG2v24am4uNWLBERM"); }} style={{flex:0.3,alignSelf:"center",justifyContent:'center',alignItems:"center",paddingHorizontal:"5%",paddingVertical:"3%",}}>
                        <Text style={{color:this.didIUpvote(feedback[key],"upvotes","c1cWG2v24am4uNWLBERM")==false?'black':"orange"}}>Upvote</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>downvoteFeedback("ysmjkYIXumzbHCOCfRaz",this.state.itemid,key,"c1cWG2v24am4uNWLBERM")} style={{flex:0.3,alignSelf:"center",justifyContent:'center',alignItems:"center",paddingHorizontal:"5%",paddingVertical:"3%"}}>
                        <Text style={{color:this.didIUpvote(feedback[key],"downvotes","c1cWG2v24am4uNWLBERM")==false?'black':"orange"}}>Downvote</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })
            }
          </ScrollView>
          <View style={{flex:0.2}}>
            <View style={{flex:1,flexDirection:'row',backgroundColor:'#cdcdcd'}}>
              <View style={{flex:0.8,paddingHorizontal:20,paddingVertical:10,marginLeft:15,marginRight:15,marginBottom:10,marginTop:10}}>
                <TextInput
                    style={{flex:1,color:'black'}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    placeholder={"Write your feedback"}
                  />
              </View>
              <TouchableOpacity style={{flex:0.2,justifyContent:"center",alignItems:'center'}}
                onPress={
                    ()=>{addFeedback("ysmjkYIXumzbHCOCfRaz",this.state.itemid,"v2aJAYiY3btUGFNaIaRL",this.state.text);this.setState({text:""})}}>
                <Text style={{alignSelf:"center"}}>
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )


  }
}
