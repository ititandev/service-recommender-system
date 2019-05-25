
import { Button as SButton, Comment, Form, Header,TextArea } from 'semantic-ui-react'
import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import Moment from 'react-moment';
import CardHeader from '@material-ui/core/CardHeader';
import ListItemText from '@material-ui/core/ListItemText'
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/ThumbUpOutlined';
import ShareIcon from '@material-ui/icons/CommentOutlined';
import Button from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import Link from '@material-ui/core/Link'
import {root} from '../config'
const styles = theme => ({
  card: {
    display: 'block',
    overflow: 'hidden',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    borderWidth:1
  },
  textField: {
    display: 'block',
    overflow: 'hidden',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '80%',
    borderWidth:1
  },
  list: {
    marginBottom: theme.spacing.unit * 2,
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
  },
  avatar: {
    backgroundColor: red[500],
    marginLeft:50,
    marginRight:10
  },
  avatar1: {
    backgroundColor: red[500],
  },
  title:{
    fontSize:16,
    fontWeight:'600'
  },
  subtitle:{
    fontSize:14
  },
  content:{
    fontSize:15
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  input: {
    marginLeft: 8,
    flex: 1,
    fontSize:16,
    borderWidth:1
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});

const CommentItem=({login,avatar,username,datetime,content,commentId,replies,readOnly})=>{
  const [open,setOpen]=useState(false)
  const [_replies,setReplies]=useState(replies)
  const [reply,setReply]=useState('')
  const addReply=(rep)=>{
    setReply('')
    setReplies([...replies,rep])
  }
  const putReply=()=>{
    if(reply!==''){
      axios({
        method:'POST',
        url:`${root}/replies/`,
        headers:{
          Authorization:login.token,
        },
        data:{
          commentId,
          content:reply
        }
      })
      .then(response=>{
        const {user}=login;
        const {data}=response;
        if(data.success){
          addReply({...data.data,user_id:login.user})
        }
        else{
          console.log(data.message)
        }
      })
      .catch(err=>console.log(err))
    }
  }
  return(
    <Comment>
      <Comment.Avatar src={avatar} />
      <Comment.Content>
        <Comment.Author as='a' style={{fontSize: 15}}>{username}</Comment.Author>
        <Comment.Metadata>
          <div style={{fontSize:12}}>
            <Moment format="DD/MM/YYYY HH:mm:ss">
              {new Date(datetime).toUTCString()}
            </Moment>

          </div>
        </Comment.Metadata>
        <Comment.Text style={{fontSize: 15}}>{content}</Comment.Text>
        <Comment.Actions>
          {readOnly?
          <Comment.Action style={{fontSize: 13}} onClick={()=>setOpen(!open)}>Reply</Comment.Action>
          :<div />}
        </Comment.Actions>
      </Comment.Content>
      <Comment.Group>
        {
          open?
          <Form reply>
            <TextArea
              style={{ height: 50, marginBottom: 10}}
              placeholder="Add comments here..."
              value={reply}
              onChange={e=>setReply(e.target.value)}
              />
            <SButton
              content='Add Reply'
              labelPosition='left'
              icon='edit'
              primary
              onClick={putReply}
              />
          </Form>:<div />
        }
        {_replies.map((item,index)=>{
          return(
            <Comment key={index}>
              <Comment.Avatar src={item.user_id.avatar} />
              <Comment.Content>
                <Comment.Author as='a'>{item.user_id.firstname+" "+item.user_id.lastname}</Comment.Author>
                <Comment.Metadata>
                  <div>{item.data_time}</div>
                </Comment.Metadata>
                <Comment.Text>{item.content}</Comment.Text>

              </Comment.Content>
            </Comment>
          )
        })}

      </Comment.Group>
    </Comment>
  )
}
const CommentList = (props) =>{
  const [comments,setComments]=useState(props.data);
  const [comment,setComment]=useState('')
  const addComment=(comment)=>{
    setComment('')
    setComments([...comments,comment])
  }
  const putComment=()=>{
    const {login,serviceId}=props;
    if(comment!==''){
      axios({
        method:'POST',
        url:`${root}/comments/`,
        headers:{
          Authorization:login.token,
        },
        data:{
          serviceId:serviceId,
          content:comment
        }
      })
      .then(response=>{
        const {user}=login;
        const {data}=response;
        if(data.success){
          addComment({...data.data,user_id:user})
        }
        else{
          console.log(response.data.message)
        }
      })
      .catch(err=>console.log(err))
    }
  }
  return(
    <Comment.Group style={{display: 'flex',justifyContent: 'center',flexDirection: 'column',marginLeft: 'auto',marginRight: 'auto',borderWidth: 1}}>
      <Header as='h1' dividing style={{marginTop: 10, fontWeight: 'bold'}}>
        Comments
      </Header>
      {comments.map((item,index)=>{
        return(
          <CommentItem
            key={index}
            username={item.user_id.firstname+" "+item.user_id.lastname}
            avatar={item.user_id.avatar}
            content={item.content}
            datetime={item.date_time}
            replies={item.replies}
            commentId={item._id}
            login={props.login}
            readOnly={props.readOnly}
            onCommentAdd={e=>addComment(e)}
            />
        )
      })}
      {
        props.readOnly?
        <Form reply>
          <TextArea
            value={comment}
            onChange={e=>setComment(e.target.value)}
            />
          <SButton
            content='Add Comment'
            labelPosition='left'
            icon='edit'
            primary
            onClick={putComment}
            />
        </Form>:
        <Link onClick={props.onClick} style={{color: 'blue',fontSize: 18}}>Login to comment</Link>
      }

    </Comment.Group>
  )
}



class RecipeReviewCard extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <CommentList
          login={this.props.login}
          data={this.props.comments}
          readOnly={Boolean(this.props.login.token)}
          history={this.props.history}
          serviceId={this.props.serviceId}
          onClick={()=>this.props.history.push({pathname:'/SignIn',state:{from:this.props.location}})}
          />
      </div>

    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps=state=>{
  return{
    login: state.login
  }
}
const mapDispatchToProps={

}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles)(RecipeReviewCard)));
