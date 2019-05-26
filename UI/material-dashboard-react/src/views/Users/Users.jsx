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
import Edit from '@material-ui/icons/Edit'
import Check from '@material-ui/icons/Check'
import Close from '@material-ui/icons/Close'

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CustomSelect from 'components/CustomSelect/CustomSelect.jsx'
import update from 'react-addons-update';
import { Avatar } from "@material-ui/core";

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
    state = {
        tableData: [],//[...Utils.userTestData],
        openEditDialog: false,
        openDeleteDialog: false,
        alertIndex: null
    }
    componentWillMount() {
        this.initData()
    }
    handleOpen(index) {
        this.setState({
            tableData: update(this.state.tableData, { [index]: { open: { $set: !this.state.tableData[index].open } } })
        })
    }
    handleOnSelectValueChange = (value, index) => {
        this.setState({
            tableData: update(this.state.tableData,
                {
                    [index]: {
                        expectedValue: { $set: value }
                    }
                })
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite}>Danh sách người dùng</h4>
                            <p className={classes.cardCategoryWhite}>
                                Danh sách các người dùng trong hệ thống
                            </p>
                        </CardHeader>
                        <CardBody>
                            <Table className={classes.table} >
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Tên</TableCell>
                                        <TableCell>Số điện thoại</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Vai trò</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.tableData.map((row, index) => (
                                        <TableRow key={index}>
                                            <Avatar alt="Remy Sharp" src={row.avatar} className={classes.bigAvatar} style={{
                                                margin: 5,
                                                width: 60,
                                                height: 60,
                                            }} />
                                            <TableCell component="th" scope="row">
                                                {`${row.firstname} ${row.lastname}`}
                                            </TableCell>
                                            <TableCell >{row.phone}</TableCell>
                                            <TableCell >{row.email}</TableCell>
                                            <TableCell >{row.open ?
                                                (<CustomSelect value={row.role}
                                                    menuItems={['provider', 'user']}
                                                    onValueChange={value => { this.handleOnSelectValueChange(value, index) }} />) : Utils.getFormatRole(row.role)}
                                            </TableCell>
                                            <TableCell >
                                                {!this.state.tableData[index].open ? (
                                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <IconButton aria-label="Edit Role" onClick={() => this.setState({
                                                            tableData: update(this.state.tableData, { [index]: { open: { $set: !this.state.tableData[index].open } } })
                                                        })}>
                                                            <Edit />
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
                                                ) : (
                                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                            <IconButton color='primary' aria-label="Check" onClick={() => {
                                                                this.setState({
                                                                    ...this.state,
                                                                    openEditDialog: true,
                                                                    alertIndex: index
                                                                })
                                                            }}>
                                                                <Check />
                                                            </IconButton>
                                                            <IconButton aria-label="Close" onClick={() => this.handleOpen(index)}>
                                                                <Close />
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
                                                    )
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardBody>
                    </Card>
                </GridItem>
                {this.state.openEditDialog ? <AlertDialog
                    title={"Xác nhận thay đổi vai trò của người dùng?"}
                    description={"Bạn đang thực hiện thay đổi đối với vai trò của người dùng được chọn, hãy xác nhận rằng bạn chắc chắn muốn thực hiện thay đổi này."}
                    handleCancel={() => {
                        this.setState({
                            ...this.state,
                            openEditDialog: false
                        })
                    }} handleConfirm={() => {
                        const index = this.state.alertIndex
                        this.setState({
                            tableData: update(this.state.tableData, {
                                [index]: {
                                    role: { $set: this.state.tableData[index].expectedValue !== null ? this.state.tableData[index].expectedValue : this.state.tableData[index].role },
                                    open: { $set: !this.state.tableData[index].open }
                                }
                            }),
                            openEditDialog: false
                        })
                        const newUserData = this.state.tableData[index]
                        this.updateUser(this.state.tableData[index]._id, newUserData)
                    }} /> : null}

                {this.state.openDeleteDialog ? <AlertDialog
                    title={"Xác nhận xoá người dùng?"}
                    description={"Bạn đang thực hiện xóa người dùng được chọn khỏi hệ thống. Thao tác này không thể được hoàn tác, hãy xác nhận rằng bạn chắc chắn muốn thực hiện thay đổi này."}
                    handleCancel={() => {
                        this.setState({
                            ...this.state,
                            openDeleteDialog: false
                        })
                    }} handleConfirm={() => {
                        const index = this.state.alertIndex
                        const deletedUserId = this.state.tableData.splice(index, 1)[0]._id
                        this.setState({
                            tableData: this.state.tableData,
                            openDeleteDialog: false
                        })
                        this.deleteUser(deletedUserId)
                    }} /> : null}
            </GridContainer>
        );
    }

    initData() {
        axios({
            method: 'get',
            url: `${Utils.BASE_URL}/users`,
            headers: {
                Authorization: Utils.state.token,
                'Content-Type': 'application/json',
            },
            data: {
                "role": ["provider", "user"]
            }
        })
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    const newData = []
                    for (let item of response.data.data) {
                        if (item.role === 'user' || item.role === 'provider') {
                            newData.push({
                                ...item,
                                open: false,
                                expectedValue: null
                            })
                        }
                    }
                    this.setState({
                        ...this.state,
                        tableData: newData
                    })
                    console.log(`get users success with msg: ${response.data.message}`);
                    console.log(newData)
                } else {
                    console.log(`get users fail with error msg: ${response.data.message}`);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    updateUser(userId, newUserData) {
        console.log(newUserData)
        axios({
            method: 'put',
            url: `${Utils.BASE_URL}/users/${userId}`,
            headers: {
                Authorization: Utils.state.token,
            },
            data: {
                role: newUserData.role,
            }
        })
            .then(response => {
                if (response.data.success) {
                    console.log('successful post')
                } else {
                    console.log(`fail post with message: ${response.data.message}`)
                }
            })
            .catch(function (error) {
                console.log(`post fail with error: ${error}`);
            });
    }

    deleteUser(userId) {
        axios({
            method: 'delete',
            url: `${Utils.BASE_URL}/users/${userId}`,
            headers: {
                Authorization: Utils.state.token
            },
        })
            .then(response => {
                if (response.data.success) {
                    console.log(`successful delete user: ${userId}`)
                } else {
                    console.log(`fail delete user ${userId} with message: ${response.data.message}`)
                }
            })
            .catch(function (error) {
                console.log(`delete fail with error: ${error}`);
            });
    }
}

export default withStyles(styles)(TableList);