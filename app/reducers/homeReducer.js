import * as actionTypes from '../actions/actionTypes.js';
const default_state={
  menu:{},
  reviewsData:{},
  feedback:{},
  status:false
}
export default function homeReducer(state=default_state,action){

  switch(action.type){
    case "LOAD_UPDOWNVOTES":
      console.log('LOAD_UPDOWNVOTES');
      console.log(action.payload.data);
      return {...state,reviewsData:action.payload.data}
    case actionTypes.LOAD_MENU:
      return {...state,menu:action.payload.data}
    case "UPVOTE_ITEM":
      return {...state}
    case actionTypes.LOAD_FEEDBACK:
      return {...state,feedback:action.payload.feedback }
    case "ADD_FEEDBACK":
      return {...state, feedback:action.payload.reviews}
    case "DELETE_FEEDBACK":
      return {...state,feedback:action.payload.reviews}
    case "CLEAR_FEEDBACK":
      return {...state, feedback:{}}
    case "UPVOTE_FEEDBACK":
      return {...state,feedback:action.payload.feedback}
      case "DOWNVOTE_FEEDBACK":
        return {...state,feedback:action.payload.feedback}
    default:
      return state;
  }
}
