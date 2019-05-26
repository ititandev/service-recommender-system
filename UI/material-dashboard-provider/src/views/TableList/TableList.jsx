import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import axios from 'axios';
import Table from "components/Table/Table.jsx";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/Button";
import {
  FormLabel,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Button
} from "@material-ui/core";
import { contains } from "@material-ui/core/utils/helpers";
const styles = theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

const BtnAdd = props => {

  return (
    <div>
      {/* <IconButton color='primary' aria-label="Delete" className={props.className}>
        <CheckIcon />
      </IconButton> */}
      
      <IconButton aria-label="Delete" className={props.className}>
        <DeleteIcon onClick={props.onClick}/>
      </IconButton>
    </div>
  );
};

class TableList extends React.Component {
  state = {
    value: {},
    name: "",
    avatar:"",
    link:"",
    locData:[],
    adsData:[],
    age:"",
    message:""
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  handleChangeText = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleChangeSelect = event => {
    console.log(event.target.name,event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  };
  componentWillMount() {
    axios.get(`https://servicy.herokuapp.com/api/adtypes`)
      .then(res => {
        const locData = res.data.data
        this.setState({ locData });
      })
      axios({
        method:'GET',
        url:`https://servicy.herokuapp.com/api/ads`,
        headers:{
          Authorization:this.props.user.token,
        }
        })
        .then(res=>{

          const adsData = res.data.data
          console.log("Đasada",adsData)
        this.setState({ adsData });
        })
  }
  handleDelete(id){
    console.log(id);
    axios({
      method:'DELETE',
      url:`https://servicy.herokuapp.com/api/ads/${id}`,
      headers:{
        Authorization:this.props.user.token,
      }
      })
      .then(response=>{

        this.setState({message:"Delete Success"})
      })
      .catch(err=>this.setState({message:'Unexpected Error was happend! Please Try Again!'}))
      this.setState(state=>{
          const ads=state.adsData.filter(i=>i._id!=id)
          return{
            ...state,
            adsData:ads
          }
      })      

      var x = [];
      x["tc1"] = true;
      this.setState(x);
      this.alertTimeout = setTimeout(
        function() {
          x["tc1"] = false;
          this.setState(x);
        }.bind(this),
        6000
        );
    
  }

  handleBuy(){
    const banner=this.state.avatar;
    const name=this.state.name;
    const url=this.state.link;
    const adtype=this.state.age;
    console.log(this.props.user.token)
    axios({
      method:'POST',
      url:`https://servicy.herokuapp.com/api/ads`,
      headers:{
        Authorization:this.props.user.token,
      },
      data:{
        banner:banner,
        url:url,
        name:name,
        adtype:adtype
      }
      })
      .then(response=>{
        console.log("message",response)
        if (response.data.success) {this.setState({message:"Success"})}
        
        else {this.setState({message:"Fail"})}
      })
      .catch(err=>this.setState({message:'Unexpected Error was happend! Please Try Again!'}))
      axios({
        method:'GET',
        url:`https://servicy.herokuapp.com/api/ads`,
        headers:{
          Authorization:this.props.user.token,
        }
        })
        .then(res=>{

          const adsData = res.data.data
        this.setState({ adsData });
        })
      this.setState({
        avatar:"",
        name:"",
        link:"",
        age:""
      })     

      var x = [];
      x["tc"] = true;
      this.setState(x);
      this.alertTimeout = setTimeout(
        function() {
          x["tc"] = false;
          this.setState(x);
        }.bind(this),
        6000
        );
    
  }
  render() {
    const { classes } = this.props;
    const options = this.state.locData.map(item=>{return{'value': item, 'label': item.name}})
    console.log("option",options)
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Advertisement List</h4>
              
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Name", "Type", "Status", "Views","Clicks", "Time"]}
                tableData={
                  this.state.adsData.map((item,index) => {
                    return [
                      item.name, item.adtype.name, item.status,
                      item.views,item.clicks, item.datetime , <BtnAdd   className={classes.margin} onClick={()=>this.handleDelete(item._id)}/>
                    ]
                  }).sort(function(a, b) {
                    var nameA = a[4]//.toUpperCase(); // bỏ qua hoa thường
                    var nameB = b[4]//.toUpperCase(); // bỏ qua hoa thường
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
            </CardBody>
          </Card>
        </GridItem>
      
          <Snackbar
                    place="tc"
                    color="info"
                    icon={AddAlert}
                    message={this.state.message}
                    open={this.state.tc}
                    closeNotification={() => this.setState({ tc: false })}
                    close
                  />
             <Snackbar
                    place="tc1"
                    color="info"
                    icon={DeleteIcon}
                    message={this.state.message}
                    open={this.state.tc1}
                    closeNotification={() => this.setState({ tc1: false })}
                    close
                  />
         <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add Advertisement</h4>
            </CardHeader>
            <CardBody>
        <GridItem xs={12} sm={6} >
          <TextField
            id="outlined-name"
            label="Advertisement Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChangeText("name")}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          
        </GridItem>

        {/* <GridItem xs={12} sm={12} md={12}>
          <FormLabel component="legend" className={classes.textField}>
            Direction
          </FormLabel>
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            className={classes.textField}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Vertical"
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Horizontal"
            />
          </RadioGroup>
        </GridItem> */}
        <GridItem xs={12} sm={12} md={12}>
          <TextField
            id="link"
            label="Link"
            className={classes.textField}
            value={this.state.link}
            onChange={this.handleChangeText("link")}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <InputLabel htmlFor="age-helper" className={classes.textField}>
            Advertisement Packages
          </InputLabel>
          <Select
            value={this.state.age}
            onChange={this.handleChangeSelect}
            fullWidth
            className={classes.textField}
            input={<Input name="age" id="age-helper" />}
          >
            
            {this.state.locData.map(location=>( <MenuItem value= {location} > {location.name} </MenuItem>))}
          </Select>
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={12}>
          <InputLabel htmlFor="age-helper" className={classes.textField}>
            Payment Methods
          </InputLabel>
          <Select
            value={this.state.age}
            onChange={this.handleChangeSelect}
            fullWidth
            className={classes.textField}
            input={<Input name="age" id="age-helper" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Visa</MenuItem>
            <MenuItem value={20}>Mastercard</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </GridItem> */}
        <GridItem xs={12} sm={12} md={12}>
          <TextField
            id="avatar"
            label="Avatar"
            className={classes.textField}
            value={this.state.avatar}
            onChange={this.handleChangeText("avatar")}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Button variant="outlined" color="primary" className={classes.button} onClick={()=>this.handleBuy()}>
          REGISTER
          </Button>
        </GridItem>
        </CardBody>
        </Card>
      </GridContainer>
    );
  }
}

TableList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TableList);
// import React from "react";
// // @material-ui/core components
// import withStyles from "@material-ui/core/styles/withStyles";
// // core components
// import GridItem from "components/Grid/GridItem.jsx";
// import GridContainer from "components/Grid/GridContainer.jsx";
// import Table from "components/Table/Table.jsx";
// import Card from "components/Card/Card.jsx";
// import CardHeader from "components/Card/CardHeader.jsx";
// import CardBody from "components/Card/CardBody.jsx";
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
// import CheckIcon from '@material-ui/icons/Check';
// const BtnAdd = props => {
//   console.log(props);
//   return (
//     <div>
//        <IconButton color='primary' aria-label="Delete" className={props.className}>
//         <CheckIcon />
//       </IconButton>
//       <IconButton aria-label="Delete" className={props.className}>
//         <DeleteIcon />
//       </IconButton>
//     </div>
//   );
// };
// const styles = {
//   cardCategoryWhite: {
//     "&,& a,& a:hover,& a:focus": {
//       color: "rgba(255,255,255,.62)",
//       margin: "0",
//       fontSize: "14px",
//       marginTop: "0",
//       marginBottom: "0"
//     },
//     "& a,& a:hover,& a:focus": {
//       color: "#FFFFFF"
//     }
//   },
//   cardTitleWhite: {
//     color: "#FFFFFF",
//     marginTop: "0px",
//     minHeight: "auto",
//     fontWeight: "300",
//     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//     marginBottom: "3px",
//     textDecoration: "none",
//     "& small": {
//       color: "#777",
//       fontSize: "65%",
//       fontWeight: "400",
//       lineHeight: "1"
//     }
//   }
// };
//
// function TableList(props) {
//   const { classes } = props;
//   return (
//     <GridContainer>
//       <GridItem xs={12} sm={12} md={12}>
//         <Card>
//           <CardHeader color="primary">
//             <h4 className={classes.cardTitleWhite}>Advertisements List</h4>
//             <p className={classes.cardCategoryWhite}>
//               Here is a subtitle for this table
//             </p>
//           </CardHeader>
//           <CardBody>
//             <Table
//               tableHeaderColor="primary"
//               tableHead={["Name", "Views", "Time", "Status",""]}
//               tableData={[
//                 ["Dakota Rice", "1000", "1/1/2019", "New",<BtnAdd />],
//                 ["Minerva Hooper", "3000", "1/1/2018", "Pending",<BtnAdd />],
//                 ["Sage Rodriguez", "400", "1/1/2016", "Running",<BtnAdd />],
//
//               ]}
//             />
//           </CardBody>
//         </Card>
//       </GridItem>
//
//     </GridContainer>
//   );
// }
//
// export default withStyles(styles)(TableList);
