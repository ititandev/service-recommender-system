import React from "react";
import Rating from "material-ui-rating";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";

import Divider from "@material-ui/core/Divider/Divider";
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import Share from "@material-ui/icons/Share";
import Subscribe from "@material-ui/icons/Subscriptions";
import Button from "@material-ui/core/Button";
import Score from  '@material-ui/icons/Score'
import axios from 'axios'
import Link from '@material-ui/core/Link'
import { FacebookShareButton,TwitterShareButton,TumblrShareButton } from "react-simple-share";
import {Dialog,DialogTitle,DialogContent,DialogContentText,TextField,DialogActions} from '@material-ui/core'
import {root} from '../config'
import Warning from './Warning'
export default class Ratings extends React.Component {
  constructor(props){
    super(props);
    this.state={
      open:false,
      message:'',
      typeWarning:'success',
      messageWarning:'',
      openWarning:false
    }
  }
  renderDialog(){
    const {open}=this.state;
    return(
    <Dialog open={open} onClose={()=>this.setState({open:false,message:''})} aria-labelledby="form-dialog-title">
       <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
       <DialogContent>
         <DialogContentText>
           To subscribe to this website, please enter your opinion here. We will send your opinion to the provider.
         </DialogContentText>
         <TextField
           autoFocus
           margin="dense"
           id="name"
           label="Message"
           value={this.state.message}
           onChange={e=>this.setState({message:e.target.value})}
           fullWidth
         />
       </DialogContent>
       <DialogActions>
         <Button onClick={()=>this.setState({open:false,message:''})} color="primary">
           Cancel
         </Button>
         <Button onClick={()=>{this.subscribeService();this.setState({open:false,message:''})}} color="primary">
           Subscribe
         </Button>
       </DialogActions>
     </Dialog>);
  }
  subscribeService(){
    const {login,serviceId,providerId}=this.props;
    const {message}=this.state;
    axios({
      method:'POST',
      url:`${root}/requests/`,
      headers:{
        Authorization:login.token,
      },
      data:{
        provider_id:providerId,
        service: serviceId,
        message
      }
    })
    .then(response=>{
      const {data}=response;
      if(data.success){
        this.setState({
          messageWarning:'Subscribe Successfully!',
          openWarning:true
        })
      }
      else {
        this.setState({
          messageWarning:"An Unexpected error happend!",
          openWarning: true
        })
      }
      setTimeout(()=>this.setState({openWarning:false}),3000)
    })
    .catch(err=>console.log(err))
  }
  render() {
    const url=window.location.href;
    return (
      <React.Fragment>
      <List subheader={<ListSubheader>.</ListSubheader>}>
        <ListItem>
          <Button disabled>
            <Share color="primary" />
          </Button>
          <FacebookShareButton url={url}/>
          <TwitterShareButton url={url}/>
          <TumblrShareButton url={url}/>
        </ListItem>
        <Divider />
        <ListItem>
          {
              this.props.login.token?
              <div>
                <Button disabled>
                  <Subscribe color="primary" />
                </Button>
                <Link onClick={()=>this.setState({open:true})} style={{fontSize: 16}}>Đăng ký dịch vụ</Link></div>
                :
                <Link style={{fontSize: 16,color: 'blue'}} onClick={()=>this.props.history.push({pathname:'/SignIn',state:{from:this.props.location}})}>Login to subscribe Service</Link>
          }
        </ListItem>
        <Divider />
        <ListItem>
          <Button disabled>
              <Score color='primary' />
          </Button>
          <Rating value={3.4} max={5} onChange={value => console.log(value)} readOnly/>
        </ListItem>
      </List>
      {this.renderDialog()}
      <Warning open={this.state.openWarning} type={this.state.typeWarning} message={this.state.messageWarning} />
      </React.Fragment>
    );
  }
}
