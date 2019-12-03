import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import {
  fetchAction,
  showDetailAction,
  hideDetailAction,
  submitAction,
  editAction,
  addAction,
  closeAction,
  removeAction,
  addToFavoriteAction,
  searchAction,
  closeNotifAction,
  caseWorkerActions
} from 'dan-actions/CaseWorkerActions';
import {
  folderActions
} from 'dan-actions/FolderActions';
import {
  CaseWorkerList,
  CaseWorkerDetail,
  AddCaseWorker,
  Notification
} from 'dan-components';
import styles from 'dan-components/CaseWorker/caseWorker-jss';

class CaseWorker extends React.Component {
  componentDidMount() {
    const dataTable = this.props.location.state;
    this.props.getAllCaseWorker(dataTable);
  }

  submitCaseWorker = (item, avatar) => {
    const { onSubmit } = this.props;
    onSubmit(item, avatar);
  }

  render() {
    const title = brand.name + ' - CaseWorker';
    const description = brand.desc;
    const {
      classes,
      dataCase,
      itemSelected,
      onShowDetail,
      hideDetail,
      avatarInit,
      open,
      showMobileDetail,
      add,
      edit,
      close,
      onRemove,
      favorite,
      keyword,
      search,
      closeNotif,
      messageNotif
    } = this.props;
    console.log('EDIT');
    console.log(edit);
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <Notification close={() => closeNotif()} message={messageNotif} />
        <div className={classes.root}>
          <CaseWorkerList
            addFn
            total={dataCase.size}
            addCaseWorker={add}
            clippedRight
            itemSelected={itemSelected}
            dataCase={dataCase}
            showDetail={onShowDetail}
            search={search}
            keyword={keyword}
          />
          <CaseWorkerDetail
            showMobileDetail={showMobileDetail}
            hideDetail={hideDetail}
            dataCaseWorker={dataCase}
            itemSelected={itemSelected}
            edit={edit}
            remove={onRemove}
            favorite={favorite}
          />
        </div>
        <AddCaseWorker
          addCaseWorker={add}
          openForm={open}
          closeForm={close}
          submit={this.submitCaseWorker}
          avatarInit={avatarInit}
        />
      </div>
    );
  }
}

CaseWorker.propTypes = {
  classes: PropTypes.object.isRequired,
  avatarInit: PropTypes.string.isRequired,
  onShowDetail: PropTypes.func.isRequired,
  hideDetail: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  showMobileDetail: PropTypes.bool.isRequired,
  add: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  favorite: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  dataCase: PropTypes.object.isRequired,
  itemSelected: PropTypes.number.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired,
};

const reducer = 'caseWorker';
const mapStateToProps = state => ({
  force: state, // force state from reducer
  avatarInit: state.getIn([reducer, 'avatarInit']),
  dataCase: state.getIn([reducer, 'caseWorkerList']),
  itemSelected: state.getIn([reducer, 'selectedIndex']),
  keyword: state.getIn([reducer, 'keywordValue']),
  open: state.getIn([reducer, 'openFrm']),
  showMobileDetail: state.getIn([reducer, 'showMobileDetail']),
  messageNotif: state.getIn([reducer, 'notifMsg']),
});

const constDispatchToProps = dispatch => ({
  getAllCaseWorker: (values) => dispatch(folderActions.getAllCaseWorker(values)),
  onShowDetail: (caseWorkerNumber) => dispatch(caseWorkerActions.getCaseWorker(caseWorkerNumber)),
  fetchData: bindActionCreators(fetchAction, dispatch),
  showDetail: bindActionCreators(showDetailAction, dispatch),
  hideDetail: () => dispatch(hideDetailAction),
  submit: bindActionCreators(submitAction, dispatch),
  onSubmit: (values, avatar) => dispatch(caseWorkerActions.createCaseWorker(values, avatar)),
  onRemove: (caseWorkerNumber) => dispatch(caseWorkerActions.deleteCaseWorker(caseWorkerNumber)),
  edit: bindActionCreators(editAction, dispatch),
  add: () => dispatch(addAction),
  close: () => dispatch(closeAction),
  remove: bindActionCreators(removeAction, dispatch),
  favorite: bindActionCreators(addToFavoriteAction, dispatch),
  search: bindActionCreators(searchAction, dispatch),
  closeNotif: () => dispatch(closeNotifAction),
});

const CaseWorkerMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(CaseWorker);

export default withStyles(styles)(CaseWorkerMapped);
