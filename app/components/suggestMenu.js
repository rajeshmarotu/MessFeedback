import React,{ Component } from 'react'
import { StatusBar,View, Text, TextInput, TouchableOpacity, List,ListItem, FlatList, ListView, ScrollView, Keyboard, Dimensions, StyleSheet, Platform, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
// import Tts from 'react-native-tts';
import Expo from 'expo';

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

class SubMenu extends Component{
  constructor(props){
    super(props)
    this.state={
      text:"text",

    }
  }

  addItem(day,time){
    var inputs = this.state.inputs[day][time]["items"];
    inputs.push(<TextInput  key={inputs.length}
        style={{height: 30, borderColor: 'gray', borderWidth: 1,marginLeft:20,marginRight:20,marginBottom:10}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />)
    this.setState({inputs:{...this.state.inputs,day:{...this.state.inputs.day,time:{"items":inputs}}}});
  }
  render(){
    var { day,time,data } = this.props;
    console.log(data);
    return(
      <View style={{flex:1,flexDirection:'column',marginBottom:15}}>
        <Text style={{alignSelf:"flex-start",fontSize:18,marginLeft:20,marginBottom:5}}>{time}</Text>

          {
            data["items"].length==0 ? (
              <View>
              <TouchableOpacity onPress={()=>{this.addItem(day,time)}} style={{marginLeft:20,marginRight:20,marginBottom:10,backgroundColor:"#cdcdcd"}}>
                <Text>+ Add item</Text>
              </TouchableOpacity>
              {
                this.state.inputs[day][time]["items"].length!=0 &&this.state.inputs[day][time]["items"].map((item,index)=>{
                  return(
                    item
                  )
                })
              }
              </View>
            ) : (
              data["items"].map((item,index)=>{
                return(
                  <View key={index} style={{marginLeft:20,marginRight:20,marginBottom:10}}>
                    <Text>item["name"]</Text>
                  </View>
                )
              })
            )
          }
      </View>
    )
  }
}
export default class suggestMenu extends Component{

  constructor(props){
    super(props);
    this.state={
      load:false,
      day:"0",
      text:"text",
      inputs:{
        "0":{
          "Breakfast":{
            "items":[

            ]
          },
          "Lunch":{
            "items":[

            ]
          },
          "Dinner":{
            "items":[

            ]
          }
        }
      },
      data:{
        "0":{
          "Breakfast":{
            "items":[

            ]
          },
          "Lunch":{
            "items":[

            ]
          },
          "Dinner":{
            "items":[

            ]
          }
        }
      }
    }
  }
  static navigationOptions = {
    title: 'SugestMenu',
  };
  setDay(day){
    if(!(day in this.state.data)){
      var data=this.state.data;
      var inputs=this.state.inputs;
      data[day]={
        "Breakfast":{
          "items":[

          ]
        },
        "Lunch":{
          "items":[

          ]
        },
        "Dinner":{
          "items":[

          ]
        }
      }
      inputs[day]={
          "Breakfast":{
            "items":[

            ]
          },
          "Lunch":{
            "items":[

            ]
          },
          "Dinner":{
            "items":[

            ]
        }
      }
      var modifiedData=data;
      var modifiedInputs=inputs;
      this.setState({data:modifiedData,inputs:modifiedInputs,day:day})
    }
    this.setState({day:day})
  }

  updateItem(text,day,time,index){
      var data = this.state.data[day][time]["items"];
      data.map((key,i)=>{
        if(i==index){
          key.name=text;
          key.timestamp=143535435;
        }
      })
      var modifiedData=data;
    this.setState({data:{...this.state.data}});
  }
  addItem(day,time){
    var inputs = this.state.inputs[day][time]["items"];
    var data = this.state.data[day][time]["items"];

    if(inputs.length<5){
      data.push({
        "name":"",
        "timestamp":155653667
      });
      inputs.push(<TextInput  key={inputs.length}
          underlineColorAndroid="transparent"
          style={{height: 30, borderColor: 'gray', borderWidth: 1,marginLeft:20,marginRight:20,marginBottom:10}}
          onChangeText={(text) =>{this.updateItem(text,day,time,inputs.length)}}
          value={this.state.data[day][time]["items"][inputs.length]["name"]}
        />)
        //this.setState({data:{...this.state.data,day:{...this.state.data.day,time:{"items":data}}}});
        this.setState({inputs:{...this.state.inputs,day:{...this.state.inputs.day,time:{"items":inputs}}}});
    }
    else{
      alert("reached limit!")
    }

  }

  render(){
    var { navigation, uploadSuggestedMenu } = this.props;

    return(
      <View style={{
        paddingBottom:'1%',
        paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
        flex:1,
        flexDirection:'column',
      }}>
        <View style={{flex:0.1,flexDirection:'row',marginLeft:20,marginRight:20,marginBottom:10}}>
          <TouchableOpacity onPress={()=>{this.setDay("0")}} style={{flex:0.14,backgroundColor:this.state.day=="0"?"#cdcdcd":"orange",justifyContent:"center",alignItems:"center"}}>
            <Text style={{alignSelf:"center"}}>S</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.setDay("1")}} style={{flex:0.14,backgroundColor:this.state.day=="1"?"#cdcdcd":"orange",justifyContent:"center",alignItems:"center"}}>
            <Text style={{alignSelf:"center"}}>M</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.setDay("2")}} style={{flex:0.14,backgroundColor:this.state.day=="2"?"#cdcdcd":"orange",justifyContent:"center",alignItems:"center"}}>
            <Text style={{alignSelf:"center"}}>T</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.setDay("3")}} style={{flex:0.14,backgroundColor:this.state.day=="3"?"#cdcdcd":"orange",justifyContent:"center",alignItems:"center"}}>
            <Text style={{alignSelf:"center"}}>W</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.setDay("4")}} style={{flex:0.14,backgroundColor:this.state.day=="4"?"#cdcdcd":"orange",justifyContent:"center",alignItems:"center"}}>
            <Text style={{alignSelf:"center"}}>T</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.setDay("5")}} style={{flex:0.14,backgroundColor:this.state.day=="5"?"#cdcdcd":"orange",justifyContent:"center",alignItems:"center"}}>
            <Text style={{alignSelf:"center"}}>F</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.setDay("6")}} style={{flex:0.14,backgroundColor:this.state.day=="6"?"#cdcdcd":"orange",justifyContent:"center",alignItems:"center"}}>
            <Text style={{alignSelf:"center"}}>S</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{flex:0.8}}>
        {
            Object.keys(this.state.data[this.state.day]).map((key,index)=>{
              return(

                    <View key={index} style={{flex:1,flexDirection:'column',marginBottom:15}}>
                      <Text style={{alignSelf:"flex-start",fontSize:18,marginLeft:20,marginBottom:5}}>{key}</Text>

                        {
                          this.state.data[this.state.day][key]["items"].length==0 ? (
                            <View>
                            <TouchableOpacity onPress={()=>{this.addItem(this.state.day,key)}} style={{marginLeft:20,marginRight:20,marginBottom:10,backgroundColor:"#cdcdcd"}}>
                              <Text>+ Add item</Text>
                            </TouchableOpacity>
                            {
                              this.state.inputs[this.state.day]&&this.state.inputs[this.state.day][key]["items"].length!=0 &&this.state.inputs[this.state.day][key]["items"].map((item,index)=>{
                                return(
                                  item
                                )
                              })
                            }
                            </View>
                          ) : (
                              <View>
                                <TouchableOpacity onPress={()=>{this.addItem(this.state.day,key)}} style={{marginLeft:20,marginRight:20,marginBottom:10,backgroundColor:"#cdcdcd"}}>
                                  <Text>+ Add item</Text>
                                </TouchableOpacity>
                                  {
                                    this.state.data[this.state.day][key]["items"].map((item,index)=>{
                                      return(
                                        <TextInput  key={index}
                                            underlineColorAndroid="transparent"
                                            style={{height: 30, borderColor: 'gray', borderWidth: 1,marginLeft:20,marginRight:20,marginBottom:10}}
                                            onChangeText={(text) =>{this.updateItem(text,this.state.day,key,index)}}
                                            value={item["name"]}
                                          />
                                      )
                                    })
                                  }
                            </View>
                          )
                        }
                    </View>
              )
            })
        }
        </ScrollView>
        <TouchableOpacity onPress={()=>{console.log(this.state.data);uploadSuggestedMenu(this.state.data)}} style={{justifyContent:"center",alignItems:"center",flex:0.1,backgroundColor:"orange",marginLeft:20,marginRight:20,marginBottom:10}} >
            <Text>Suggest</Text>
        </TouchableOpacity>
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
