import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import LayoutBody from "../components/LayoutBody";

import Typography from "../components/Typography";


import Avatar from "@material-ui/core/Avatar";


import {
  CardContent,
  Card,
  CardMedia,
  CardActionArea,

} from "@material-ui/core";

import Rating from 'material-ui-rating'
import {connect} from 'react-redux'
import {loadBestServiceAction} from '../../redux/actions'
import {withRouter} from 'react-router-dom'
const styles = theme => ({
  bigAvatar: {
    width: 50,
    height: 50
  },
  root: {
    display: "flex",
    // backgroundColor: theme.palette.secondary.light,
    overflow: "hidden"
  },
  layoutBody: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    marginLeft:'auto',
    marginRight:'auto',
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `0px ${theme.spacing.unit * 5}px`
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  title: {
    marginBottom: theme.spacing.unit * 14,
    color: '#1ac6ff',
    fontSize: 20
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium
  },
  image: {
    height: 150,
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180,
    opacity: 0.7
  },
  button: {
    marginTop: theme.spacing.unit * 8
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover",
    height: 140,
  },
  gridList: {
    width: '100%',
    margin:theme.spacing.unit*2,
    marginLeft:'auto',
    marginRight:'auto'
  },

  subtitle: {
    color: 'white',
    fontSize: 15
  },
  titleBar: {
    background:
    "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
      marginRight: theme.spacing.unit * 2,
  },
  modal:{
    position:'absolute',
    top:'10%',
    left:'10%',
    overflow:'scroll',
    height:'100%',
    display:'block'
  },

  rootList: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  primary:{
    color:'black',
    fontSize:18
  },

  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1300,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 1}px 0`,
  },

  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardTitle:{
    fontSize:theme.spacing.unit*2,
    color:'blue',

    fontWeight:'600'
  },

  progress:{
    marginTop: `${theme.spacing.unit*8}px`
  },
  panel:{
    marginBottom: theme.spacing.unit,
    width:'80%',
  },
  itemTitle:{
    fontSize:15,
    fontWeight:'600'
  },
  itemSubtitle:{
    fontSize:11
  },

});

class ProductHowItWorks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all_services: [],
      id: null,

    };
  }

  componentWillMount() {
    const {loadBestServiceAction}=this.props;
    loadBestServiceAction();
  }
    renderGridService(){
      const {best_services,classes}=this.props;
      return(
        <Grid container spacing={8} className={classes.gridList}>
          {
            best_services.map((item,index)=>{
              return(
                <Grid item xs={4} spacing={24}>
                  <Card className={classes.card} onClick={()=>this.props.history.push('/services/?id='+item._id)}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={item.avatar}
                        title={item.name}
                        />
                      <CardContent>
                        <Typography gutterBottom  noWrap style={{fontWeight: '600',fontSize: 18, color: 'blue'}}>
                          {item.name}
                        </Typography>
                        <Typography component="p" noWrap style={{fontSize: 13 }}>
                          {item.description}
                        </Typography>
                      <div style={{display: 'flex',flexDirection: 'row'}}>
                        <Rating value={item.rating.points/item.rating.total} max={5} readOnly />
                        <Typography style={{marginTop: 11,fontSize: 13,color:'gray'}}>{'('+item.rating.total+')'}</Typography>
                      </div>

                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              )
            })
          }
        </Grid>
      )
    }
    renderBestService(){
      const {classes}=this.props;

      return (
        <LayoutBody className={classes.layoutBody} width="large">
          <Avatar
            src="/static/themes/onepirate/productCurvyLines.png"
            className={classes.curvyLines}
            alt="curvy lines"
            />
          <Typography
            variant="h4"
            marked="center"
            className={classes.number}
            component="h2"
            >
            BEST SERVICES

          </Typography>

          {
            //render list
            this.renderGridService()
          }
        </LayoutBody>

      )
    }
    render() {
      const { classes } = this.props;
      return (
        <section className={classes.root}>
          {this.renderBestService()}
      </section>
    );
  }
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps=state=>{
  return{
    best_services: state.services.best,
    filter: state.services.filter
  }
}
const mapDispatchToProps={
  loadBestServiceAction
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles)(ProductHowItWorks)));
