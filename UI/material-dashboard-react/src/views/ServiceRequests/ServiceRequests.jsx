import React, { useState, useEffect } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/Button";
import CheckIcon from '@material-ui/icons/Check'
import axios from 'axios'

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
function TableList(props) {
  const { classes } = props;

  const tailTag = <BtnAdd className={classes.margin} />
  const defaultTime = "01/01/2019"
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios.get('https://servicy.herokuapp.com/services?status=pending')
      .then(function (response) {
        let dataList = response.data.data
        let newTableData = []
        for (let data of dataList) {
            newTableData.push([data.name, defaultTime, data.status, tailTag])
        }
        setTableData(newTableData)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>Danh sách yêu cầu thêm dịch vụ</h4>
            <p className={classes.cardCategoryWhite}>
              Danh sách các yêu cầu thêm mới dịch vụ từ phía nhà cung cấp
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Time", "Status", ""]}
              tableData={tableData}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default withStyles(styles)(TableList);