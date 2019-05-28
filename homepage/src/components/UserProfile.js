import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "./molecules/GridItem.jsx";
import GridContainer from "./molecules/GridContainer.jsx";
import CustomInput from "./molecules/CustomInput.jsx";
import Button from "./molecules/Button.jsx";
import Card from "./molecules/Card.jsx";
import CardHeader from "./molecules/CardHeader.jsx";
import CardAvatar from "./molecules/CardAvatar.jsx";
import CardBody from "./molecules/CardBody.jsx";
import CardFooter from "./molecules/CardFooter.jsx";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Link from "@material-ui/core/Link";
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    if (props.login.token) {
      const { user } = props.login;
      this.state = {
        firstname: user.firstname,
        lastname: user.lastname,
        disabled: false,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role
      };
    } else
      this.state = {
        firstname: "",
        lastname: "",
        disabled: false,
        email: "",
        phone: ""
      };
  }
  render() {
    const { classes } = this.props;
    if (!this.props.login.token) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: 1
          }}
        >
          <Link
            onClick={() => this.props.history.push("/SignIn")}
            style={{ color: "blue" }}
          >
            Login to view user profile!
          </Link>
        </div>
      );
    }
    return(   <div style={{width: '80%',margin: 50}}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h2 className={classes.cardTitleWhite}>Thông tin tài khoản</h2>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    value={this.state.firstname}

                    onChange={event => {
                      this.setState({
                        ...this.state,
                        firstname: event.target.value
                      });
                    }}
                    labelText="Tên"
                    id="firstname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.disabled
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    value={this.state.lastname}
                    onChange={event => {
                      this.setState({
                        ...this.state,
                        lastname: event.target.value
                      });
                    }}
                    labelText="Họ lót"
                    id="lastname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.disabled
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    value={this.state.email}
                    onChange={event => {
                      this.setState({
                        ...this.state,
                        email: event.target.value
                      });
                    }}
                    labelText="Email"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.disabled
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    value={this.state.phone}
                    onChange={event => {
                      this.setState({
                        ...this.state,
                        phone: event.target.value
                      });
                    }}
                    labelText="Số điện thoại"
                    id="phone"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.disabled
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    value={this.state.role}
                    labelText="Vai trò"
                    id="role"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              {this.state.disabled ? (
                <Button
                  color="primary"
                  onClick={() => {
                    this.setState({
                      ...this.state,
                      disabled: false
                    });
                  }}
                >
                  Chỉnh sửa
                </Button>
              ) : (
                <div>
                  <Button color="primary" onClick={() => {}}>
                    Hủy
                  </Button>
                  <Button color="primary" onClick={() => {}}>
                    Cập nhật
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={this.state.avatar} alt="..." />
              </a>
            </CardAvatar>

            <CardBody profile>
              <p className={classes.description}>what?</p>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img
                  alt="Log out"
                  src="http://icons.iconarchive.com/icons/alecive/flatwoken/512/Apps-Dialog-Shutdown-icon.png"
                  style={{
                    width: 40,
                    height: 40
                  }}
                  onClick={() => {}}
                />
              </a>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>)
  }
}

const mapStateToProps = state => {
  return {
    login: state.login
  };
};
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Profile)));

// import React from "react";
// // @material-ui/core components
// import withStyles from "@material-ui/core/styles/withStyles";
// import InputLabel from "@material-ui/core/InputLabel";
// // core components
// import GridItem from "./molecules/GridItem.jsx";
// import GridContainer from "./molecules/GridContainer.jsx";
// import CustomInput from "./molecules/CustomInput.jsx";
// import Button from "./molecules/Button.jsx";
// import AppBar from './SimpleAppBar'
// import Card from "./molecules/Card.jsx";
// import CardHeader from "./molecules/CardHeader.jsx";
// import CardAvatar from "./molecules/CardAvatar.jsx";
// import CardBody from "./molecules/CardBody.jsx";
// import CardFooter from "./molecules/CardFooter.jsx";
// import {connect} from 'react-redux';
// import {withRouter} from 'react-router-dom';
// import {Link,TextField,Typography} from '@material-ui/core';
// import {root} from '../config'
// import axios from 'axios'
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// const styles = theme=>({
//   cardCategoryWhite: {
//     color: "rgba(255,255,255,.62)",
//     margin: "0",
//     fontSize: "14px",
//     marginTop: "0",
//     marginBottom: "0"
//   },
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//     width: 200,
//   },
//   label:{
//     fontSize:18
//   },
//   cardTitleWhite: {
//     color: "#FFFFFF",
//     marginTop: "0px",
//     minHeight: "auto",
//     fontWeight: "300",
//     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//     marginBottom: "3px",
//     textDecoration: "none"
//   }
// });
//
// class UserProfile extends React.Component{
//   constructor(props){
//     super(props);
//     if(props.login.token)
//     this.state={
//       firstname: props.login.user.firstname,
//       lastname: props.login.user.lastname,
//       email: props.login.user.email,
//       avatar: props.login.user.avatar,
//       phone: props.login.user.phone,
//       role: props.login.user.role,
//       open:false,
//       service_type:'',
//       message:''
//     }
//   }
//   handleChange(obj){
//     this.setState({
//       ...this.state,
//       ...obj,
//     })
//   }
//   addNewServiceType(){
//     axios({
//       method:'POST',
//       url:`${root}/servicetypes`,
//       headers:{
//         Authorization:this.props.login.token,
//       },
//       data:{
//         name: this.state.service_type
//       }
//       })
//       .then(response=>{
//         this.handleChange({message:response.data.message})
//       })
//       .catch(err=>this.handleChange({message:'Unexpected Error was happend! Please Try Again!'}))
//       this.handleChange({open:false})
//   }
//   updateProfile(){
//     const {email,password,firstname,lastname,role,phone,avatar}=this.state;
//     // axios({
//     //   method:'PUT',
//     //   url:`${root}/users/${this.props.login.user._id}`,
//     //   headers:{
//     //     Authorization:this.props.login.token,
//     //   },
//     //   data:{
//     //     email,
//     //     password,
//     //     firstname,
//     //     lastname,
//     //     role,
//     //     phone,avatar
//     //   }
//     //   })
//     //   .then(response=>{
//     //     if(response.data.success){
//     //       this.props.location.reload();
//     //       console.log('successfully')
//     //     }
//     //     else console.log(response.data.message)
//     //   })
//     //   .catch(err=>console.log(err))
//   }
//   renderDialog(){
//     return(
//     <Dialog
//           open={this.state.open}
//           onClose={()=>this.handleChange({open:false})}
//           aria-labelledby="form-dialog-title"
//         >
//           <DialogTitle id="form-dialog-title" style={{fontSize: 18, fontWeight: '600'}}>Suggest New Service Type</DialogTitle>
//           <DialogContent>
//             <DialogContentText style={{fontSize: 16}}>
//               To suggest new service type to this website, please enter name service type here. We will send
//               updates occasionally.
//             </DialogContentText>
//             <TextField
//               autoFocus
//               margin="dense"
//               id="name"
//               label="Service Type"
//               value={this.state.service_type}
//               onChange={e=>this.handleChange({service_type:e.target.value})}
//               type="text"
//               fullWidth
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={()=>this.handleChange({open:false})} color="primary">
//               Cancel
//             </Button>
//             <Button onClick={()=>this.addNewServiceType()} color="primary">
//               OK
//             </Button>
//           </DialogActions>
//         </Dialog>)
//   }
//   render(){
//     const { classes,login } = this.props;
//     if(!login.token){
//       return(
//         <Link onClick={()=>this.props.history.push({pathname:'/SignIn',state:{from:this.props.location}})} style={{fontSize: 20,flex:1,flexDirection: 'row',justifyContent: 'center',alignItems: 'center',display: 'flex'}}>
//           Login to view User Profile!
//         </Link>
//       )
//     }
//     const {user}=login;
//     return (
//       <React.Fragment>
//       <AppBar />
//       <div style={{width:'80%',marginTop: 50, marginLeft: 'auto',marginRight: 'auto'}}>
//         <GridContainer>
//           <GridItem xs={12} sm={12} md={8}>
//             <Card>
//               <CardHeader color="primary">
//                 <h1 className={classes.cardTitleWhite}>My Profile</h1>
//               </CardHeader>
//               <CardBody>
//                 <GridContainer>
//                   <GridItem xs={12} sm={12} md={6}>
//                   <TextField
//                         id="email"
//                         label="Email"
//                         className={classes.textField}
//                         value={this.state.email}
//                         onChange={e=>this.handleChange({email:e.target.value})}
//                         margin="normal"
//                         disabled
//                         InputLabelProps={{
//                           style:{
//                             fontSize:18
//                           }
//                         }}
//                         InputProps={{
//                         classes: {
//                           input: classes.label,
//                         },
//                       }}
//                       />
//                   </GridItem>
//                   <GridItem xs={12} sm={12} md={6}>
//                   <TextField
//                         id="firstname"
//                         label="Firstname"
//                         className={classes.textField}
//                         value={this.state.firstname}
//                         onChange={e=>this.handleChange({firstname:e.target.value})}
//                         margin="normal"
//                         disabled
//                         InputLabelProps={{
//                           style:{
//                             fontSize:18
//                           }
//                         }}
//                         InputProps={{
//                         classes: {
//                           input: classes.label,
//                         },
//                       }}
//                       />
//                   </GridItem>
//                   <GridItem xs={12} sm={12} md={6}>
//                   <TextField
//                         id="lastname"
//                         label="Last Name"
//                         className={classes.textField}
//                         disabled
//                         value={this.state.lastname}
//                         onChange={e=>this.handleChange({lastname:e.target.value})}
//                         margin="normal"
//                         InputLabelProps={{
//                           style:{
//                             fontSize:18
//                           }
//                         }}
//                         InputProps={{
//                         classes: {
//                           input: classes.label,
//                         },
//                       }}
//                       />
//                   </GridItem>
//                   <GridItem xs={12} sm={12} md={6}>
//                   <TextField
//                         id="phone"
//                         label="Phone"
//                         className={classes.textField}
//                         value={this.state.phone}
//                         onChange={e=>this.handleChange({phone:e.target.value})}
//                         margin="normal"
//                         disabled
//                         InputLabelProps={{
//                           style:{
//                             fontSize:18
//                           }
//                         }}
//                         InputProps={{
//                         classes: {
//                           input: classes.label,
//                         },
//                       }}
//                       />
//                   </GridItem>
//                 </GridContainer>
//
//               </CardBody>
//               <CardFooter>
//               {
//                 //  <Button onClick={()=>this.updateProfile()} color="primary" style={{marginLeft: 'auto',marginRight: 'auto'}}>Update Profile</Button>
//               }
//               </CardFooter>
//             </Card>
//           </GridItem>
//           <GridItem xs={12} sm={12} md={4}>
//             <Card profile>
//               <CardAvatar profile>
//                 <a href="#pablo" onClick={e => e.preventDefault()}>
//                   <img src={this.state.avatar} style={{height: 128, width: 128}} alt="..." />
//                 </a>
//               </CardAvatar>
//               <CardBody profile>
//                 <h6 className={classes.cardCategory} style={{fontSize: 18,color: 'blue'}}>{`Role: ${this.props.login.user.role}`}</h6>
//                 <h4 className={classes.cardTitle} style={{fontSize: 18,color:'blue'}}>{`Name: ${this.props.login.user.firstname} ${this.props.login.user.lastname}`}</h4>
//               </CardBody>
//               <CardFooter>
//               <div style={{display: 'flex',flexDirection: 'column',marginLeft: 'auto',marginRight: 'auto'}}>
//               <Button
//                 color='primary'
//                 style={{marginLeft: 'auto',marginRight: 'auto',width: 200}}
//                 onClick={()=>this.handleChange({open:true})}
//                 >
//                 Suggest New Service Type
//               </Button>
//               <Typography style={{fontSize: 16,marginTop: 20,marginBottom: 20,marginLeft: 'auto',marginRight: 'auto', color: 'blue'}}>{this.state.message}</Typography>
//               </div>
//               </CardFooter>
//             </Card>
//           </GridItem>
//         </GridContainer>
//         {this.renderDialog()}
//       </div>
//       </React.Fragment>
//     );
//   }
//
// }
// const mapStateToProps=state=>{
//   return{
//     login: state.login
//   }
// }
// const mapDispatchToProps={
//
// }
// export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles)(UserProfile)));
