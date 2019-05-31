
// --- Post bootstrap -----
import React from 'react';
import AdvertisementList from './modules/views/AdvertisementList';

import AppFooter from './modules/views/AppFooter';




import AppAppBar from './components/MyAppBar';
import SearchPart from './modules/views/searchResultPart';
import './App.css';
import {connect} from 'react-redux';
class SearchResult extends React.Component {
  render(){
    return (
      <React.Fragment>
        <AppAppBar />
        <SearchPart />
        <AdvertisementList />
        <AppFooter />
      </React.Fragment>
    );
  }

}
const mapStateToProps=state=>{
  return{

  }
}
const mapDispatchToProps={

}
export default connect(mapStateToProps,mapDispatchToProps)(SearchResult);
