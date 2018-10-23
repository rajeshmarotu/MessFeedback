import db from './firebase.js';
import { loadFeedback } from './index.js';
export const addFeedback = (orgid,itemid,userid,review) =>{
  return (dispatch)=>{
    console.log(itemid);
    var dbRef = db.collection("reviews").doc(orgid);

    db.runTransaction((t)=>{
      return t.get(dbRef).then(async (snap)=>{
          if(!snap.exists) return;
          var data,reviews;

          var date= new Date().getTime();
          var id = userid+"-"+date;
          if(!snap.get(itemid)){
            console.log("Not exists");
            data={}
            data["upvotes"]={}
            data["downvotes"]={}
            data["reviews"]={}
            data["reviews"][id]={
              "review":review,
              "timestamp":date,
              "upvotes":{
              },
              "downvotes":{
              }
            }
            await t.update(dbRef,{[itemid]:data});
          }else{
            data=snap.get(itemid);
            console.log("Exists!");
            data["reviews"][id]={
              "review":review,
              "timestamp":date,
              "upvotes":{
              },
              "downvotes":{
              }
            }
            await t.update(dbRef,{[itemid+'.reviews']:data['reviews']});
          }


          dispatch({
                type:"ADD_FEEDBACK",
                payload:{
                  reviews:data['reviews']
                }
          })
      })
    })
  }

}
export const removeFeedback = (orgid,itemid,reviewid) =>{
  return (dispatch)=>{
    var dbRef = db.collection("reviews").doc(orgid);

    db.runTransaction((t)=>{
      return t.get(dbRef).then((snap)=>{
          if(!snap.exists) return;
          var data = snap.get(itemid);
          var reviews = data["reviews"]
          var date= new Date().getTime();
          delete reviews[reviewid]
          t.update(dbRef, {[itemid+".reviews"]:reviews});
          dispatch({
                type:"DELETE_FEEDBACK",
                payload:{
                  reviews
                }
          })
      })
    })
  }
}

// export const upvoteItem = (orgid,itemid,userid) =>{
//   return (dispatch)=>{
//     var dbRef = db.collection("reviews").doc("ysmjkYIXumzbHCOCfRaz");
//     db.runTransaction((t) => {
//       return t.get(dbRef).then((snap)=>{
//         if(!snap.exists) return;
//         var data = snap.get(itemid)
//       })
//     })
//
//   }
// }
export const upvoteItem = (orgid,item,userid) =>{
  return (dispatch)=>{
    console.log(orgid,item,userid);
    var dbRef = db.collection("reviews").doc("ysmjkYIXumzbHCOCfRaz");
    // var upvotesRef = dbRef.collection(itemid).doc('upvotes');
    db.runTransaction((t)=>{
      return t.get(dbRef).then((snap)=>{
          if(!snap.exists) return;
          var snapdata=snap.data()
          var data = snapdata[item['name']];
          console.log(data);
          var upvoteIds = Object.keys(data['upvotes']);
          var downvoteIds = Object.keys(data["downvotes"]);
          update={}
          update[item['name']]=data;
          if(upvoteIds.indexOf(userid)==-1){
            if(downvoteIds.indexOf(userid!=-1)){
              delete snapdata[item['name']]["downvotes"][userid];
            }
            var obj={}
            obj[`${userid}`]=true;
            var newUpvotesData= Object.assign(obj, snapdata[item['name']]['upvotes'])
            snapdata[item['name']]['upvotes']=newUpvotesData;
            t.update(dbRef,{[item['name']+".upvotes"]:newUpvotesData,[item['name']+".downvotes"]:snapdata[item['name']]['downvotes']});

          }else{
            delete snapdata[item['name']]['upvotes'][userid]
            t.update(dbRef,{[item['name']+".upvotes"]:snapdata[item['name']]['upvotes']});
          }
          dispatch({
                type:"UPVOTE_ITEM",
                payload:{
                  data:snapdata
                }
          });
      })
    })
  }
}

export const downvoteItem = (orgid,itemid,userid) =>{
  return (dispatch)=>{
    var dbRef = db.collection("reviews").doc("ysmjkYIXumzbHCOCfRaz");
    db.runTransaction((t)=>{
      return t.get(dbRef).then((snap)=>{
          if(!snap.exists) return;
          var data = snap.get(itemid);
          var upvotesData = data["upvotes"];
          var downvotesData = data["downvotes"];
          var upvoteIds = Object.keys(upvotesData);
          var downvoteIds = Object.keys(downvotesData);
          update={}
          update[itemid]=data;
          if(downvoteIds.indexOf(userid)==-1){
            if(upvoteIds.indexOf(userid!=-1)){
              delete upvotesData[userid];
            }
            var obj={}
            obj[`${userid}`]=true;
            var newDownvotesData= Object.assign(obj,downvotesData)
            t.update(dbRef,{[itemid+".downvotes"]:newDownvotesData,[itemid+".upvotes"]:upvotesData});

          }else{
            delete data['downvotes'][userid];
            delete downvotesData[userid];
            t.update(dbRef,{[itemid+".downvotes"]:downvotesData});
          }
          dispatch({
                type:"DOWNVOTE_ITEM",
                payload:{
                  data
                }
          });
      })
    })
  }
}

/*
  Upvote feedback
*/

export const upvoteFeedback = (orgid,itemid,feedbackid,userid) =>{

  return (dispatch)=>{
    console.log(feedbackid);
    var dbRef = db.collection("reviews").doc("ysmjkYIXumzbHCOCfRaz");
    db.runTransaction((t)=>{
      return t.get(dbRef).then((snap)=>{
          if(!snap.exists) return;
          var itemdata = snap.get(itemid);
          var data = itemdata["reviews"][feedbackid];
          var upvotesData = data["upvotes"];
          var downvotesData = data["downvotes"];
          var upvoteIds = Object.keys(upvotesData);
          var downvoteIds = Object.keys(downvotesData);
          if(upvoteIds.indexOf(userid)==-1 || upvoteIds.length==0 ){
            if(downvoteIds.indexOf(userid)!=-1){
              delete downvotesData[userid];
            }
            var obj={}
            obj[`${userid}`]=true;
            var newUpvotesData= Object.assign(obj,upvotesData)
            itemdata["reviews"][feedbackid]['upvotes']=newUpvotesData;
            t.update(dbRef,{[itemid+".reviews."+feedbackid+".upvotes"]:newUpvotesData,[itemid+".reviews."+feedbackid+".downvotes"]:downvotesData});

          }else{
            delete itemdata["reviews"][feedbackid]['upvotes'][userid];
            delete upvotesData[userid];
            t.update(dbRef,{[itemid+".reviews."+feedbackid+".upvotes"]:upvotesData});
          }


          dispatch({
               type:"UPVOTE_FEEDBACK",
               payload:{
                  feedback:itemdata["reviews"]
               }
          })
      })
    })
  }
}

export const downvoteFeedback = (orgid,itemid,feedbackid,userid) =>{

  return (dispatch)=>{
    console.log(feedbackid);
    var dbRef = db.collection("reviews").doc("ysmjkYIXumzbHCOCfRaz");
    db.runTransaction((t)=>{
      return t.get(dbRef).then((snap)=>{
          if(!snap.exists) return;
          var itemdata = snap.get(itemid);
          console.log(itemdata);
          // console.log(feedbackid);
          var data = itemdata["reviews"][feedbackid];
          var upvotesData = data["upvotes"];
          var downvotesData = data["downvotes"];
          var upvoteIds = Object.keys(upvotesData);
          var downvoteIds = Object.keys(downvotesData);
          // update={}
          // update[itemid]=data;
          if(downvoteIds.indexOf(userid)==-1 || downvoteIds.length==0 ){
            if(upvoteIds.indexOf(userid)!=-1){
              delete upvotesData[userid];
              // dbRef.update({
              //   [feedbackid+'.downvotes']:downvotesData
              // })
            }
            var obj={}
            obj[`${userid}`]=true;
            var newDownvotesData= Object.assign(obj,downvotesData)
            itemdata["reviews"][feedbackid]['downvotes']=newDownvotesData;
            // t.update(dbRef,{[itemid+".reviews."+feedbackid+".downvotes"]:newDownvotesData});
            t.update(dbRef,{[itemid+".reviews."+feedbackid+".downvotes"]:newDownvotesData,[itemid+".reviews."+feedbackid+".upvotes"]:upvotesData});

          }else{
            delete itemdata["reviews"][feedbackid]['downvotes'][userid];
            delete downvotesData[userid];
            t.update(dbRef,{[itemid+".reviews."+feedbackid+".downvotes"]:downvotesData});
          }


          dispatch({
               type:"DOWNVOTE_FEEDBACK",
               payload:{
                  feedback:itemdata["reviews"]
               }
          })
      })
    })
  }
}

export const clearFeedbackstate = () => {
  return (dispatch)=>{
    console.log("clearing clearFeedbackstate");
    dispatch({
      type:'CLEAR_FEEDBACK'
    })
  }
}
