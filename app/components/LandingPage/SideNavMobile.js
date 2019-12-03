import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Scrollspy from 'react-scrollspy';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import logo from 'dan-images/logo.png';
import brand from 'dan-api/dummy/brand';
import Link from '@material-ui/core/Link';
import styles from '../Sidebar/sidebar-jss';

class SideNavMobile extends React.Component {
  render() {
    const {
      classes,
      menuList,
      closeDrawer
    } = this.props;

    const getMenus = menuArray => menuArray.map((item, index) => {
      if (item.name === 'login' || item.name === 'register') {
        return (
          <ListItem
            key={index.toString()}
            button
            component={Link}
            className={classes.headCapital}
            href={item.url}
          >
            <ListItemText classes={{ primary: classes.primary }} primary={item.name} />
          </ListItem>
        );
      }
      return (
        <ListItem
          key={index.toString()}
          button
          className={classes.headCapital}
          component={AnchorLink}
          href={item.url}
          onClick={closeDrawer}
        >
          <ListItemText classes={{ primary: classes.primary }} variant="inset" primary={item.name} />
        </ListItem>
      );
    });

    return (
      <div className={classes.drawerInnerMobile}>
        <div className={classes.drawerHeader}>
          <div className={classes.brandBig}>
            <img src={logo} alt={brand.name} />
          </div>
        </div>
        <div className={classNames(classes.menuContainer, classes.landingNav, classes.rounded)}>
          <List className={classes.dense} component="nav">
            <Scrollspy items={['feature', 'showcase', 'testimonials', 'pricing', 'contact', 'login', 'register']} currentClassName={classes.active}>
              {getMenus(menuList)}
            </Scrollspy>
          </List>
          <Typography variant="caption" className={classes.copyright}>
            &copy; 2019 AppAvocat
            <br />
            All Right Reserved
          </Typography>
        </div>
      </div>
    );
  }
}

SideNavMobile.propTypes = {
  classes: PropTypes.object.isRequired,
  menuList: PropTypes.array.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};

export default withStyles(styles)(SideNavMobile);
