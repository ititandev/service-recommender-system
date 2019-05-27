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
import Check from '@material-ui/icons/Check'

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import axios from 'axios'
import AlertDialog from "../../components/Dialog/AlertDialog";
import Utils from "../../Utils";

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
  },
  options1: {
    display: 'flex',
    flexDirection: 'row'
  }
});

class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      openAcceptDialog: false,
      openDeleteDialog: false,
      alertIndex: null
    }
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
              <h4 className={classes.cardTitleWhite}>Danh sách yêu cầu thêm loại dịch vụ</h4>
              <p className={classes.cardCategoryWhite}>
                Danh sách các yêu cầu thêm loại dịch vụ vào hệ thống từ phía người dùng và nhà cung cấp
                                </p>
            </CardHeader>
            <CardBody>
              <Table className={classes.table} >
                <TableHead >
                  <TableRow>
                    <TableCell>Tên</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.tableData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <IconButton color='primary' aria-label="Check" onClick={() => {
                            this.setState({
                              ...this.state,
                              openAcceptDialog: true,
                              alertIndex: index
                            })
                          }}>
                            <Check />
                          </IconButton>
                          <IconButton color="secondary" aria-label="Delete" onClick={() => {
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
        {this.state.openAcceptDialog ? <AlertDialog
          title={"Xác nhận thêm loại dịch vụ?"}
          description={"Bạn đang thực hiện việc chấp nhận yêu cầu thêm loại dịch vụ đang được chọn, hãy xác nhận rằng bạn chắc chắn muốn thực hiện thay đổi này."}
          handleCancel={() => {
            this.setState({
              ...this.state,
              openAcceptDialog: false
            })
          }} handleConfirm={() => this.updateRequestStatus('active')} /> : null}

        {this.state.openDeleteDialog ? <AlertDialog
          title={"Xác nhận xoá yêu cầu?"}
          description={"Bạn đang thực hiện xóa một yêu cầu thêm loại dịch vụ được chọn khỏi hệ thống. Hãy xác nhận rằng bạn chắc chắn muốn thực hiện thay đổi này."}
          handleCancel={() => {
            this.setState({
              ...this.state,
              openDeleteDialog: false
            })
          }} handleConfirm={() => this.updateRequestStatus('inactive')} /> : null}
      </GridContainer>
    );
  }

  initData() {
    axios({
      method: 'get',
      url: `${Utils.BASE_URL}/servicetypes?status=pending`,
      headers: {
        Authorization: Utils.cookies.get('token')
      },
      data: {
        status: ["pending"],
      }
    })
      .then(response => {
        if (response.data.success) {
          const newData = response.data.data.map((item, index) => {
            return {
              ...item,
            }
          })
          this.setState({
            ...this.state,
            tableData: newData
          })
          console.log(newData)
        } else {
          console.log(`get cate request fail with msg: ${response.data.message}`)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updateRequestStatus(status) {
    const requestId = this.state.tableData.splice(this.state.alertIndex, 1)[0]._id
    this.setState({
      ...this.state,
      tableData: this.state.tableData,
      openDeleteDialog: false
    })

    axios({
      method: 'put',
      headers: {
        Authorization: Utils.cookies.get('token')
      },
      url: `${Utils.BASE_URL}/servicetypes/${requestId}`,
      data: {
        status: status
      }
    }).then(response => {
      if (response.data.success) {
        console.log(`put cate request success with msg: ${response.data.message}`)
      } else {
        console.log(`put cate request fail with msg: ${response.data.message}`)
      }
    })
      .catch(function (error) {
        console.log(`put exception: ${error}`);
      });
  }
}

export default withStyles(styles)(TableList);