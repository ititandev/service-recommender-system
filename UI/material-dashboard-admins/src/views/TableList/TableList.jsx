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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
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

function TableList(props) {
  const { classes } = props;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Advertisements List</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Views", "Time", "Status",""]}
              tableData={[
                ["Dakota Rice", "1000", "1/1/2019", "New",<BtnAdd />],
                ["Minerva Hooper", "3000", "1/1/2018", "Pending",<BtnAdd />],
                ["Sage Rodriguez", "400", "1/1/2016", "Running",<BtnAdd />],
              
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
     
    </GridContainer>
  );
}

export default withStyles(styles)(TableList);