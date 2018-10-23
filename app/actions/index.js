
import * as actionTypes from './actionTypes.js';
import db from './firebase.js';
// import * as firebase from 'firebase';
// var config = {
//     apiKey: "AIzaSyCo0Xmy79aVHTkNlVDTVP-8_zI5t-EX6JE",
//     authDomain: "bingo-195706.firebaseapp.com",
//     databaseURL: "https://bingo-195706.firebaseio.com",
//     projectId: "bingo-195706",
//     storageBucket: "bingo-195706.appspot.com",
//     messagingSenderId: "404894775012"
//   };
//
//   if (!firebase.apps.length) {
//     firebase.initializeApp(config);
//   }
//
// var rootRef = firebase.database();
// var gameRef = rootRef.ref('/data/games/');
// var userRef = rootRef.ref('/data/users/');
//import rootref from './firebase.js';

export const loadMenu = () => {

        return (dispatch)=>{
          console.log("hey");
          var dbRef = db.collection("menus").doc("ysmjkYIXumzbHCOCfRaz")

          dbRef.get().then((snap)=>{
            if(!snap.exists) return;

            var data=snap.data();
            console.log("--------------");
            console.log(data);
            dispatch({
              type:actionTypes.LOAD_MENU,
              payload:{
                  data
              }
            })
          })
        }

     //    return {
     //   type:actionTypes.LOAD_MENU,
     //   payload:{
     //             "0":{
     //                  "BF":{
     //                    "items":["item1","item2"],
     //                  },
     //                  "lunch":{
     //                    "items":["item1","item2"],
     //                  },
     //                  "dinner":{
     //                    "items":["item1","item2"],
     //                  }
     //                },
     //                "1":{
     //                     "BF":{
     //                       "items":["item3","item4"],
     //                     },
     //                     "lunch":{
     //                       "items":["item5","item6"],
     //                     },
     //                     "dinner":{
     //                       "items":["item2","item5"],
     //                     }
     //                   },
     //                "2":{
     //                    "BF":{
     //                      "items":["item1","item2"],
     //                    },
     //                    "lunch":{
     //                      "items":["item1","item2"],
     //                    },
     //                    "dinner":{
     //                      "items":["item1","item2"],
     //                    }
     //                  },
     //
     //   }
     // };

}

export const loadUpDownvotes = (orgid,itemid) => {
        return (dispatch) =>{
            console.log("looadinjfhh");
            var dbRef = db.collection("reviews").doc("ysmjkYIXumzbHCOCfRaz");
            dbRef.get().then((snap)=>{
                  if(!snap.exists) return;
                  var data;
                  data=snap.data();

                  dispatch({
                       type:"LOAD_UPDOWNVOTES",
                       payload:{
                         data
                      }
                  })
                });
}
}

export const loadFeedback = (orgid,itemid) => {
        return (dispatch) =>{
            console.log("looadinjfhh");
            var dbRef = db.collection("reviews").doc("ysmjkYIXumzbHCOCfRaz");
            dbRef.get().then((snap)=>{
                  if(!snap.exists) return;
                  var data,feedback;
                  if(!snap.get(itemid)){
                    console.log('not exists');
                    feedback={}
                  }else{
                    console.log("exists");
                    data = snap.get(itemid);
                    if(data.hasOwnProperty("reviews")){
                      feedback = data["reviews"];
                    }
                    else{
                      feedback={}
                    }
                  }
                  dispatch({
                       type:actionTypes.LOAD_FEEDBACK,
                       payload:{
                         feedback
                      }
                  })
                });
}
}

export const uploadSuggestedMenu = (menu) =>{
  console.log("Uploading sugestMenu");
  console.log(menu);
  // return{
  //   type:"UPLOAD_SUGGESTED_MENU",
  //   payload:{
  //     menu
  //   }
  // }
}
