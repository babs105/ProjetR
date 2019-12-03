import React from 'react';
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
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { bindActionCreators } from 'redux';
import { PapperBlock } from 'dan-components';
import { connect } from 'react-redux';
import {
  closeNotifAction,
  documentActions
} from 'dan-actions/DocumentActions';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import GroupIcon from '@material-ui/icons/Group';
import EventIcon from '@material-ui/icons/Event';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import { Link } from 'react-router-dom';
import {
  folderActions
} from 'dan-actions/FolderActions';
import { DocumentListItems, otherDocumentListItems } from '../../../UiElements/demos/DrawerMenu/menuDocument';
import DocumentTable from './DocumentTable';

const drawerWidth = 240;

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
  'content-right': {
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

class Document extends React.Component {
  state = {
    open: false,
    anchor: 'left',
  };

  componentDidMount() {
    const items = this.props.location.state;
    this.props.getAllDocument(items);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value,
    });
  };

  render() {
    const {
      classes, theme, dataTable, onDelete, onSubmit
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
        <List>
          <div>
            <ListItem button>
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText primary="Document" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AvTimerIcon />
              </ListItemIcon>
              <ListItemText primary="Planning" />
            </ListItem>
            <ListItem button component={Link} to={{ pathname: '/app/caseWorker', state: { dataTable } }}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="CaseWorker" />
            </ListItem>
          </div>
        </List>
        <Divider />
        <List>{otherDocumentListItems}</List>
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
          desc="Create and View all your documents"
          title="List of Documents"
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
                Document
                </Typography>
                {afterBtn}
              </Toolbar>
            </AppBar>
            {before}
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <DocumentTable
                dataTable={dataTable}
                onDelete={onDelete}
                onSubmit={onSubmit}
              />
            </main>
            {after}
          </div>
        </PapperBlock>
      </div>
    );
  }
}

Document.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  dataTable: PropTypes.object.isRequired
};

const reducer = 'document';

const mapStateToProps = state => ({
  force: state, // force state from reducer
  dataTable: state.getIn([reducer, 'dataTable']),
  messageNotif: state.getIn([reducer, 'notifMsg']),
});

const mapDispatchToProps = dispatch => ({
  getAllDocument: (values) => dispatch(folderActions.getAllDocument(values)),
  onSubmit: (values) => dispatch(documentActions.createDocument(values)),
  onDelete: (a, b) => dispatch(documentActions.deleteDocument(a, b)),
  closeNotif: bindActionCreators(closeNotifAction, dispatch),
});

const DocumentMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Document);

export default withStyles(styles, { withTheme: true })(DocumentMapped);
