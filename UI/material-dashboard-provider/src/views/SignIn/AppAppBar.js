import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from './AppBar';
import Toolbar, { styles as toolbarStyles } from './Toolbar';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
const styles = theme => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing.unit * 3,
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

function AppAppBar(props) {
  const { classes } = props;

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
        <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="/premium-themes/onepirate"
          >
            {'SERVICY'}
          </Link>
        <div className="col-sm-2" style={{height:"10vh",borderRadius:"20"}}>
                  <div className="row-sm-4" style={{paddingTop:"2%"}}>
                    <label>Place </label> 
                  </div>
                  <div className="row-sm-8"  >
                    <Select style={{width:"70%", backgroundColor:"white",borderRadius:"20"}}>
                        <option value="volvo">Ho Chi Minh</option>
                        <option value="saab">Hanoi</option>
                        <option value="mercedes">Hai Phong</option>
                    </Select>
                  </div>
                  
                
                </div>
                <div className="col-sm-2" style={{height:"10vh",borderRadius:"20"}}>
                  <div className="row-sm-4" style={{paddingTop:"2%"}}>
                      <label> Kind Of Service  </label> 
                    </div>
                    <div className="row-sm-8" style={{height:"10vh",borderRadius:"20"}} >
                      <Select style={{width:"70%", backgroundColor:"white",borderRadius:"20"}}>
                          <option value="volvo">Food</option>
                          <option value="saab">Security</option>
                          <option value="mercedes">Insurance</option>
                      </Select>
                    </div>
                </div>

                <div className="search">
                  <input type="text" className="searchTerm" placeholder="bạn đang tìm gì " />
                  <button type="submit" className="searchButton">
                    <img src="img/search.png" style={{width:"80%",height:"80%"}} />
                  </button>
                </div>

       
  


          <div className={classes.right}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={classes.rightLink}
              href="/premium-themes/onepirate/sign-in"
            >
              {'Sign In'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              className={classNames(classes.rightLink, classes.linkSecondary)}
              href="/premium-themes/onepirate/sign-up"
            >
              {'Sign Up'}
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
