import Feedback from "../components/feedback.js";
import {connect} from 'react-redux';

import { loadFeedback } from '../actions/index.js';
import { addFeedback } from '../actions/homeActions.js';
import { removeFeedback } from '../actions/homeActions.js';
import { upvoteItem, downvoteItem, upvoteFeedback } from '../actions/homeActions.js';
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
    upvoteItem: (orgid,itemid,userid) => dispatch(upvoteItem(orgid,itemid,userid)),
    downvoteItem: (orgid,itemid,userid) => dispatch(downvoteItem(orgid,itemid,userid)),
    upvoteFeedback: (orgid,itemid,feeedbackid,userid) => dispatch(upvoteFeedback(orgid,itemid,feeedbackid,userid))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Feedback);
