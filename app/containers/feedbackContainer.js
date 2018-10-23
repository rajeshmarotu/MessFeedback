import Feedback from "../components/feedback.js";
import {connect} from 'react-redux';

import { loadFeedback } from '../actions/index.js';
import { addFeedback } from '../actions/homeActions.js';
import { removeFeedback } from '../actions/homeActions.js';
import { downvoteFeedback, upvoteFeedback, clearFeedbackstate } from '../actions/homeActions.js';
const mapStateToProps =(state) =>{
  return {
    feedback:state.homeReducer.feedback
  }
}

const mapDispatchToProps= (dispatch) => {
  return {
    loadFeedback: (orgid,itemid) => dispatch(loadFeedback(orgid,itemid)),
    addFeedback: (orgid,itemid,userid,review) => dispatch(addFeedback(orgid,itemid,userid,review)),
    removeFeedback: (orgid,itemid,reviewid) => dispatch(removeFeedback(orgid,itemid,reviewid)),
    downvoteFeedback: (orgid,itemid,feeedbackid,userid) => dispatch(downvoteFeedback(orgid,itemid,feeedbackid,userid)),
    upvoteFeedback: (orgid,itemid,feeedbackid,userid) => dispatch(upvoteFeedback(orgid,itemid,feeedbackid,userid)),
    clearFeedbackstate: () => dispatch(clearFeedbackstate())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Feedback);
