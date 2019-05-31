import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LayoutBody from '../components/LayoutBody';
import Button from '../components/Button';
import Typography from '../components/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    // backgroundColor: theme.palette.secondary.light,
    overflow: 'hidden',
  },
  layoutBody: {
    marginTop: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 15,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `0px ${theme.spacing.unit * 5}px`,
  },
  title: {
    marginBottom: theme.spacing.unit * 14,
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 150,
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing.unit * 8,
  },
});

function ProductHowItWorks(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <LayoutBody className={classes.layoutBody} width="large">
        <img
          src="/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Typography variant="h4" marked="center" className={classes.title} component="h2">
          SEARCH RESULT
        </Typography>
        <div>
          <Grid container spacing={40}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number} style={{whiteSpace:"nowrap",overflow:'hidden',textOv:"ellipsis"}}>Mì Quảng cô Ba </div>
                <img
                  src="img/tin3.jpg"
                  alt="suitcase"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Appointment every Wednesday 9am.
                </Typography>
                <Typography variant="h6" align="center">
                  Rating: 4.5
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number} style={{whiteSpace:"nowrap",overflow:'hidden',textOv:"ellipsis"}}>Mì Quảng cô Ba </div>
                <img
                  src="img/tin3.jpg"
                  alt="suitcase"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Appointment every Wednesday 9am.
                </Typography>
                <Typography variant="h6" align="center">
                  Rating: 4.5
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number} style={{whiteSpace:"nowrap",overflow:'hidden',textOv:"ellipsis"}}>Mì Quảng cô Ba </div>
                <img
                  src="img/tin3.jpg"
                  alt="suitcase"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Appointment every Wednesday 9am.
                </Typography>
                <Typography variant="h6" align="center">
                  Rating: 4.5
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number} style={{whiteSpace:"nowrap",overflow:'hidden',textOv:"ellipsis"}}>Mì Quảng cô Ba </div>
                <img
                  src="img/tin3.jpg"
                  alt="suitcase"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Appointment every Wednesday 9am.
                </Typography>
                <Typography variant="h6" align="center">
                  Rating: 4.5
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </LayoutBody>
    </section>
  );
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHowItWorks);
