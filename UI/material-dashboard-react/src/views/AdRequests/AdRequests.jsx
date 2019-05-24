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
import Check from "@material-ui/icons/Check";
import IconButton from "@material-ui/core/Button";

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import axios from 'axios'
import AlertDialog from "../../components/Dialog/AlertDialog";
import Utils from "../../Utils.jsx";

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

class AdRequests extends React.Component {
    state = {
        tableData: [...Utils.adTestData],
        openDeleteDialog: false,
        openAcceptDialog: false,
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
                            <h4 className={classes.cardTitleWhite}>Danh sách yêu cầu thêm quảng cáo</h4>
                            <p className={classes.cardCategoryWhite}>
                                Danh sách tất các yêu cầu thêm quảng cáo đang chờ duyệt trên hệ thống
                                </p>
                        </CardHeader>
                        <CardBody>
                            <Table className={classes.table} >
                                <TableHead >
                                    <TableRow>
                                        <TableCell>Tên</TableCell>
                                        <TableCell>Nhà cung cấp</TableCell>
                                        <TableCell>URL</TableCell>
                                        <TableCell>Loại</TableCell>
                                        <TableCell>Thời gian</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.tableData.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{`${row.provider.firstname} ${row.provider.lastname}`}</TableCell>
                                            <TableCell>
                                                <a target='_blank' href={row.url}>
                                                    {row.url}
                                                </a>
                                            </TableCell>
                                            <TableCell>{Utils.getFormatAdtype(row.adtype.name)}</TableCell>
                                            <TableCell>{Utils.getFormatDate(row.date_time)}</TableCell>
                                            <TableCell >
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
                    title={"Xác nhận xoá loại dịch vụ?"}
                    description={"Bạn đang thực hiện xóa loại dịch vụ được chọn khỏi hệ thống. Thao tác này không thể được hoàn tác, hãy xác nhận rằng bạn chắc chắn muốn thực hiện thay đổi này."}
                    handleCancel={() => {
                        this.setState({
                            ...this.state,
                            openDeleteDialog: false
                        })
                    }} handleConfirm={() => {
                        const index = this.state.alertIndex
                        const updatedAd = this.state.tableData.splice(index, 1)[0]._id
                        this.setState({
                            ...this.state,
                            openDeleteDialog: false
                        })
                        this.deleteAd(updatedAd)
                    }} /> : null}

                {this.state.openAcceptDialog ? <AlertDialog
                    title={"Xác nhận thêm quảng cáo?"}
                    description={"Bạn đang thực hiện thêm quảng cáo được chọn vào hệ thống, hãy xác nhận rằng bạn chắc chắn muốn thực hiện thay đổi này."}
                    handleCancel={() => {
                        this.setState({
                            ...this.state,
                            openAcceptDialog: false
                        })
                    }} handleConfirm={() => {
                        const index = this.state.alertIndex
                        const {open, expectedValue, ...updatedAd} = this.state.tableData.splice(index, 1)[0]
                        this.setState({
                            ...this.state,
                            openAcceptDialog: false
                        })
                        this.updateAd(updatedAd)
                    }} /> : null}
            </GridContainer>
        );
    }

    initData() {
        axios.get(`${Utils.BASE_URL}/ads?status=pending`
            , {
                headers: {
                    Authorization: Utils.state.token
                }
            }
        )
            .then(response => {
                if (response.data.success) {
                    const newData = response.data.data.map((item, index) => {
                        return {
                            _id: item._id,
                            name: item.name,
                            provider: item.provider,
                            url: item.url,
                            adtype: item.adtype,
                            date_time: item.date_time,
                            views: item.views,
                            status: item.status,
                            open: false,
                            expectedValue: null
                        }
                    })
                    this.setState({
                        ...this.state,
                        tableData: newData
                    })
                    console.log(newData)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    deleteAd(AdId) {
        axios.delete(`${Utils.BASE_URL}/ads/${AdId}`
            , {
                headers: {
                    Authorization: Utils.state.token
                }
            }
        )
            .then(response => {
                if (response.data.success) {
                    console.log(`successful delete Ad: ${AdId}`)
                } else {
                    console.log(`fail delete Ad ${AdId} with message: ${response.data.message}`)
                }
            })
            .catch(function (error) {
                console.log(`delete fail with error: ${error}`);
            });
    }

    updateAd(ad) {
        console.log(ad)
        axios({
          method: 'put',
          url: `${Utils.BASE_URL}/ads/${ad._id}`,
          headers: {
            Authorization: Utils.state.token,
          },
          data: ad
        }).then(function (response) {
            if (response.data.success) {
              console.log('update ad successfully !')
            } else {
              console.log(`update ad fail with error msg: ${response.data.message}`);
            }
          }).catch(function (error) {
            console.log(error);
          });
      }
}

export default withStyles(styles)(AdRequests);