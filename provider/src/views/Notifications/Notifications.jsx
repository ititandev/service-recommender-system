/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import SnackbarContent from "../../components/Snackbar/SnackbarContent.jsx";
import Snackbar from "../../components/Snackbar/Snackbar.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import axios from 'axios';
import Table from "../../components/Table/Table.jsx";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false,
      userData:[]
    };
  }
  // to stop the warning of calling setState of unmounted component
  componentWillUnmount() {
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }
  componentWillMount() {

      axios({
        method:'GET',
        url:`https://servicy.herokuapp.com/api/requests/`,
        headers:{
          Authorization:this.props.user.token,
        }
        })
        .then(res=>{
          const userData = res.data.data
        this.setState({ userData });
        })
  }
  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }
  handelSeen(id){
    console.log("seen")
    axios({
      method:'PUT',
      url:`https://servicy.herokuapp.com/api/requests/`,
      headers:{
        Authorization:this.props.user.token,
      },
      data:{
        request_id:id
      }
      })
      .then(res=>{
        if (res.data.success){
          axios({
            method:'GET',
            url:`https://servicy.herokuapp.com/api/requests/`,
            headers:{
              Authorization:this.props.user.token,
            }
            })
            .then(res=>{
              const userData = res.data.data
            this.setState({ userData });
            })
        }
      })
  }
  render() {
    const { classes } = this.props;
    console.log("data",this.state.userData)
    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Notifications</h4>
        
        </CardHeader>
        <CardBody>
          <GridContainer>
            <Table
                tableHeaderColor="primary"
                tableHead={["Customer", "Phone", "Email","Message","Service", "status", "Time"]}
                tableData={
                  
                  this.state.userData.filter(i=>i.service).map((item,index) => {
                    if (item.status!="new") {
                      return [
                        item.user.firstname + " " + item.user.lastname, item.user.phone ,item.user.email,
                        item.message,item.service.name ,item.status , item.data_time ]
                    }
                    else {
                    return [
                      item.user.firstname + " " + item.user.lastname, item.user.phone ,item.user.email,
                      <Button color="success" onClick={()=>this.handelSeen(item._id)}>{item.status}</Button>, item.data_time ]
                    }
                  }).sort(function(a, b) {
                    var nameA = a[6]//.toUpperCase(); // bỏ qua hoa thường
                    var nameB = b[6]//.toUpperCase(); // bỏ qua hoa thường
                    if (nameA < nameB) {
                      return 1;
                    }
                    if (nameA > nameB) {
                      return -1;
                    }
                  
                    // name trùng nhau
                    return 0;
                  })
                }
              />


          </GridContainer>
        </CardBody>
      </Card>
    );
  }
}

export default withStyles(styles)(Notifications);
