
import Home from '../components/home.js';
import {connect} from 'react-redux';

import { loadMenu } from '../actions/index.js';
import { upvoteItems } from '../actions/homeActions.js';

const mapStateToProps =(state) =>{

  return {
    menu:state.homeReducer.menu
  }
}

const mapDispatchToProps= (dispatch) => {
  return {
    loadMenu: () => dispatch(loadMenu()),
    upvoteItems: (orgid,itemid) => dispatch(upvoteItems(orgid,itemid))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
