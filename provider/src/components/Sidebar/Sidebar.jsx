import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import {Collapse} from '@material-ui/core'; 
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.jsx";
import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.jsx";

import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleClick(item) {
    this.setState(prevState => ({ [item]: !prevState[item] }));
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }
  render_item({prop,key}){
    
  }
  render_links() {
    const { classes, color, routes } = this.props;
    return (
      <List className={classes.list}>
        {routes.map((prop, key) => {
          var activePro = " ";
          var listItemClasses;
          if (prop.path === "/upgrade-to-pro") {
            activePro = classes.activePro + " ";
            listItemClasses = classNames({
              [" " + classes[color]]: true
            });
          } else {
            listItemClasses = classNames({
              [" " + classes[color]]: this.activeRoute(prop.layout + prop.path)
            });
          }
          const whiteFontClasses = classNames({
            [" " + classes.whiteFont]: this.activeRoute(prop.layout + prop.path)
          });
            return (
              <NavLink
                to={prop.layout + prop.path}
                className={activePro + classes.item}
                activeClassName="active"
                key={key}
              >
                <ListItem button className={classes.itemLink + listItemClasses}>
                  {typeof prop.icon === "string" ? (
                    <Icon
                      className={classNames(
                        classes.itemIcon,
                        whiteFontClasses,
                        {
                          [classes.itemIconRTL]: this.props.rtlActive
                        }
                      )}
                    >
                      {prop.icon}
                    </Icon>
                  ) : (
                    <prop.icon
                      className={classNames(
                        classes.itemIcon,
                        whiteFontClasses,
                        {
                          [classes.itemIconRTL]: this.props.rtlActive
                        }
                      )}
                    />
                  )}
                  <ListItemText
                    primary={this.props.rtlActive ? prop.rtlName : prop.name}
                    className={classNames(classes.itemText, whiteFontClasses, {
                      [classes.itemTextRTL]: this.props.rtlActive
                    })}
                    disableTypography={true}
                  />
                </ListItem>
              </NavLink>
            );
          
        })}
      </List>
    );
  }
  render_brand() {
    const { classes, logo, logoText } = this.props;
    return (
      <div className={classes.logo}>
        <a
          href="https://www.creative-tim.com"
          className={classNames(classes.logoLink, {
            [classes.logoLinkRTL]: this.props.rtlActive
          })}
        >
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
          </div>
          {logoText}
        </a>
      </div>
    );
  }
  render() {
    const { classes, image } = this.props;
    return (
      <div>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={this.props.rtlActive ? "left" : "right"}
            open={this.props.open}
            classes={{
              paper: classNames(classes.drawerPaper, {
                [classes.drawerPaperRTL]: this.props.rtlActive
              })
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {this.render_brand()}
            <div className={classes.sidebarWrapper}>
              {this.props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
              {this.render_links()}
            </div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            anchor={this.props.rtlActive ? "right" : "left"}
            variant="permanent"
            open
            classes={{
              paper: classNames(classes.drawerPaper, {
                [classes.drawerPaperRTL]: this.props.rtlActive
              })
            }}
          >
            {this.render_brand()}
            <div className={classes.sidebarWrapper}>{this.render_links()}</div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}
Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);
