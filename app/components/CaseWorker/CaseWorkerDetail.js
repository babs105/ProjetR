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
import Smartphone from '@material-ui/icons/Smartphone';
import LocationOn from '@material-ui/icons/LocationOn';
import Work from '@material-ui/icons/Work';
import Divider from '@material-ui/core/Divider';
import styles from './CaseWorker-jss';

const optionsOpt = [
  'Block CaseWorker',
  'Delete CaseWorker',
];

const ITEM_HEIGHT = 48;

class CaseWorkerDetail extends React.Component {
  state = {
    anchorElOpt: null,
  };

  handleClickOpt = event => {
    this.setState({ anchorElOpt: event.currentTarget });
  };

  handleCloseOpt = () => {
    this.setState({ anchorElOpt: null });
  };

  deleteCaseWorker = (item) => {
    const { remove } = this.props;
    remove(item);
    this.setState({ anchorElOpt: null });
  }

  render() {
    const {
      classes,
      dataCaseWorker,
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
            <IconButton className={classes.favorite} aria-label="Favorite" onClick={() => favorite(dataCaseWorker.get(itemSelected))}>
              {dataCaseWorker.getIn([itemSelected, 'favorited']) ? (<Star />) : <StarBorder />}
            </IconButton>
            <IconButton aria-label="Edit" onClick={() => edit(dataCaseWorker.get(itemSelected))}>
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
                if (option === 'Delete CaseWorker') {
                  return (
                    <MenuItem key={option} selected={option === 'Edit Profile'} onClick={() => this.deleteCaseWorker(dataCaseWorker.get(itemSelected))}>
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
            <Avatar alt={dataCaseWorker.getIn([itemSelected, 'name'])} src={dataCaseWorker.getIn([itemSelected, 'image'])} className={classes.avatar} />
            <Typography className={classes.userName} variant="h6">
              {dataCaseWorker.getIn([itemSelected, 'name'])}
              <Typography variant="caption">
                {dataCaseWorker.getIn([itemSelected, 'occupation'])}
              </Typography>
            </Typography>
          </Hidden>
        </section>
        <div>
          <Hidden smUp>
            <div className={classes.avatarTop}>
              <Avatar alt={dataCaseWorker.getIn([itemSelected, 'name'])} src={dataCaseWorker.getIn([itemSelected, 'image'])} className={classes.avatar} />
              <Typography variant="h5">
                {dataCaseWorker.getIn([itemSelected, 'name'])}
                {/* <Typography>
                  {dataCaseWorker.getIn([itemSelected, 'title'])}
                </Typography> */}
              </Typography>
            </div>
          </Hidden>
          <List>
            <ListItem>
              <Avatar className={classes.blueIcon}>
                <LocalPhone />
              </Avatar>
              <ListItemText primary={dataCaseWorker.getIn([itemSelected, 'phone'])} secondary="Phone" />
            </ListItem>
            <Divider variant="inset" />
            <ListItem>
              <Avatar className={classes.amberIcon}>
                <Smartphone />
              </Avatar>
              <ListItemText primary={dataCaseWorker.getIn([itemSelected, 'secondaryPhone'])} secondary="Secondary Phone" />
            </ListItem>
            <Divider variant="inset" />
            <ListItem>
              <Avatar className={classes.tealIcon}>
                <Email />
              </Avatar>
              <ListItemText primary={dataCaseWorker.getIn([itemSelected, 'personalEmail'])} secondary="Personal Email" />
            </ListItem>
            <Divider variant="inset" />
            <ListItem>
              <Avatar className={classes.brownIcon}>
                <Work />
              </Avatar>
              <ListItemText primary={dataCaseWorker.getIn([itemSelected, 'companyEmail'])} secondary="Company Email" />
            </ListItem>
            <Divider variant="inset" />
            <ListItem>
              <Avatar className={classes.redIcon}>
                <LocationOn />
              </Avatar>
              <ListItemText primary={dataCaseWorker.getIn([itemSelected, 'address'])} secondary="Address" />
            </ListItem>
            {/*  <Divider variant="inset" />
            <ListItem>
              <Avatar className={classes.purpleIcon}>
                <Language />
              </Avatar>
              <ListItemText primary={dataCaseWorker.getIn([itemSelected, 'website'])} secondary="Website" />
            </ListItem> */}
          </List>
        </div>
      </main>
    );
  }
}

CaseWorkerDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  showMobileDetail: PropTypes.bool.isRequired,
  dataCaseWorker: PropTypes.object.isRequired,
  itemSelected: PropTypes.number.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  favorite: PropTypes.func.isRequired,
  hideDetail: PropTypes.func.isRequired,
};

export default withStyles(styles)(CaseWorkerDetail);
