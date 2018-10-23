import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from './app/store/configureStore.js';
import Expo, { AppLoading } from 'expo';
import HomeScreen from './app/containers/homeContainer.js';
import FeedbackScreen from './app/containers/feedbackContainer.js';
import fullMenuContainer from './app/containers/fullMenuContainer.js';
import suggestMenuContainer from './app/containers/suggestMenuContainer.js';
// import CustomHeader from './app/components/customHeader.js';
// import { Icon, Button, Container, Header, Content, Left, Right } from 'native-base'

// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Home Screen</Text>
//         <TouchableOpacity
//           onPress={() =>
//             this.props.navigation.navigate('Details', { name: 'rajesh' })
//           }
//         >
//           <Text>
//               DetailsScreen
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }
//

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title:"Details"
  };
  render() {
    return (
      <View style={{paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,flexDirection:'column',justifyContent:"center",alignItems:"center"}}>
        <Text>DetailsScreen</Text>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Home")}}>
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Feedback: FeedbackScreen,
    Details: DetailsScreen,
    FullMenu: fullMenuContainer,
    SuggestMenu: suggestMenuContainer
  },
  {
    initialRouteName: 'Home',
  }
);

const MyApp = createDrawerNavigator({

  Home: {
    screen: RootStack,
  },
  FullMenu:{
    screen: fullMenuContainer
  },
  SuggestMenu:{
    screen: suggestMenuContainer
  },
  Details: {
    screen: DetailsScreen
  },
  Contact: {
    screen: DetailsScreen
  },
  About: {
    screen: DetailsScreen
  }

});

  // const CustomDrawerContentComponent = (props) => (
  //
  //   <Container>
  //     <Header style={styles.drawerHeader}>
  //       <Body>
  //         <Image
  //           style={styles.drawerImage}
  //           source={require('./assets/DrawerIcons/Unsure-Programmer-Logo.png')} />
  //       </Body>
  //     </Header>
  //     <Content>
  //       <DrawerItems {...props} />
  //     </Content>
  //
  //   </Container>
  //
  // );

export default class App extends React.Component {
  constructor(props){
    super(props)
  }
    async componentWillMount() {
     await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    })
   }
  render() {
    const initialState = window.___INTITIAL_STATE__;
    var { store, persistor } = configureStore(initialState);
    return (
        <Provider store={store}>
          <PersistGate loading={<Expo.AppLoading />} persistor={persistor}>
            <MyApp />
          </PersistGate>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
