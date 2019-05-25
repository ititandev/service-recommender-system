import React from 'react';
import MyAppBar from './MyAppBar'
import MyFooter from './MyFooter'
class  PageNotFound extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
  return(
    <React.Fragment>
      <MyAppBar />
      <h2 style={{textAlign: 'center',marginTop: 100}}>The page you requested not found!</h2>
      <div style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
      }}>
      <MyFooter />
      </div>

    </React.Fragment>
  )
  }

}
export default PageNotFound;
