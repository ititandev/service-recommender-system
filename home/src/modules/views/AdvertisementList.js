import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import LayoutBody from '../components/LayoutBody';

import Link from '@material-ui/core/Link'
import {connect} from 'react-redux';
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import {loadAdvertisementAction} from '../../redux/actions'
const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 4,
  },
  images: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    fontSize:18,
    fontWeight:'600',
    textDecoration:'underline',
    color:'white',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

class AdvertisementList extends React.Component {
  componentWillMount(){
    this.props.loadAdvertisementAction()
  }
  render(){
    const { classes,images } = this.props;
    return (
      <LayoutBody className={classes.root} component="section" width="large">
        <Divider style={{color:'blue'}}/>
        <div className={classes.images}>
          <Grid container spacing={8}>
            {images.map((image,index) => {
              return(
                <Grid item xs={4} key={index}>
                  <Link href={image.url}>
                    <img src={image.banner} style={{width: 300, height: 150}} alt={image.banner} />
                  </Link>
                </Grid>
              )
            })
          }
          </Grid>
      </div>
    </LayoutBody>
    );
  }

}

AdvertisementList.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps=state=>{
  return{
    images: state.ads
  }
}
const mapDispatchToProps={
  loadAdvertisementAction
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AdvertisementList));
