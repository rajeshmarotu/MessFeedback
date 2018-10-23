import FeedbackItem from "../components/feedbackItem.js";
import {connect} from 'react-redux';

import { upvoteFeedback, removeFeedback } from '../actions/homeActions.js';
const mapStateToProps =(state) =>{
  return {
    feedback:state.homeReducer.feedback
  }
}

const mapDispatchToProps= (dispatch) => {
  return {
    removeFeedback: (orgid,itemid,reviewid) => dispatch(removeFeedback(orgid,itemid,reviewid)),
    upvoteFeedback: (orgid,itemid,feeedbackid,userid) => dispatch(upvoteFeedback(orgid,itemid,feeedbackid,userid)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FeedbackItem);
