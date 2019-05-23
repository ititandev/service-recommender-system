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
  state = {
    ...Utils.state.user,
    disabled: true,
    openDeleteDialog: false,
  }

  render() {
    const { classes } = this.props;

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
                      value={this.state.firstname}
                      onChange={event => {
                        this.setState({
                          ...this.state,
                          firstname: event.target.value,
                        })
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
                          lastname: event.target.value,
                        })
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
                          email: event.target.value,
                        })
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
                          phone: event.target.value,
                        })
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
                        this.setState({
                          ...this.state,
                          disabled: !this.state.disabled
                        })
                      }
                    }>Chỉnh sửa</Button> :
                    <Button color="primary" onClick={() => {
                      this.setState({
                        ...this.state,
                        openDeleteDialog: true,
                      })
                    }}>Cập nhật</Button>
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
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        {this.state.openDeleteDialog ? <AlertDialog
          title={"Xác nhận cập nhật thông tin tài khoản?"}
          description={"Bạn đang thực hiện cập nhật thông tin của tài khoản hiện tại trên hệ thống, hãy xác nhận rằng bạn chắc chắn muốn thực hiện thay đổi này."}
          handleCancel={() => {
            this.setState({
              ...this.state,
              openDeleteDialog: false
            })
          }} handleConfirm={() => {
            this.setState({
              ...this.state,
              openDeleteDialog: false,
              disabled: true,
            })
            this.updateUser()
          }} /> : null}
      </div>
    );
  }

  updateUser = () => {
    axios({
      method: 'put',
      url: `https://servicy.herokuapp.com/users/${this.state._id}`,
      headers: {
        Authorization: Utils.state.token,
      },
      data: {
        email: this.state.email,
        password: this.state.password,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        role: this.state.role,
        phone: this.state.phone,
        avatar: this.state.avatar,
      }
    }).then(function (response) {
        if (response.data.success) {
          console.log('update user successfully !')
        } else {
          console.log(`get services fail with error msg: ${response.data.message}`);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export default withStyles(styles)(Profile);