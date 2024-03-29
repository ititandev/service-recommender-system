import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    display: 'flex',
    // backgroundColor: theme.palette.secondary.light,
  },
  layoutBody: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 8,
    display: 'flex',
  },
  iconsWrapper: {
    height: 120,
  },
  icons: {
    display: 'flex',
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing.unit,
    '&:hover': {
      // backgroundColor: theme.palette.warning.dark,
    },
  },
  list: {
    margin: 0,
    listStyle: 'none',
    paddingLeft: 0,
  },
  listItem: {
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2,
  },
  language: {
    marginTop: theme.spacing.unit,
    width: 150,
  },
});


function AppFooter(props) {

  return (
    <footer >
  <div className="container-fluid bg-primary py-3" style={{backgroundColor:"#47b8ed"}} >
    <div className="container">
      <div className="row">
        <div className="col-sm-10">
          <div className="row py-0">
            <div className="col-sm-1 hidden-md-down">

            </div>
            <div className="col-sm-11 text-white">
              <div><h4>&nbsp;&nbsp;Copyright</h4>
              <h5>&nbsp;&nbsp;Bach Khoa University</h5>
                <p>&nbsp;&nbsp;&nbsp;<span className="header-font"></span><span className="header-font"></span>Servicy By Group3@2019</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-1" style={{padding:"1%"}}>
        <img src="img/bachkhoa.png" width="80" height="80" alt="bk"/>
        </div>
        <div className="col-sm-1" style={{padding:"1%"}}>

        <img src="img/footer1.png" width="80" height="80" alt="footer"/>
        </div>

      </div>
    </div>
  </div>
</footer>
  );
}

AppFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  pure,
  withStyles(styles),
)(AppFooter);
