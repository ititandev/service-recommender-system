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
    }
});

class TableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            openDeleteDialog: false,
            alertIndex: null,
            openChangeStatusDialog: false,
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
                            <h4 className={classes.cardTitleWhite}>Danh sách loại dịch vụ</h4>
                            <p className={classes.cardCategoryWhite}>
                                Danh sách các loại dịch vụ đang có trên hệ thống
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
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell >
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <IconButton color='secondary' aria-label="Disable" onClick={() => {
                                                        this.setState({
                                                            ...this.state,
                                                            openChangeStatusDialog: true,
                                                            alertIndex: index
                                                        })
                                                    }}>
                                                        <img style={{ width: 20, height: 20 }} alt='disable' src="https://i.stack.imgur.com/HkYpY.png" />
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
                        const deletedCateId = this.state.tableData.splice(index, 1)[0]._id
                        this.setState({
                            tableData: this.state.tableData,
                            openDeleteDialog: false
                        })
                        this.deleteCategory(deletedCateId)
                    }} /> : null}

                {this.state.openChangeStatusDialog ? <AlertDialog
                    title={"Xác nhận thay đổi trạng thái loại dịch vụ?"}
                    description={"Bạn đang thực hiện thay đổi trạng thái của loại dịch vụ được chọn trên hệ thống, hãy xác nhận rằng bạn chắc chắn muốn thực hiện thay đổi này."}
                    handleCancel={() => {
                        this.setState({
                            ...this.state,
                            openChangeStatusDialog: false
                        })
                    }} handleConfirm={() => {
                        const index = this.state.alertIndex
                        const updatedCateId = this.state.tableData.splice(index, 1)[0]._id
                        const newStatus = 'inactive'
                        this.setState({
                            ...this.state,
                            tableData: this.state.tableData,
                            openChangeStatusDialog: false
                        })
                        this.updateCategory(updatedCateId, newStatus)
                    }} /> : null}
            </GridContainer>
        );
    }

    initData() {
        axios({
            method: 'get',
            url: `${Utils.BASE_URL}/servicetypes?status=active`,
            headers: {
                Authorization: Utils.cookies.get('_token')
            },
            data: {
                status: ["active"],
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
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    deleteCategory(cateId) {
        axios({
            method: 'delete',
            url: `${Utils.BASE_URL}/servicetypes/${cateId}`,
            headers: {
                Authorization: Utils.cookies.get('_token')
            },
            data: {
                status: ["active"],
            }
        })
            .then(response => {
                if (response.data.success) {
                    console.log(`delete category success with msg: ${response.data.message}`)
                } else {
                    console.log(`delete category fail with msg: ${response.data.message}`)
                }
            })
            .catch(function (error) {
                console.log(`delete category fail with error: ${error}`);
            });
    }

    updateCategory(cateId, newStatus) {
        axios({
            method: 'put',
            url: `${Utils.BASE_URL}/servicetypes/${cateId}`,
            headers: {
                Authorization: Utils.cookies.get('_token'),
                'Content-type': 'application/json',
            },
            data: {
                status: newStatus,
            }
        })
            .then(response => {
                if (response.data.success) {
                    console.log(`update category success with msg: ${response.data.message}`)
                } else {
                    console.log(`update category fail with msg: ${response.data.message}`)
                }
            })
            .catch(function (error) {
                console.log(`update category fail with error: ${error}`);
            });
    }
}

export default withStyles(styles)(TableList);
