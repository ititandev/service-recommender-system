import React from "react";
import Rating from "material-ui-rating";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";

import Typography from "@material-ui/core/Typography";

import Divider from '@material-ui/core/Divider/Divider';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import Location from '@material-ui/icons/LocationCityRounded';
import Button from '@material-ui/core/Button'
import RateIcon from '@material-ui/icons/RateReview';
import WebsiteIcon from '@material-ui/icons/Web';
import Link from '@material-ui/core/Link'
import {connect} from 'react-redux'
import axios from 'axios'
import {root} from '../config'
import StarIcon from '@material-ui/icons/Star'
class Ratings extends React.Component {
  constructor(props){
    super(props)
    this.state={
      value:this.props.rating!==undefined?this.props.rating:0,
    }
  }StarRatingComponent
  handleRating(value){
    const {serviceId,login}=this.props;
    axios({
      method:'POST',
      url:`${root}/ratings/`,
      headers:{
        Authorization:login.token,
      },
      data:{
        serviceId,
        points:value
      }
      })
      .then(response=>{
        if(response.data.success){
          this.setState({
            ...this.state,
            value,
          })
        }
        else console.log(response.data.message)
      })
      .catch(err=>console.log(err))
  }
  render() {
    const {name,location,link,login}=this.props;
    const {token}=login;
    return (
      <List  subheader={<ListSubheader style={{fontSize: 15, fontWeight: '600'}}>{name}</ListSubheader>}>
        <ListItem>
          {token===null?(<Link style={{marginLeft: 'auto',marginRight: 'auto',fontSize: 16}} href='/SignIn'>Login to ratings</Link>):
            (<div style={{display: 'flex',flexDirection: 'row'}}>
              <Button disabled>
              <RateIcon color='primary' />
              </Button>
              <Rating
               value={this.state.value}
               max={5}
               onChange={this.handleRating.bind(this)}
               iconFilled={<StarIcon style={{color:'yellow'}}/>}
               iconHovered={<StarIcon style={{color:'yellow'}} />}
             />
            </div>)
          }

        </ListItem>
        <Divider />
        <ListItem>
            <Button disabled>
                <Location color='primary'/>
            </Button>
            {location}
        </ListItem>
        <Divider/>
        <ListItem>
            <Button disabled>
            <WebsiteIcon color='primary' />
            </Button>
            <Typography  style={{fontSize:14}}>{link}</Typography>
        </ListItem>

      </List>
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

export default connect(mapStateToProps,mapDispatchToProps)(Ratings)
