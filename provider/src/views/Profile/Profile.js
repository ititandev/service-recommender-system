import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardAvatar from "../../components/Card/CardAvatar.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import axios from "axios";
import AlertDialog from "../../components/Dialog/AlertDialog";
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/Button";
import Check from '@material-ui/icons/Check'
import Close from '@material-ui/icons/Close'
import {withCookies} from 'react-cookie'
import { Redirect } from "react-router-dom";

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
  _isMounted = false;
  constructor(props){
      super(props);
      this.state={
        user:null,
        disabled: true,
        avatarDisabled: true,
        openUpdateDialog: false,
        openLogoutDialog: false,
        isLogout: false,
        avatarAlert: false,
        oldpass: "",
        newPass1: "",
        newPass2: "",
        openChangePassForm: false,
        checkClicked: false,
        passwordAlert: false,
      }
  }

  componentDidMount() {
    this._isMounted = true
    const {cookies}=this.props;
    const token=cookies.get('ptoken')
    const user_id=cookies.get('puser_id')
    axios({
      method:'PUT',
      url:`http://servicy.herokuapp.com/api/users/${user_id}`,
      headers:{
        Authorization:token,
      },
      data: {}
      })
      .then(({data})=>{
        if(data.success){
          this.setState({
              ...this.state,
            ...data.data
          })
        }
        
      })
      .catch(err=>console.log(err))
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    const { classes,cookies } = this.props;
    if( !cookies.get('ptoken')){    
        this.props.history.push("/provider/login")
    }
    if(!this.state._id){
        return <p>Please Wait....</p>
    }
    return (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Thông tin tài khoản</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <CustomInput
                        labelText="Tên"
                        id="firstname"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: this.state.disabled
                          , value: this.state.firstname,
                          onChange: event => {
                            if (this._isMounted) {
                              this.setState({
                                ...this.state,
                                firstname: event.target.value,
                              })
                            }
                          }
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={5}>
                      <CustomInput
                        labelText="Họ lót"
                        id="lastname"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: this.state.disabled
                          , value: this.state.lastname,
                          onChange: event => {
                            if (this._isMounted) {
                              this.setState({
                                ...this.state,
                                lastname: event.target.value,
                              })
                            }
                          }
                        }}
                      />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <CustomInput
                        labelText="Email"
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: this.state.disabled,
                          value: this.state.email,
                          onChange: event => {
                            if (this._isMounted) {
                              this.setState({
                                ...this.state,
                                email: event.target.value,
                              })
                            }
                          }
                        }}
                      />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Số điện thoại"
                        id="phone"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: this.state.disabled
                          , value: this.state.phone,
                          onChange: event => {
                            if (this._isMounted) {
                              this.setState({
                                ...this.state,
                                phone: event.target.value,
                              })
                            }
                          }
                        }}
                      />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Vai trò"
                        id="role"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true
                          , value: this.state.role
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  {
                    this.state.disabled ?
                      <Button color="primary" onClick={
                        () => {
                          if (this._isMounted) {
                            this.setState({
                              ...this.state,
                              disabled: false,
                            })
                          }
                        }
                      }>Chỉnh sửa</Button>
                      :
                      <div>
                        <Button color='primary' style={{ marginRight: 10 }} onClick={() => {
                          if (this._isMounted) {
                            this.setState({
                              ...this.state,
                              avatar: this.state.avatar,
                              disabled: true,
                            })
                          }
                        }}>Hủy</Button>
                        <Button color="primary" onClick={() => {
                          if (this._isMounted) {
                            this.setState({
                              ...this.state,
                              openUpdateDialog: true,
                            })
                          }
                        }}>Cập nhật</Button>
                      </div>
                  }

                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card profile>
                <CardAvatar profile style={{ width: 150, height: 150 }}>
                  <img src={this.state.avatar} alt="avatar" style={{ width: 150, height: 150 }} onError={() => {
                    this.setState({
                      ...this.state,
                      avatarAlert: true,
                    })
                  }} onLoad={() => {
                    this.setState({
                      ...this.state,
                      avatarAlert: false,
                    })
                  }} />
                </CardAvatar>

                {
                  this.state.avatarDisabled ?
                    <CardAvatar profile style={{ width: 30, marginTop: -20 }}>
                      <a href="#pablo" onClick={e => {
                        e.preventDefault()
                        this.setState({
                          ...this.state,
                          avatarDisabled: false,
                        })
                      }}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP7izPQOSUl5RcmdKUB6G_XsjEKSBQXvaiOoEudlVIgRWY6woc" alt="edit" />
                      </a>
                    </CardAvatar>
                    :
                    <div>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <CardAvatar profile style={{ width: 30, marginTop: -20 }}>
                          <a href="#pablo" onClick={e => {
                            e.preventDefault()
                            if (!this.state.avatarAlert) {
                              this.setState({
                                ...this.state,
                                avatarDisabled: true,
                                avatarAlert: false,
                              })
                              this.updateUser()
                            }
                          }}>
                            <img src="https://pngimage.net/wp-content/uploads/2018/05/check-button-png-2.png" alt="check" />
                          </a>
                        </CardAvatar>
                        <CardAvatar profile style={{ width: 30, marginTop: -20 }}>
                          <a href="#pablo" onClick={e => {
                            e.preventDefault()
                            this.setState({
                              ...this.state,
                              avatarDisabled: true,
                              avatarAlert: false,

                            })
                          }}>
                            <img src="https://cdn1.iconfinder.com/data/icons/nuove/128x128/actions/button_cancel.png" alt="cancel" />
                          </a>
                        </CardAvatar>
                      </div>

                      <CustomInput
                        style={{ marginLeft: 20, marginRight: 20, }}
                        labelText="Avatar URL"
                        id="url"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: this.state.avatarDisabled
                          , value: this.state.avatar,
                          onChange: event => {
                            if (this._isMounted) {
                              if (event.target.value.length <= 1998) {
                                this.setState({
                                  ...this.state,
                                  avatar: event.target.value,
                                })
                              } else {
                                this.setState({
                                  ...this.state,
                                  avatarAlert: true,
                                })
                                this.setState({
                                  ...this.state,
                                  avatar: event.target.value,
                                })
                              }
                            }
                          }
                        }}
                      />
                      <Typography style={{ marginTop: 20, fontSize: 10, height: 10 }} color='secondary'>
                        {this.state.avatarAlert ? "URL không hợp lệ hoặc quá dài" : " "}
                      </Typography>
                    </div>

                }
                <CardBody profile>
                  <p className={classes.description}>
                    Don't be scared of the truth because we need to restart the
                    human foundation in truth And I love you like Kanye loves Kanye
                    I love Rick Owens’ bed design but the back is...
              </p>
                  <div >
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img alt="Change pass" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_tSw5eGn-OsSv1Z8Qiaih9Ru2zufJ-3h6lVY_Pok6exAXGDPu" style={{
                        width: 40,
                        height: 40,
                        marginRight: 20,
                      }} onClick={() => {
                        if (this._isMounted) {
                          this.setState({
                            ...this.state,
                            openChangePassForm: true,
                          })
                        }
                      }} />
                    </a>

                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img alt="Log out" src="http://icons.iconarchive.com/icons/alecive/flatwoken/512/Apps-Dialog-Shutdown-icon.png" style={{
                        width: 40,
                        height: 40,
                      }} onClick={() => {
                        if (this._isMounted) {
                          this.setState({
                            ...this.state,
                            openLogoutDialog: true,
                          })
                        }
                      }} />
                    </a>
                  </div>
                </CardBody>
              </Card>

              {/**?**/}
              {this.state.openChangePassForm ?
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Đổi mật khẩu</h4>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <CustomInput
                        style={{ marginLeft: 20, marginRight: 20, }}
                        labelText="Mật khẩu cũ"
                        id="oldpass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: this.state.oldpass,
                          onChange: event => {
                            if (this._isMounted) {
                              this.setState({
                                ...this.state,
                                passwordAlert: false,
                                oldpass: event.target.value,
                              })
                            }
                          },
                          type: 'password',
                        }}
                      />
                    </GridContainer>

                    <GridContainer>
                      <CustomInput
                        style={{ marginLeft: 20, marginRight: 20, }}
                        labelText="Mật khẩu mới"
                        id="newpass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: this.state.newPass1,
                          onChange: event => {
                            if (this._isMounted) {
                              this.setState({
                                ...this.state,
                                passwordAlert: false,
                                newPass1: event.target.value,
                              })
                            }
                          },
                          type: 'password',
                        }}
                      />
                    </GridContainer>

                    <GridContainer>
                      <CustomInput
                        style={{ marginLeft: 20, marginRight: 20, }}
                        labelText="Xác nhận mật khẩu mới"
                        id="newpass confirm"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: this.state.newPass2,
                          onChange: event => {
                            if (this._isMounted) {
                              this.setState({
                                ...this.state,
                                newPass2: event.target.value,
                                passwordAlert: false,
                              })
                            }
                          },
                          type: 'password',
                        }}
                      />
                    </GridContainer>
                  </CardBody>
                  {this.state.passwordAlert ?
                    <Typography style={{ fontSize: 10, textAlign: 'center' }} color='secondary'>
                      Mật khẩu cũ không đúng hoặc xác nhận sai mật khẩu mới
                  </Typography> : null}
                  <CardFooter >
                    <IconButton style={{ marginLeft: 20 }} aria-label="Close" onClick={() => {
                      if (this._isMounted) {
                        this.setState({
                          ...this.state,
                          oldpass: "",
                          newPass1: "",
                          newPass2: "",
                          passwordAlert:false,
                          openChangePassForm: false,
                        })
                      }
                    }}>
                      <Close />
                    </IconButton>
                    <IconButton style={{ marginRight: 20 }} color='primary' aria-label="Check" onClick={() => {
                      if (this.state.oldpass === this.state.password && this.state.newPass1 === this.state.newPass2) {
                        this.setState({
                          ...this.state,
                          password: this.state.newPass1,
                          openUpdateDialog: true,
                          checkClicked: true,
                        })
                      } else {
                        this.setState({
                          ...this.state,
                          passwordAlert: true,
                        })
                      }
                    }}>
                      <Check />
                    </IconButton>
                  </CardFooter>
                </Card> : null}
              {/**?**/}
            </GridItem>
          </GridContainer>
          {this.state.openUpdateDialog ? <AlertDialog
            title={"Xác nhận cập nhật thông tin tài khoản?"}
            description={"Bạn đang thực hiện cập nhật thông tin của tài khoản hiện tại trên hệ thống, hãy xác nhận rằng bạn chắc chắn muốn thực hiện thay đổi này."}
            handleCancel={() => {
              if (this._isMounted) {
                this.setState({
                  ...this.state,
                  openUpdateDialog: false
                })
              }
            }} handleConfirm={() => {
              if (this._isMounted) {
                let newState = {
                  ...this.state,
                  openUpdateDialog: false,
                }
                if (this.state.checkClicked) {
                  newState = {
                    ...newState,
                    openChangePassForm: false,
                    oldpass: "",
                    newPass1: "",
                    newPass2: "",
                    checkClicked: false,
                    passwordAlert:false,
                  }
                } else {
                  newState = {
                    ...newState,
                    disabled: true,
                  }
                }
                this.setState(newState)
              }
              this.updateUser()
            }} /> : null}

          {this.state.openLogoutDialog ? <AlertDialog
            title={"Xác nhận đăng xuất?"}
            description={"Hãy xác nhận rằng bạn chắc chắn muốn đăng xuất khỏi hệ thống."}
            handleCancel={() => {
              if (this._isMounted) {
                this.setState({
                  ...this.state,
                  openLogoutDialog: false
                })
              }
            }} handleConfirm={this.logout} /> : null}
        </div>
      );
  }

  updateUser = () => {
      const {cookies}=this.props;
    let newUserData = {
      email: this.state.email,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phone: this.state.phone,
      avatar: this.state.avatar,
    }
    axios({
      method: 'put',
      url: `https:servicy.herokuapp.com/api/users/${cookies.get('puser_id')}`,
      headers: {
        Authorization: cookies.get('ptoken'),
      },
      data: newUserData
    }).then(response => {
      if (response.data.success) {
        console.log(`update user success with msg: ${response.data.message}`)
      } else {
        console.log(`update user fail with msg: ${response.data.message}`)
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  logout = () => {
      const {cookies}=this.props;
    cookies.remove('ptoken',{path:'/'});

    cookies.remove('puser_id',{path:'/'})
    if (this._isMounted) {
      this.setState({
        ...this.state,
        isLogout: true,
      })
    }
  }
}

export default withCookies(withStyles(styles)(Profile));
