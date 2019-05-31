import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import Divider from "@material-ui/core/Divider/Divider";
import styled from "@material-ui/styles/styled";

import AppBar from '../../components/SimpleAppBar'
import MyFooter from '../../components/MyFooter'


import theme from "../../theme/tweeper/theme";
import withTheme from "./withTheme";

import molecules from "../../components/molecules";
import GridContainer from "../../components/atoms/GridContainer";
import GridItem from "../../components/atoms/GridItem";
import Rating from "../../components/Rating";
import Sharing from "../../components/Sharing";
import ImageList from '../../components/ImageList'
import CommentList from '../../components/CommentList'
import axios from 'axios'
import {root} from '../../config'
import CircularProgress from '@material-ui/core/CircularProgress'

import queryString from 'query-string'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'


const { Tabs, Tab } = molecules;

const Content = styled("div")({
  maxWidth: 1000,
  padding: theme.spacing.unit * 4,
  margin: "auto"
});

const Feed = styled("div")({
  backgroundColor: "#fff"
});



class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      item: null
    };
  }
  setTab(index) {
    this.setState({
      ...this.state,
      tabIndex: index
    });
  }
  componentWillMount(){
    const values=queryString.parse(this.props.location.search)
    if(!this.props.login.token){
      axios.get(`${root}/services/${values.id}`)
      .then(response=>{
        if(response.data.success){
            const {data}=response.data;
            this.setState({
              ...this.state,
              item:data[0]
            })
        }
        else console.log(response.data.message)
      })
      .catch(err=>console.log(err))
    }
    else{
      axios({
        method:'GET',
        url:`${root}/services/${values.id}`,
        headers:{
          Authorization:this.props.login.token,
        }
        })
        .then(response=>{
          if(response.data.success){
              const {data}=response.data;
              this.setState({
                ...this.state,
                item:data[0]
              })
            }
          else console.log(response.data.message)
        })
        .catch(err=>console.log(err))
    }

  }
  renderTab(){
    const {tabIndex,item}=this.state;
    if(!item){
      return <CircularProgress />
    }
    const name=item.name;
    const link=item.info.website;
    const location=item.info.address;
    const images=item.images;
    if(tabIndex===0){
      return (<GridContainer>
        <GridItem xs={6} >
          {
            this.props.login.token&&item.ratings.length>0?
            (<Rating history={this.props.history} name={name} link={link} location={location} rating={item.ratings[0].points} serviceId={item._id}/>)
            :
            (<Rating history={this.props.history} name={name} link={link} location={location} serviceId={item._id}/>)
          }

        </GridItem>
        <GridItem xs={6}>
          <Sharing serviceId={item._id} providerId={item.provider_id._id} login={this.props.login} history={this.props.history} location={this.props.location}/>
        </GridItem>
      </GridContainer>);
    }
    else if(tabIndex===1)
    return (<ImageList images={images}/>)
    else if(tabIndex===2)
    return (<CommentList comments={this.state.item.comments} serviceId={this.state.item._id}/>)
  }
  render() {
    const {item}=this.state;
    return (
      <React.Fragment>
        <AppBar />
        <Content>
          <GridContainer>
            <GridItem xs={12} md={12}>
              <Feed>
                <div style={{
                    height: 300,
                    backgroundColor: 'gray',
                    backgroundImage: item!=null?`url(${item.avatar})`:null,
                    backgroundSize:'cover'}
                  }
                    />
                <Tabs value={this.state.tabIndex} variant="fullWidth">
                  <Tab style={{fontSize: 16}} label="Thông tin" onClick={this.setTab.bind(this, 0)} />
                  <Tab style={{fontSize: 16}} label="Hình ảnh" onClick={this.setTab.bind(this, 1)} />
                  <Tab style={{fontSize: 16}} label="Nhận xét" onClick={this.setTab.bind(this, 2)} />
                </Tabs>
                <Divider />
                <div style={{justifyContent: 'center'}}>
                  {this.renderTab()}
                </div>
              </Feed>
            </GridItem>
          </GridContainer>

        </Content>

        <MyFooter />
      </React.Fragment>
    );
  }
}
const mapStateToProps=state=>{
  return{
    login: state.login
  }
}
const mapDispatchToProps={

}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withTheme(theme)(Profile)));
// export default withRouter(withTheme(theme)(Profile))
