// import React from "react";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
// import GridItem from "components/Grid/GridItem.jsx";
// import GridContainer from "components/Grid/GridContainer.jsx";
// import {
//   FormLabel,
//   InputLabel,
//   Select,
//   Input,
//   MenuItem,
//   Button
// } from "@material-ui/core";
// const styles = theme => ({
//   root: {
//     display: "flex"
//   },
//   formControl: {
//     margin: theme.spacing.unit * 3
//   },
//   group: {
//     margin: `${theme.spacing.unit}px 0`
//   },
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//     marginBottom: theme.spacing.unit * 2
//   },
//   selectEmpty: {
//     marginTop: theme.spacing.unit * 2
//   }
// });

// class TableList extends React.Component {
//   state = {
//     value: "female",
//     name: ""
//   };

//   handleChange = event => {
//     this.setState({ value: event.target.value });
//   };
//   handleChangeText = name => event => {
//     this.setState({ [name]: event.target.value });
//   };
//   handleChangeSelect = event => {
//     this.setState({ [event.target.name]: event.target.value });
//   };

//   render() {
//     const { classes } = this.props;

//     return (
//       <GridContainer>
//         <GridItem xs={12} sm={6} >
//           <TextField
//             id="outlined-name"
//             label="Advertisement Name"
//             className={classes.textField}
//             value={this.state.name}
//             onChange={this.handleChangeText("name")}
//             margin="normal"
//             fullWidth
//             variant="outlined"
//           />
//           <Button variant="outlined" color="primary" className={[classes.textField,classes.button]  }>
//             Upload Image
//           </Button>
//         </GridItem>

//         <GridItem xs={12} sm={12} md={12}>
//           <FormLabel component="legend" className={classes.textField}>
//             Direction
//           </FormLabel>
//           <RadioGroup
//             aria-label="Gender"
//             name="gender1"
//             className={classes.textField}
//             value={this.state.value}
//             onChange={this.handleChange}
//           >
//             <FormControlLabel
//               value="female"
//               control={<Radio />}
//               label="Vertical"
//             />
//             <FormControlLabel
//               value="male"
//               control={<Radio />}
//               label="Horizontal"
//             />
//           </RadioGroup>
//         </GridItem>
//         <GridItem xs={12} sm={12} md={12}>
//           <TextField
//             id="link"
//             label="Link"
//             className={classes.textField}
//             value={this.state.name}
//             onChange={this.handleChangeText("name")}
//             margin="normal"
//             variant="outlined"
//             fullWidth
//           />
//         </GridItem>
//         <GridItem xs={12} sm={12} md={12}>
//           <InputLabel htmlFor="age-helper" className={classes.textField}>
//             Advertisement Packages
//           </InputLabel>
//           <Select
//             value={this.state.age}
//             onChange={this.handleChangeSelect}
//             fullWidth
//             className={classes.textField}
//             input={<Input name="age" id="age-helper" />}
//           >
//             <MenuItem value="">
//               <em>None</em>
//             </MenuItem>
//             <MenuItem value={10}>Ten</MenuItem>
//             <MenuItem value={20}>Twenty</MenuItem>
//             <MenuItem value={30}>Thirty</MenuItem>
//           </Select>
//         </GridItem>
//         <GridItem xs={12} sm={12} md={12}>
//           <InputLabel htmlFor="age-helper" className={classes.textField}>
//             Payment Methods
//           </InputLabel>
//           <Select
//             value={this.state.age}
//             onChange={this.handleChangeSelect}
//             fullWidth
//             className={classes.textField}
//             input={<Input name="age" id="age-helper" />}
//           >
//             <MenuItem value="">
//               <em>None</em>
//             </MenuItem>
//             <MenuItem value={10}>Visa</MenuItem>
//             <MenuItem value={20}>Mastercard</MenuItem>
//             <MenuItem value={30}>Thirty</MenuItem>
//           </Select>
//         </GridItem>
//         <GridItem xs={12} sm={12} md={12}>
//           <Button variant="outlined" color="primary" className={classes.button}>
//             Submit
//           </Button>
//         </GridItem>
//       </GridContainer>
//     );
//   }
// }

// TableList.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(TableList);
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/Button";
import CheckIcon from '@material-ui/icons/Check'
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Fab from '@material-ui/core/Fab'
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import axios from 'axios'
import TextField from "@material-ui/core/TextField";
import {
  FormLabel,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Button,
  ButtonToolbar

} from "@material-ui/core";
import Typography from '../SignIn/Typography';
import Modal from '@material-ui/core/Modal';
import { type } from "os";
function getModalStyle() {
  const top = 100
  const left = 100

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const styles = theme => ({
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
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 180,
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
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      name1:"",
      address:"",
      images:"",
      avatar:"",
      description:"",
      website:"",
      serT: "",
      price: "",
      local:"",
      adsData: [],
      serTData: [],
      locData: [],
      open: false,
      tc: false,
      tc1: false,
      massage:"",
    }
  }
  
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  showNotification(place) {
    const avatar=this.state.avatar;
    const name=this.state.name
    const description=this.state.description;
    const location=this.state.local;
    const address=this.state.address;
    const price=this.state.price;
    const website=this.state.website;
    const info={"location":location,
    "address":address,
      "price":price,
      "website":website};
    const images=[this.state.images];
    // console.log(this.state.avatar,this.state.name,this.sate.price,this.state.local)
    const token=this.props.user.token;
    const servicetype=this.state.serT;
    console.log("type",servicetype)
    axios({
      method:'POST',
      url:`https://servicy.herokuapp.com/api/services/`,
      headers:{
        Authorization:this.props.user.token,
      },
      data:{
        avatar,name,description,info,images,servicetype
      }
      })
      .then(response=>{
        
        this.setState({message:"Add success"})
        this.setState(state=>{
          const item={...response.data,provider_id: this.props.user.user}
          const newAds=state.adsData.concat(item);
          return {
            ...state,
            adsData:newAds
          }
        })

      })
      .catch(err=>this.setState({message:'Unexpected Error was happend! Please Try Again!'}))
      
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
  handleAdd(){
    const name=this.state.name1;
    axios({
      method:'POST',
      url:`https://servicy.herokuapp.com/api/servicetypes`,
      headers:{
        Authorization:this.props.user.token,
      },
      data:{
        name:name
      }
      })
      .then(response=>{
        console.log("message",response)
        if (response.data.success) {this.setState({message:"Success"})}
        
        else {this.setState({message:"Fail"})}
      })
      .catch(err=>this.setState({message:'Unexpected Error was happend! Please Try Again!'}))
      
      this.setState({
        name1:"",
       
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
  handleChangeSelect = event => {
    console.log(event.target.name, event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  };
  componentWillMount() {
    axios.get(`https://servicy.herokuapp.com/api/services`)
      .then(res => {
        const adsData = (res.data.data).filter(item => item.provider_id._id == this.props.user.user._id)
        console.log("ads",adsData)
        this.setState({ adsData });
      })
    axios.get(`https://servicy.herokuapp.com/api/servicetypes`)
      .then(res => {
        const serTData = res.data.data
        console.log("ser",serTData)
        this.setState({ serTData });
      })
    axios.get(`https://servicy.herokuapp.com/api/locations`)
      .then(res => {
        const locData = res.data.data
        console.log("ads",locData)
        this.setState({ locData });
      })
  }
  handleDelete(id){
    axios({
      method:'DELETE',
      url:`https://servicy.herokuapp.com/api/services/${id}`,
      headers:{
        Authorization:this.props.user.token,
      }
      })
      .then(response=>{

        this.setState({message:"Delete Success"})
      })
      .catch(err=>this.setState({message:'Unexpected Error was happend! Please Try Again!'}))
      this.setState(state=>{
        console.log("log:",state.adsData)
        console.log("log:",id)
          const ads=state.adsData.filter(i=>i._id!=id)
          console.log("log:",ads)
          return{
            ...state,
            adsData:ads
          }
      })      
      console.log(this.state.adsData)
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
  handleChangeText = name => event => {
    this.setState({ [name]: event.target.value });
  };
  
  render() {
    const { classes } = this.props;
   console.log('adssss',this.state.adsData)
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card >
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Services List</h4>
              
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Name", "Description", "Address", "Status", "Rating", ""]}
                tableData={
                  this.state.adsData.map((item,index) => {
                    return [
                      item.name, item.description, item.info.address,
                      item.status, Math.round(item.rating.points*10 / item.rating.total)/10, <BtnAdd   className={classes.margin} onClick={()=>this.handleDelete(item._id)}/>
                    ]
                  }).sort(function(a, b) {
                    var nameA = a[0].toUpperCase(); // bỏ qua hoa thường
                    var nameB = b[0].toUpperCase(); // bỏ qua hoa thường
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                  
                    // name trùng nhau
                    return 0;
                  })
                }
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem
          xs={12} sm={12} md={12} alignItems='flex-end'>
          <Fab aria-label="Delete" color="primary" className={classes.fab}>
            <AddIcon onClick={this.handleOpen} />
          </Fab>
        </GridItem>
        <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add Service Type</h4>
            </CardHeader>
            <CardBody>
        <GridItem xs={12} sm={6} >
          <TextField
            id="outlined-name"
            label="Name"
            className={classes.textField}
            value={this.state.name1}
            onChange={this.handleChangeText("name1")}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          
        </GridItem>

       
        
        <GridItem xs={12} sm={12} md={12}>
          <Button variant="outlined" color="primary" className={classes.button} onClick={()=>this.handleAdd()}>
            Add
          </Button>
        </GridItem>
        </CardBody>
        </Card>
        <div>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={classes.paper}>
              <GridItem xs={12} sm={12} md={8}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Add Service</h4>
                    <p className={classes.cardCategoryWhite}>Complete your profile</p>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={8}>
                        <CustomInput
                          // labelText="Company (disabled)"
                          // id="company-disabled"
                          // formControlProps={{
                          //   fullWidth: true
                          // }}
                          // inputProps={{
                          //   disabled: true
                          // }}
                          labelText="Service's name"

                          id="servicename"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: this.handleChangeSelect,
                            name: "name",
                            type: "text",
                          }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          value={this.state.price}
                          labelText="Price"

                          inputProps={{
                            onChange: this.handleChangeSelect,
                            name: "price",
                            type: "text",
                          }}
                          id="price"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>

                        <InputLabel htmlFor="age-helper" className={classes.textField}>
                          Type
                         </InputLabel>
                        <Select
                          value={this.state.serT}
                          onChange={this.handleChangeSelect}
                          fullWidth
                          className={classes.textField}
                          input={<Input name="serT" id="age-helper" />}
                        >

                          {this.state.serTData.map(typ => (<MenuItem value={typ._id} > {typ.name} </MenuItem>))}
                        </Select>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>

                        <InputLabel htmlFor="local-helper" className={classes.textField}>
                          Location
        </InputLabel>
                        <Select
                          value={this.state.local}
                          onChange={this.handleChangeSelect}
                          fullWidth
                          className={classes.textField}
                          input={<Input name="local" id="local-helper" />}
                        >

                          {this.state.locData.map(location => (<MenuItem value={location._id} > {location.name} </MenuItem>))}
                        </Select>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Address"
                          id="address"
                          inputProps={{
                            onChange: this.handleChangeSelect,
                            name: "address",
                            type: "text",
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>

                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Website"
                          id="website"
                          inputProps={{
                            onChange: this.handleChangeSelect,
                            name: "website",
                            type: "text",
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}

                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Link avatar"
                          id="avatar"
                          inputProps={{
                            onChange: this.handleChangeSelect,
                            name: "avatar",
                            type: "text",
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}

                        />
                      </GridItem>
                      </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Link detail avatar"
                          id="images"
                          inputProps={{
                            onChange: this.handleChangeSelect,
                            name: "images",
                            type: "text",
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}

                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        
                        <CustomInput
                          labelText="Description"
                          id="description"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            multiline: true,
                            rows: 5,
                            onChange: this.handleChangeSelect,
                            name: "description",
                            type: "text",
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary" onClick={() =>{this.handleClose();this.showNotification("tc")}}
                    //onClick={this.handleClose}
                    >Add Service</Button>

                  </CardFooter>
                </Card>
              </GridItem>
            </div>
          </Modal>
        </div>
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
         
      </GridContainer>
    );
  }
}

export default withStyles(styles)(TableList);
