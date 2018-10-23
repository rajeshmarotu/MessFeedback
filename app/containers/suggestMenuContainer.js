import suggestMenu from '../components/suggestMenu.js';
import { connect } from 'react-redux';
import { uploadSuggestedMenu } from '../actions/index.js';
// const mapStateToProps=(state)=>{
//   return{
//
//   }
// }

const mapDispatchToProps=(dispatch)=>{
  return{
    uploadSuggestedMenu: (menu)=>uploadSuggestedMenu(menu)
  }
}
export default connect(null,mapDispatchToProps)(suggestMenu);
