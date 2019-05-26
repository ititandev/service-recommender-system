import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Utils from "../../Utils";
import axios from "axios";
import AlertDialog from "../../components/Dialog/AlertDialog";

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
  state = {
    ...Utils.state.user,
    disabled: true,
    openUpdateDialog: false,
    openLogoutDialog: false,
    isLogout: false,
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    const { classes } = this.props;

    return (Utils.cookies.get('isLogin') === "false" || this.state.isLogout) ?
      <Redirect to="/login" />
      :
      (
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
                        value={this.state.firstname}
                        onChange={event => {
                          if (this._isMounted) {
                            this.setState({
                              ...this.state,
                              firstname: event.target.value,
                            })
                          }
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
                          if (this._isMounted) {
                            this.setState({
                              ...this.state,
                              lastname: event.target.value,
                            })
                          }
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
                          if (this._isMounted) {
                            this.setState({
                              ...this.state,
                              email: event.target.value,
                            })
                          }
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
                          if (this._isMounted) {
                            this.setState({
                              ...this.state,
                              phone: event.target.value,
                            })
                          }
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
                        <Button color='primary' onClick={() => {
                          if (this._isMounted) {
                            this.setState({
                              ...this.state,
                              ...Utils.state.user,
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
                <CardAvatar profile>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img src={this.state.avatar} alt="..." />
                  </a>
                </CardAvatar>

                <CardBody profile>
                  <p className={classes.description}>
                    Don't be scared of the truth because we need to restart the
                    human foundation in truth And I love you like Kanye loves Kanye
                    I love Rick Owens’ bed design but the back is...
              </p>
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
                </CardBody>
              </Card>
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
                this.setState({
                  ...this.state,
                  openUpdateDialog: false,
                  disabled: true,
                })
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
    const newUserData = {
      email: this.state.email,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      role: this.state.role,
      phone: this.state.phone,
      avatar: this.state.avatar,
    }
    console.log(newUserData)
    axios({
      method: 'put',
      url: `${Utils.BASE_URL}/users/${this.state._id}`,
      headers: {
        Authorization: Utils.state.token,
      },
      data: newUserData
    }).then(response => {
      if (response.data.success) {
        console.log(`update user success with msg: ${response.data.message}`)
        const { disabled, openUpdateDialog, isLogout, openLogoutDialog, ...newUserData } = this.state
        Utils.cookies.set('user',newUserData,{path: '/'})
        Utils.state.user = newUserData
      } else {
        console.log(`update user fail with msg: ${response.data.message}`)
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  logout = () => {
    Utils.cookies.set('isLogin', "false", { path: '/' })
    Utils.state = {}
    if (this._isMounted) {
      this.setState({
        ...this.state,
        isLogout: true,
      })
    }
  }
}

export default withStyles(styles)(Profile);