import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "@material-ui/core/Table";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/Button";

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import axios from 'axios'
import AlertDialog from "../../components/Dialog/AlertDialog";
import Utils from "../../Utils.jsx";
import { Avatar } from "@material-ui/core";

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
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  }
});

class Services extends React.Component {
  state = {
    tableData: [],//[...Utils.serviceTestData],
    openDeleteDialog: false,
    alertIndex: null
  }

  componentWillMount() {
    this.initData()
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>Danh sách dịch vụ</h4>
              <p className={classes.cardCategoryWhite}>
                Danh sách tất các dịch vụ đang được kích hoạt trên hệ thống
              </p>
            </CardHeader>
            <CardBody>
              <Table className={classes.table} >
                <TableHead >
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Tên</TableCell>
                    <TableCell>Nhà cung cấp</TableCell>
                    <TableCell>Loại</TableCell>
                    <TableCell>Địa điểm</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.tableData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Avatar alt="Remy Sharp" src={row.avatar} className={classes.bigAvatar} style={{
                          margin: 5,
                          width: 60,
                          height: 60,
                        }} />
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{`${row.provider_id.firstname} ${row.provider_id.lastname}`}</TableCell>
                      <TableCell>{row.servicetype.name}</TableCell>
                      <TableCell>{row.info.address}</TableCell>
                      <TableCell>{(row.rating.points / row.rating.total).toFixed(2)}</TableCell>
                      <TableCell>{Utils.getFormatStatus(row.status)}</TableCell>
                      <TableCell >
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <IconButton color='secondary' aria-label="Delete" onClick={() => {
                            this.setState({
                              ...this.state,
                              openDeleteDialog: true,
                              alertIndex: index
                            })
                          }}>
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </GridItem>
        {this.state.openDeleteDialog ? <AlertDialog
          title={"Xác nhận xoá dịch vụ?"}
          description={"Bạn đang thực hiện xóa dịch vụ được chọn khỏi hệ thống. Thao tác này không thể được hoàn tác, hãy xác nhận rằng bạn chắc chắn muốn thực hiện thay đổi này."}
          handleCancel={() => {
            this.setState({
              ...this.state,
              openDeleteDialog: false
            })
          }} handleConfirm={() => {
            const index = this.state.alertIndex
            const deletedServiceId = this.state.tableData.splice(index, 1)[0]._id
            this.setState({
              tableData: this.state.tableData,
              openDeleteDialog: false
            })
            this.deleteService(deletedServiceId)
          }} /> : null}
      </GridContainer>
    );
  }

  initData() {
    axios({
      method: 'get',
      url: `${Utils.BASE_URL}/services`,
      headers: {
        Authorization: Utils.state.token,
        'Content-type':'application/json'
      },
      data: {
        "status": "active"
      },
      // params: ["status"]
    })
      .then(response => {
        console.log(response)
        if (response.data.success) {
          const newData = response.data.data.map((item, index) => ({
            ...item,
            open: false,
            expectedValue: null
          }))
          console.log(`get services success with msg: ${response.data.message}`);
          console.log(newData)

          this.setState({
            ...this.state,
            tableData: newData
          })
        } else {
          console.log(`get services fail with error msg: ${response.data.message}`);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteService(serviceId) {
    axios.delete(`${Utils.BASE_URL}/services/${serviceId}`
      , {
        headers: {
          Authorization: Utils.state.token
        }
      }
    )
      .then(response => {
        if (response.data.success) {
          console.log(`successful delete service: ${serviceId}`)
        } else {
          console.log(`fail delete service ${serviceId} with message: ${response.data.message}`)
        }
      })
      .catch(function (error) {
        console.log(`delete fail with error: ${error}`);
      });
  }
}

export default withStyles(styles)(Services);