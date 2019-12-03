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
  customerActions
} from 'dan-actions/CustomerActions';
import {
  CustomerList,
  CustomerDetail,
  AddCustomer,
  Notification
} from 'dan-components';
import styles from 'dan-components/Customer/customer-jss';

class Customer extends React.Component {
  componentDidMount() {
    this.props.getAllCustomer();
  }

  submitCustomer = (item, avatar) => {
    const { onSubmit } = this.props;
    onSubmit(item, avatar);
  }

  render() {
    const title = brand.name + ' - Customer';
    const description = brand.desc;
    const {
      classes,
      dataCustomer,
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
    console.log('DATACUSTOMER');
    console.log(dataCustomer);
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
          <CustomerList
            addFn
            total={dataCustomer.size}
            addCustomer={add}
            clippedRight
            itemSelected={itemSelected}
            dataCustomer={dataCustomer}
            showDetail={onShowDetail}
            search={search}
            keyword={keyword}
          />
          <CustomerDetail
            showMobileDetail={showMobileDetail}
            hideDetail={hideDetail}
            dataCustomer={dataCustomer}
            itemSelected={itemSelected}
            edit={edit}
            remove={onRemove}
            favorite={favorite}
          />
        </div>
        <AddCustomer
          addCustomer={add}
          openForm={open}
          closeForm={close}
          submit={this.submitCustomer}
          avatarInit={avatarInit}
        />
      </div>
    );
  }
}

Customer.propTypes = {
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
  dataCustomer: PropTypes.object.isRequired,
  itemSelected: PropTypes.number.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired,
};

const reducer = 'customer';
const mapStateToProps = state => ({
  force: state, // force state from reducer
  avatarInit: state.getIn([reducer, 'avatarInit']),
  dataCustomer: state.getIn([reducer, 'customerList']),
  itemSelected: state.getIn([reducer, 'selectedIndex']),
  keyword: state.getIn([reducer, 'keywordValue']),
  open: state.getIn([reducer, 'openFrm']),
  showMobileDetail: state.getIn([reducer, 'showMobileDetail']),
  messageNotif: state.getIn([reducer, 'notifMsg']),
});

const constDispatchToProps = dispatch => ({
  getAllCustomer: () => dispatch(customerActions.getAllCustomer()),
  onShowDetail: (customerNumber) => dispatch(customerActions.getCustomer(customerNumber)),
  fetchData: bindActionCreators(fetchAction, dispatch),
  showDetail: bindActionCreators(showDetailAction, dispatch),
  hideDetail: () => dispatch(hideDetailAction),
  submit: bindActionCreators(submitAction, dispatch),
  onSubmit: (values, avatar) => dispatch(customerActions.createCustomer(values, avatar)),
  onRemove: (customerNumber) => dispatch(customerActions.deleteCustomer(customerNumber)),
  edit: bindActionCreators(editAction, dispatch),
  add: () => dispatch(addAction),
  close: () => dispatch(closeAction),
  remove: bindActionCreators(removeAction, dispatch),
  favorite: bindActionCreators(addToFavoriteAction, dispatch),
  search: bindActionCreators(searchAction, dispatch),
  closeNotif: () => dispatch(closeNotifAction),
});

const CustomerMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(Customer);

export default withStyles(styles)(CustomerMapped);
