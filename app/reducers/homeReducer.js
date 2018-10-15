import * as actionTypes from '../actions/actionTypes.js';
const default_state={
  menu:{},
  feedback:{},
  status:false
}
export default function homeReducer(state=default_state,action){

  switch(action.type){
    case actionTypes.LOAD_MENU:
      return {...state,menu:action.payload }
    case actionTypes.LOAD_FEEDBACK:
      return {...state,feedback:action.payload.feedback }
    case "ADD_FEEDBACK":
      return {...state,feedback:action.payload.reviews}
    case "DELETE_FEEDBACK":
      return {...state,feedback:action.payload.reviews}
    case "UPVOTE_FEEDBACK":
      var feedbackData=action.payload.feedback;
      var id = action.payload.feedbackid;
      var type = action.payload.type;
      return {...state}
    default:
      return state;
  }
}
