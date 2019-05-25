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
import axios from 'axios'
import classNames from "classnames";
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
import Fab from '@material-ui/core/Fab'
import Poppers from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
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
const BtnAdd = props => {
  console.log(props);
  return (
    <div>
      <IconButton color='primary' aria-label="Delete" className={props.className}>
        <CheckIcon />
      </IconButton>
      <IconButton aria-label="Delete" className={props.className}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adsData: [],
      open : false
    }
  }

  componentWillMount() {
    axios.get(`https://servicy.herokuapp.com/services`)
      .then(res => {
        const adsData = res.data.data
        console.log("dasd", adsData)
        this.setState({ adsData });
      })
  }
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };
  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>Services List</h4>
              {/* <p className={classes.cardCategoryWhite}>
                Here is a subtitle for this table
            </p> */}
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Name", "Provider", "Address", "Status", "Rating", ""]}
                // tableData={[
                //   ["Dakota Rice", "1/1/2019", "Pending", <BtnAdd className={classes.margin} />],
                //   ["Minerva Hooper", "1/1/2018", "Running", <BtnAdd className={classes.margin} />],
                //   [
                //     "Sage Rodriguez",
                //     "1/1/2016",
                //     "Running",
                //     <BtnAdd className={classes.margin} />
                //   ]
                // ]}
                tableData={
                  this.state.adsData.map(item => {
                    return [
                      item.name, item.provider_id.firstname + " " + item.provider_id.lastname, item.info.address,
                      item.status, item.rating.points / item.rating.total, <BtnAdd className={classes.margin} />
                    ]
                  })
                }
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} alignItems='flex-end'>
          <Fab aria-label="Delete" color="primary" className={classes.fab}>
            <AddIcon 
              onClick={this.handleToggle}  
            />
          </Fab>
        </GridItem>
        <Poppers
          open={open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !open }) +
            " " +
            classes.pooperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center top"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      Mike John responded to your email
                      </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      You have 5 new tasks
                      </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      You're now friend with Andrew
                      </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      Another Notification
                      </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      Another One
                      </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(TableList);
