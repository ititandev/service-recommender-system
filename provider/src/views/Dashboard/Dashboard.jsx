import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "../../components/Table/Table.jsx";
import Tasks from "../../components/Tasks/Tasks.jsx";
import CustomTabs from "../../components/CustomTabs/CustomTabs.jsx";
import Danger from "../../components/Typography/Danger.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import axios from "axios";
import { bugs, website, server } from "../../variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../../variables/charts.jsx";
import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import  CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dataPoints =[];



class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      adsData:[],
      serData:[],
      temp:[],
      tempcl:[]
    };
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  componentDidMount() {
    const handleChart=this.handleChart.bind(this)
    axios.get(`https://servicy.herokuapp.com/api/services`)
      .then(res => {
        const serData = (res.data.data).filter(item => item.provider_id._id == this.props.user.user._id)
        this.setState({ serData });
      })
    axios({
        method:'GET',
        url:`https://servicy.herokuapp.com/api/ads`,
        headers:{
          Authorization:this.props.user.token,
        }
        })
        .then(res=>{
        const adsData = res.data.data
        this.setState({ adsData });
        adsData.map(ads=>{if (ads.status=="running"){this.handleChart(ads)}})
        })
       
  }
  handleChart(ads){
    axios({
      method:'GET',
      url:`https://servicy.herokuapp.com/api/views/${ads._id}`,
      headers:{
        Authorization:this.props.user.token,
      }
      })
      .then(res=>{
        var dataP=[]
        var data=res.data.data
        console.log("View",res);
        for (var i = 0; i < data.length; i++) {
          dataP.push({
            x: new Date(data[i]._id.year+"-"+data[i]._id.month+"-"+data[i]._id.day),
            y: data[i].count
          });
        }
        console.log("P",dataP)
        console.log("P1",dataPoints)
        var options = {
          theme: "light2",
          title: {
            text: ads.name
          },
          axisY: {
            title: "Views",
            prefix: "",
            includeZero: true
          },
          
          data: [{
            type: "line",
            xValueFormatString: "DD MMM YYYY",
            yValueFormatString: ",##0",
            dataPoints: dataP
          }]
        }
        const newTmp=[...this.state.temp,{id:ads._id,options}];
        this.setState({
          temp: newTmp
        })
      })  
      
      axios({
        method:'GET',
        url:`https://servicy.herokuapp.com/api/clicks/${ads._id}`,
        headers:{
          Authorization:this.props.user.token,
        }
        })
        .then(res=>{
          var dataP=[]
          var data=res.data.data
          console.log("Click",res);
          for (var i = 0; i < data.length; i++) {
            dataP.push({
              x: new Date(data[i]._id.year+"-"+data[i]._id.month+"-"+data[i]._id.day),
              y: data[i].count
            });
          }
          console.log("P",dataP)
          console.log("P1",dataPoints)
          var options = {
            theme: "light2",
            title: {
              text: ads.name
            },
            axisY: {
              title: "Clicks",
              prefix: "",
              includeZero: true
            },
            
            data: [{
              type: "line",
              xValueFormatString: "DD MMM YYYY",
              yValueFormatString: ",##0",
              dataPoints: dataP
            }]
          }
          const newTmp=[...this.state.tempcl,{id:ads._id,options}];
          this.setState({
            tempcl: newTmp
          })
        })  
  }
  
  render() {
    const { classes } = this.props;
   
      
  
  
    return (
      <div>
        <GridContainer>
         
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Services</p>
                <h3 className={classes.cardTitle}>{this.state.serData.filter(i=>i.status=="active").length}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Service Inactive</p>
                <h3 className={classes.cardTitle}>{this.state.serData.filter(i=>i.status!="active").length}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="danger">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Advertisement</p>
                <h3 className={classes.cardTitle}>{this.state.adsData.filter(i=>i.status=="running").length}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Advertisement Pending</p>
                <h3 className={classes.cardTitle}>{this.state.adsData.filter(i=>i.status!="running").length}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      

        {this.state.adsData.map(item=>{
          const dt=this.state.temp.filter(i=>item._id==i.id);
        
          if(dt.length>0 )
          return (
          <div style={{margin:20}}>
        <CanvasJSChart options = {dt[0].options}/>
        </div>)
        })}
		{this.state.adsData.map(item=>{
          const dt=this.state.tempcl.filter(i=>item._id==i.id);
        
          if(dt.length>0 )
          return (
          <div style={{margin:20}}>
        <CanvasJSChart options = {dt[0].options}/>
        </div>)
        })}
		
		
      
      </div>
    );
  }
  
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
