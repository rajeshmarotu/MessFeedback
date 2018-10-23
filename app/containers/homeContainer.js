
import Home from '../components/home.js';
import {connect} from 'react-redux';

import { loadMenu, loadUpDownvotes } from '../actions/index.js';
import { upvoteItem } from '../actions/homeActions.js';

const mapStateToProps =(state) =>{

  return {
    reviewsData: state.homeReducer.reviewsData,
    menu:state.homeReducer.menu
  }
}

const mapDispatchToProps= (dispatch) => {
  return {
    loadMenu: () => dispatch(loadMenu()),
    loadUpDownvotes: ()=> dispatch(loadUpDownvotes()),
    upvoteItem: (orgid,itemid,userid) => dispatch(upvoteItem(orgid,itemid,userid))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
