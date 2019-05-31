import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "@material-ui/core/Table";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
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

class Advertisements extends React.Component {
  state = {
    tableData: [],
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
              <h4 className={classes.cardTitleWhite}>Danh sách quảng cáo</h4>
              <p className={classes.cardCategoryWhite}>
                Danh sách tất các quảng cáo đang chạy trên hệ thống
                                </p>
            </CardHeader>
            <CardBody>
              <Table className={classes.table} >
                <TableHead >
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Tên</TableCell>
                    <TableCell>Nhà cung cấp</TableCell>
                    <TableCell>URL</TableCell>
                    <TableCell>Loại</TableCell>
                    <TableCell>Thời gian</TableCell>
                    <TableCell>Lượt xem</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.tableData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Avatar alt="Remy Sharp" src={row.banner} className={classes.bigAvatar} style={{
                          margin: 5,
                          width: 60,
                          height: 60,
                        }} />
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{`${row.provider.firstname} ${row.provider.lastname}`}</TableCell>
                      <TableCell>
                        <a target='_blank' rel="noopener noreferrer" href={row.url}>
                          {row.url}
                        </a>
                      </TableCell>
                      <TableCell>{Utils.getFormatAdtype(row.adtype.name)}</TableCell>
                      <TableCell>{Utils.getFormatDate(row.datetime)}</TableCell>
                      <TableCell>{row.views}</TableCell>
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
          title={"Xác nhận xoá quảng cáo?"}
          description={"Bạn đang thực hiện xóa quảng cáo được chọn khỏi hệ thống. Thao tác này không thể được hoàn tác, hãy xác nhận rằng bạn chắc chắn muốn thực hiện thay đổi này."}
          handleCancel={() => {
            this.setState({
              ...this.state,
              openDeleteDialog: false
            })
          }} handleConfirm={() => {
            const index = this.state.alertIndex
            const deletedAdId = this.state.tableData.splice(index, 1)[0]._id
            this.setState({
              ...this.state,
              openDeleteDialog: false
            })
            this.deleteAd(deletedAdId)
          }} /> : null}
      </GridContainer>
    );
  }

  initData() {
    axios({
      method: 'get',
      url: `${Utils.BASE_URL}/ads?status=active`,
      headers: {
        Authorization: Utils.cookies.get('token')
      },
      data: {
        status: ["active", "done"],
      }
    })
      .then(response => {
        if (response.data.success) {
          const newData = []
          for (let item of response.data.data) {
            if (item.status === 'done' || item.status === 'running') {
              newData.push({
                ...item,
              })
            }
          }
          this.setState({
            ...this.state,
            tableData: newData
          })
          console.log(newData)
        } else {
          console.log(`get ads fail with msg: ${response.data.message}`)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteAd(adId) {
    axios({
      method: 'delete',
      url: `${Utils.BASE_URL}/ads/${adId}`,
      headers: {
        Authorization: Utils.cookies.get('token')
      },
      data: {
        id: adId,
      }
    })
      .then(response => {
        if (response.data.success) {
          console.log(`delete ad success with msg: ${response.data.message}`)
        } else {
          console.log(`delete ad fail with msg: ${response.data.message}`)
        }
      })
      .catch(function (error) {
        console.log(`delete fail with error: ${error}`);
      });
  }
}

export default withStyles(styles)(Advertisements);