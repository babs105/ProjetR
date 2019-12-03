import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { bindActionCreators } from 'redux';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { connect } from 'react-redux';
import { PapperBlock } from 'dan-components';
import {
  addAction,
  closeAction,
  editAction,
  closeNotifAction,
  folderActions
} from 'dan-actions/FolderActions';
import {
  directoryActions
} from 'dan-actions/DirectoryActions';
import { folderListItems, otherFolderListItems } from '../../../UiElements/demos/DrawerMenu/menuFolderData';
import FolderTable from './FolderTable';
const drawerWidth = 240;

const branch = 'folder';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    padding: '0 24px',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 3,
    marginRight: 3,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  '-contentright': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
  title: {
    flex: 1,
  },
  textField: {
    width: 100
  }
});

class Folder extends PureComponent {
  state = {
    open: false,
    anchor: 'left',
  };

  componentDidMount() {
    const items = this.props.location.state;
    this.props.getAllFolder(items);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      theme,
      addNew,
      closeForm,
      onSubmit,
      onRemoveRow,
      editRow,
      folderItems,
      openForm,
      initValues,
      closeNotif,
      messageNotif,
    } = this.props;
    const { anchor, open } = this.state;
    const drawer = (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>{folderListItems}</List>
        <Divider />
        <List>{otherFolderListItems}</List>
      </Drawer>
    );

    const menuBtn = (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={this.handleDrawerOpen}
        className={classNames(classes.menuButton, open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
    );

    let before = null;
    let after = null;
    let beforeBtn = null;
    let afterBtn = null;

    if (anchor === 'left') {
      before = drawer;
      beforeBtn = menuBtn;
    } else {
      after = drawer;
      afterBtn = menuBtn;
    }

    return (
      <div className={classes.root}>
        <PapperBlock
          whiteBg
          icon="ios-folder-outline"
          desc="Create and View all your folders"
          title="List of Folders"
        >
          <div className={classes.appFrame}>
            <AppBar
              position="absolute"
              className={classNames(classes.appBar, {
                [classes.appBarShift]: open,
                [classes[`appBarShift-${anchor}`]]: open,
              })}
            >
              <Toolbar disableGutters>
                {beforeBtn}
                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                FOLDER
                </Typography>
                {afterBtn}
              </Toolbar>
            </AppBar>
            {before}
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <FolderTable
                folderItems={folderItems}
                openForm={openForm}
                dataInit={folderItems}
                addNew={addNew}
                closeForm={closeForm}
                onSubmit={onSubmit}
                onRemoveRow={onRemoveRow}
                editRow={editRow}
                initValues={initValues}
                closeNotif={closeNotif}
                messageNotif={messageNotif}
              />
            </main>
            {after}
          </div>
        </PapperBlock>
      </div>
    );
  }
}

Folder.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  folderItems: PropTypes.object.isRequired,
  openForm: PropTypes.bool.isRequired,
  addNew: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  initValues: PropTypes.object.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired,
};

const reducer = 'folder';

const mapStateToProps = state => ({
  force: state, // force state from reducer
  folderItems: state.getIn([reducer, 'dataTable']),
  initValues: state.getIn([branch, 'formValues']),
  dataTable: state.getIn([branch, 'dataTable']),
  openForm: state.getIn([branch, 'showFrm']),
  messageNotif: state.getIn([branch, 'notifMsg']),
});

const mapDispatchToProps = dispatch => ({
  getAllFolder: (values) => dispatch(directoryActions.getAllFolder(values)),
  addNew: bindActionCreators(addAction, dispatch),
  closeForm: bindActionCreators(closeAction, dispatch),
  onSubmit: (values) => dispatch(folderActions.createFolder(values)),
  onRemoveRow: (folderNumber) => dispatch(folderActions.deleteFolder(folderNumber)),
  editRow: bindActionCreators(editAction, dispatch),
  closeNotif: bindActionCreators(closeNotifAction, dispatch),
});

const FolderMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Folder);

export default withStyles(styles, { withTheme: true })(FolderMapped);
