import React,{ Component } from 'react'
import { StatusBar,View, Text, TouchableOpacity, List,ListItem, FlatList, ListView, ScrollView, Keyboard, Dimensions, StyleSheet, Platform, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
// import Tts from 'react-native-tts';
import Expo from 'expo';

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

class DayMenu extends Component{
  render(){
    var { data } = this.props;
    return(
      <View>

        {
          Object.keys(data).map((key,index)=>{
            return(

                <View style={{marginBottom:20}}>
                  <Text key={index} style={{fontSize:25}}>{index}</Text>
                  <SubMenu key={index} data={data[key]} day={this.props.day} time={this.props.time}/>
                </View>
            )
          })
        }
      </View>
    )
  }
}

class SubMenu extends Component{
  navigateToScreen(screenId,options){
      this.props.navigation.navigate(screenId, options);
  }
  render(){
    var { day,time,data } = this.props;
    return(
      <View style={{flex:1,flexDirection:'column',marginBottom:15}}>
        <Text style={{alignSelf:"flex-start",fontSize:18,marginLeft:20,marginBottom:5}}>{time}</Text>

          {
            data["items"].map((item,index)=>{
              return(
                <View key={index} style={{width:windowWidth-40,height:windowHeight/4,marginLeft:20,marginRight:20,marginBottom:10}}>
                  <View style={{flex:1}}>
                    <View style={{flex:0.8,backgroundColor:'#cdcdcd',justifyContent:"center",alignItems:"center"}}>
                      <Text>{item}</Text>
                    </View>
                    <View style={{flex:0.2,backgroundColor:'orange',flexDirection:"row"}}>
                      <TouchableOpacity onPress={()=>alert("like")} style={{flex:0.33,justifyContent:"center",alignItems:"center"}}>
                        <Text>Like</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>alert("Dislike")} style={{flex:0.33,justifyContent:"center",alignItems:"center"}}>
                        <Text>Dislike</Text>
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
      </View>
    )
  }
}
export default class fullMenu extends Component{

  constructor(props){
    super(props);
    this.state={
      load:false,
      day:"0"
    }
  }
  static navigationOptions = {
    title: 'fullMenu',
  };
  setDay(day){
    this.setState({day:day})
  }
  render(){
    var { menu, loadMenu, navigation } = this.props;
    if(Object.keys(menu).length==0){
      loadMenu();
    }
    console.log(menu)
    return(
      <View style={{
        paddingBottom:'1%',
        paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
        flex:1,
        flexDirection:'column',
      }}>
        <View style={{flex:0.1,flexDirection:'row',marginLeft:20,marginRight:20,marginBottom:10}}>
          <TouchableOpacity onPress={()=>{this.setDay("0")}} style={{flex:0.14,backgroundColor:"green",justifyContent:"center",alignItems:"center"}}>
            <Text style={{alignSelf:"center"}}>S</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.setDay("1")}} style={{flex:0.14,backgroundColor:"green",justifyContent:"center",alignItems:"center"}}>
            <Text style={{alignSelf:"center"}}>M</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.setDay("2")}} style={{flex:0.14,backgroundColor:"green",justifyContent:"center",alignItems:"center"}}>
            <Text style={{alignSelf:"center"}}>T</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.setDay("3")}} style={{flex:0.14,backgroundColor:"green",justifyContent:"center",alignItems:"center"}}>
            <Text style={{alignSelf:"center"}}>W</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.setDay("3")}} style={{flex:0.14,backgroundColor:"green",justifyContent:"center",alignItems:"center"}}>
            <Text style={{alignSelf:"center"}}>T</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.setDay("3")}} style={{flex:0.14,backgroundColor:"green",justifyContent:"center",alignItems:"center"}}>
            <Text style={{alignSelf:"center"}}>F</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.setDay("3")}} style={{flex:0.14,backgroundColor:"green",justifyContent:"center",alignItems:"center"}}>
            <Text style={{alignSelf:"center"}}>S</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{flex:0.9}}>
        {
            Object.keys(menu[this.state.day]).map((key,index)=>{
              return(
                    <SubMenu key={key} data={menu[this.state.day][key]} day={this.state.day} time={key} navigation={navigation}/>
              )
            })
        }
        </ScrollView>
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
