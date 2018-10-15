import React,{ Component } from 'react'
import { StatusBar,View, Text, TouchableOpacity, List,ListItem, FlatList, ListView, ScrollView, Keyboard, Dimensions, StyleSheet, Platform, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
// import Tts from 'react-native-tts';
import Expo from 'expo';

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;
// var windowHeight = Dimensions.get('window').height;
// var windowWidth = Dimensions.get('window').width;
// class DayMenu extends Component{
//   render(){
//     var { data } = this.props;
//     return(
//       <View>
//
//         {
//           Object.keys(data).map((key,index)=>{
//             return(
//               <View>
//                 <Text key={index}>{key}</Text>
//                 <SubMenu key={index} data={data[key]}/>
//               </View>
//             )
//           })
//         }
//       </View>
//     )
//   }
// }

class SubMenu extends Component{
  navigateToScreen(screenId,options){
      this.props.navigation.navigate(screenId, options);
  }
  render(){
    var { day, time, data, upvote } = this.props;
    return(
      <View style={{flex:1,flexDirection:'column',}}>
        <Text style={{alignSelf:"center"}}>{day,time}</Text>
        <ScrollView>
          {
            data["items"].map((item,index)=>{
              return(
                <View key={index} style={{width:windowWidth-40,height:windowHeight/4,marginLeft:20,marginRight:20,marginBottom:10}}>
                  <View style={{flex:1}}>
                    <View style={{flex:0.8,backgroundColor:'#cdcdcd',justifyContent:"center",alignItems:"center"}}>
                      <Text>{item}</Text>
                    </View>
                    <View style={{flex:0.2,backgroundColor:'orange',flexDirection:"row"}}>
                      <TouchableOpacity onPress={ () => upvote("ysmjkYIXumzbHCOCfRaz","v2aJAYiY3btUGFNaIaf7")} style={{flex:0.33,justifyContent:"center",alignItems:"center"}}>
                        <Text>Upvote</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>alert("Dislike")} style={{flex:0.33,justifyContent:"center",alignItems:"center"}}>
                        <Text>Downvote</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={ () => this.props.navigation.navigate('Feedback',{"item":item})} style={{flex:0.33,justifyContent:"center",alignItems:"center"}}>
                        <Text>Feedback</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}
export default class Home extends Component{

  constructor(props){
    super(props);
    this.state={
      load:false
    }
  }
  static navigationOptions = {
    title: 'MessReview',
  };
  componentDidMount(){
      this.props.loadMenu();
  }
  // changeStatus(loadMenu){
  //   loadMenu();
  //   this.setState({load:true})
  // }

  render(){
    var { menu, loadMenu, upvoteItems, navigation } = this.props;
    // if(!this.state.load){
    //   this.changeStatus(loadMenu)
    // }
    return(
      <View style={{
        paddingBottom:'1%',
        paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
        flex:1,
        flexDirection:'column',
      }}>

        {
          menu.length!=0 && Object.keys(menu["0"]).map((key,index)=>{
            return(
                  <SubMenu key={key} data={menu["0"][key]} day={0} time={key} upvote={upvoteItems} navigation={navigation}/>
            )
          })
        }
      </View>
    );
  }
}

var styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex:1,
        marginLeft:3
    },
    item: {
        margin: 3,
        padding:10,
        alignSelf:'center'
    },
});
