import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LocalPhone from '@material-ui/icons/LocalPhone';
import Email from '@material-ui/icons/Email';
import People from '@material-ui/icons/People';
import LocationOn from '@material-ui/icons/LocationOn';
import Wc from '@material-ui/icons/Wc';
import PermIdentity from '@material-ui/icons/PermIdentity';
import Divider from '@material-ui/core/Divider';
import styles from './customer-jss';

const optionsOpt = [
  'Block Customer',
  'Delete Customer',
];

const ITEM_HEIGHT = 48;

class CustomerDetail extends React.Component {
  state = {
    anchorElOpt: null,
  };

  handleClickOpt = event => {
    this.setState({ anchorElOpt: event.currentTarget });
  };

  handleCloseOpt = () => {
    this.setState({ anchorElOpt: null });
  };

  deleteCustomer = (item) => {
    const { remove } = this.props;
    remove(item);
    this.setState({ anchorElOpt: null });
  }

  render() {
    const {
      classes,
      dataCustomer,
      itemSelected,
      edit,
      favorite,
      showMobileDetail,
      hideDetail
    } = this.props;
    const { anchorElOpt } = this.state;
    return (
      <main className={classNames(classes.content, showMobileDetail ? classes.detailPopup : '')}>
        <section className={classes.cover}>
          <div className={classes.opt}>
            <IconButton className={classes.favorite} aria-label="Favorite" onClick={() => favorite(dataCustomer.get(itemSelected))}>
              {dataCustomer.getIn([itemSelected, 'favorited']) ? (<Star />) : <StarBorder />}
            </IconButton>
            <IconButton aria-label="Edit" onClick={() => edit(dataCustomer.get(itemSelected))}>
              <Edit />
            </IconButton>
            <IconButton
              aria-label="More"
              aria-owns={anchorElOpt ? 'long-menu' : null}
              aria-haspopup="true"
              className={classes.button}
              onClick={this.handleClickOpt}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorElOpt}
              open={Boolean(anchorElOpt)}
              onClose={this.handleCloseOpt}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200,
                },
              }}
            >
              {optionsOpt.map(option => {
                if (option === 'Delete Customer') {
                  return (
                    <MenuItem key={option} selected={option === 'Edit Profile'} onClick={() => this.deleteCustomer(dataCustomer.get(itemSelected))}>
                      {option}
                    </MenuItem>
                  );
                }
                return (
                  <MenuItem key={option} selected={option === 'Edit Profile'} onClick={this.handleCloseOpt}>
                    {option}
                  </MenuItem>
                );
              })}
            </Menu>
          </div>
          <IconButton
            onClick={hideDetail}
            className={classes.navIconHide}
            aria-label="Back"
          >
            <ArrowBack />
          </IconButton>
          <Hidden xsDown>
            <Avatar alt={dataCustomer.getIn([itemSelected, 'name'])} src={dataCustomer.getIn([itemSelected, 'image'])} className={classes.avatar} />
            <Typography className={classes.userName} variant="h6">
              {dataCustomer.getIn([itemSelected, 'name'])}
              <Typography variant="caption">
                {dataCustomer.getIn([itemSelected, 'title'])}
              </Typography>
            </Typography>
          </Hidden>
        </section>
        <div>
          <Hidden smUp>
            <div className={classes.avatarTop}>
              <Avatar alt={dataCustomer.getIn([itemSelected, 'name'])} src={dataCustomer.getIn([itemSelected, 'image'])} className={classes.avatar} />
              <Typography variant="h5">
                {dataCustomer.getIn([itemSelected, 'name'])}
                <Typography>
                  {dataCustomer.getIn([itemSelected, 'title'])}
                  {dataCustomer.getIn([itemSelected, 'customerNumber'])}
                </Typography>
              </Typography>
            </div>
          </Hidden>
          <List>
            <ListItem>
              <Avatar className={classes.blueIcon}>
                <Wc />
              </Avatar>
              <ListItemText primary={dataCustomer.getIn([itemSelected, 'sex'])} secondary="Sex" />
            </ListItem>
            <Divider variant="inset" />
            <ListItem>
              <Avatar className={classes.blueIcon}>
                <PermIdentity />
              </Avatar>
              <ListItemText primary={dataCustomer.getIn([itemSelected, 'age'])} secondary="Age" />
            </ListItem>
            <Divider variant="inset" />
            <ListItem>
              <Avatar className={classes.blueIcon}>
                <LocalPhone />
              </Avatar>
              <ListItemText primary={dataCustomer.getIn([itemSelected, 'phone'])} secondary="Phone" />
            </ListItem>
            <Divider variant="inset" />
            <ListItem>
              <Avatar className={classes.amberIcon}>
                <People />
              </Avatar>
              <ListItemText primary={dataCustomer.getIn([itemSelected, 'maritalStatus'])} secondary="Marital Status" />
            </ListItem>
            <Divider variant="inset" />
            <ListItem>
              <Avatar className={classes.tealIcon}>
                <Email />
              </Avatar>
              <ListItemText primary={dataCustomer.getIn([itemSelected, 'email'])} secondary="Email" />
            </ListItem>
            <Divider variant="inset" />
            {/*  <ListItem>
              <Avatar className={classes.brownIcon}>
                <Work />
              </Avatar>
              <ListItemText primary={dataCustomer.getIn([itemSelected, 'companyEmail'])} secondary="Company Email" />
            </ListItem> */}
            <Divider variant="inset" />
            <ListItem>
              <Avatar className={classes.redIcon}>
                <LocationOn />
              </Avatar>
              <ListItemText primary={dataCustomer.getIn([itemSelected, 'address'])} secondary="Address" />
            </ListItem>
            {/*  <Divider variant="inset" />
            <ListItem>
              <Avatar className={classes.purpleIcon}>
                <Language />
              </Avatar>
              <ListItemText primary={dataCustomer.getIn([itemSelected, 'website'])} secondary="Website" />
            </ListItem> */}
          </List>
        </div>
      </main>
    );
  }
}

CustomerDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  showMobileDetail: PropTypes.bool.isRequired,
  dataCustomer: PropTypes.object.isRequired,
  itemSelected: PropTypes.number.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  favorite: PropTypes.func.isRequired,
  hideDetail: PropTypes.func.isRequired,
};

export default withStyles(styles)(CustomerDetail);
