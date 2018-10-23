
import fullMenu from '../components/fullMenu.js';
import {connect} from 'react-redux';

import { loadMenu } from '../actions/index.js';

const mapStateToProps =(state) =>{

  return {
    menu:state.homeReducer.menu
  }
}

const mapDispatchToProps= (dispatch) => {
  return {
    loadMenu: () => dispatch(loadMenu()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(fullMenu);
