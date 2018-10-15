import db from './firebase.js';
import { loadFeedback } from './index.js';
export const addFeedback = (orgid,itemid,userid,review) =>{
  return (dispatch)=>{
    var dbRef = db.collection("reviews").doc(orgid);

    db.runTransaction((t)=>{
      return t.get(dbRef).then((snap)=>{
          if(!snap.exists) return;
          var data = snap.get(itemid)
          var date= new Date().getTime();
          var id = userid+"-"+date;
          var reviews = data["reviews"];
          reviews[id]={
            "review":review,
            "timestamp":date,
            "upvotes":{
            },
            "downvotes":{
            }
          }
          t.update(dbRef,{[itemid+".reviews"]:reviews});
          dispatch({
                type:"ADD_FEEDBACK",
                payload:{
                  reviews
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


export const upvoteItem = (orgid,itemid,userid) =>{
  return (dispatch)=>{
    var dbRef = db.collection("reviews").doc("ysmjkYIXumzbHCOCfRaz");
    var upvotesRef = dbRef.collection(itemid).doc('upvotes');
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
          if(upvoteIds.indexOf(userid)==-1){
            if(downvoteIds.indexOf(userid!=-1)){
              delete downvotesData[userid];
              dbRef.update({
                [itemid+'.downvotes']:downvotesData
              })
            }
            var obj={}
            obj[`${userid}`]=true;
            var newUpvotesData= Object.assign(obj,upvotesData)
            t.update(dbRef,{[itemid+".upvotes"]:newUpvotesData});

          }else{
            delete upvotesData[userid];
            t.update(dbRef,{[itemid+".upvotes"]:upvotesData});
          }
          dispatch({
                type:"UPVOTE_ITEM",
                payload:{
                  orgid,
                  itemid
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
              dbRef.update({
                [itemid+'.upvotes']:upvotesData
              })
            }
            var obj={}
            obj[`${userid}`]=true;
            var newDownvotesData= Object.assign(obj,downvotesData)
            t.update(dbRef,{[itemid+".downvotes"]:newDownvotesData});

          }else{
            delete downvotesData[userid];
            t.update(dbRef,{[itemid+".downvotes"]:downvotesData});
          }
          dispatch({
                type:"DOWNVOTE_ITEM",
                payload:{
                  orgid,
                  itemid
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
    var dbRef = db.collection("reviews").doc("ysmjkYIXumzbHCOCfRaz");
    db.runTransaction((t)=>{
      return t.get(dbRef).then((snap)=>{
          if(!snap.exists) return;
          var itemdata = snap.get("idly");
          var data = itemdata["reviews"][feedbackid];
          var upvotesData = data["upvotes"];
          var downvotesData = data["downvotes"];
          var upvoteIds = Object.keys(upvotesData);
          var downvoteIds = Object.keys(downvotesData);
          // update={}
          // update[itemid]=data;
          if(upvoteIds.indexOf(userid)==-1 || upvoteIds.length==0 ){
            if(downvoteIds.indexOf(userid)!=-1){
              delete downvotesData[userid];
              // dbRef.update({
              //   [feedbackid+'.downvotes']:downvotesData
              // })
            }
            var obj={}
            obj[`${userid}`]=true;
            var newUpvotesData= Object.assign(obj,upvotesData)
            t.update(dbRef,{[itemid+".reviews."+feedbackid+".upvotes"]:newUpvotesData});

          }else{
            delete upvotesData[userid];
            t.update(dbRef,{[itemid+".reviews."+feedbackid+".upvotes"]:upvotesData});
          }


          dispatch({
               type:"UPVOTE_FEEDBACK",
               payload:{
                  data:upvotesData,
                  feedbackid:feedbackid,
                  type:"upvotes"
               }
          })
      })
    })
    // var dbRef = db.collection("reviews").doc("ysmjkYIXumzbHCOCfRaz");
    // db.runTransaction((t)=>{
    //   return t.get(dbRef).then((snap)=>{
    //       if(!snap.exists) return;
    //       var data = snap.get();
    //       console.log(data);
    //       t.update(dbRef,{[feedbackid+".upvotes"]:{'hey':'man'}});
          // var upvotesData = data["upvotes"];
          // var downvotesData = data["downvotes"];
          // var upvoteIds = Object.keys(upvotesData);
          // var downvoteIds = Object.keys(downvotesData);
          // console.log(upvoteIds);
          // console.log(upvoteIds.indexOf(userid));
          // // update={}
          // // update[itemid]=data;
          // if(upvoteIds.indexOf(userid)==-1 || upvoteIds.length==0 ){
          //   console.log("if");
          //   if(downvoteIds.indexOf(userid)!=-1){
          //     delete downvotesData[userid];
          //     dbRef.update({
          //       [feedbackid+'.downvotes']:downvotesData
          //     })
          //   }
          //   var obj={}
          //   obj[`${userid}`]=true;
          //   var newUpvotesData= Object.assign(obj,upvotesData)
          //   t.update(dbRef,{[feedbackid+".upvotes"]:newUpvotesData});
          //
          // }else{
          //   console.log("else");
          //   delete upvotesData[userid];
          //   t.update(dbRef,{[feedbackid+".upvotes"]:upvotesData});
          // }
    //       dispatch({
    //             type:"UPVOTE_FEEDBACK",
    //             payload:{
    //               orgid,
    //               itemid
    //             }
    //       });
    //   })
    // })
  }
}
