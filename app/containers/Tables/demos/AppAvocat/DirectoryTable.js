import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RadioGroup from '@material-ui/core/RadioGroup';
import {
  TextField
} from 'redux-form-material-ui';
import {
  addAction,
  closeAction,
  submitAction,
  removeAction,
  editAction,
  closeNotifAction,
  directoryActions
} from 'dan-actions/DirectoryActions';
import { CrudTableForm, Notification, PapperBlock } from 'dan-components';
import { anchorTable } from '../DirectoryData';

const branch = 'directory';

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

// validation functions
const required = value => (value == null ? 'Required' : undefined);
/* const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
); */

const styles = ({
  root: {
    flexGrow: 1,
  },
  field: {
    width: '100%',
    marginBottom: 20
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  }
});

class DirectoryTable extends PureComponent {
  componentDidMount() {
    this.props.getAll();
  }

  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };

  render() {
    const {
      classes,
      addNew,
      closeForm,
      onSubmit,
      onRemoveRow,
      editRow,
      directoryItems,
      openForm,
      initValues,
      closeNotif,
      messageNotif,
    } = this.props;

    return (
      <div>
        <Notification close={() => closeNotif(branch)} message={messageNotif} />
        <div className={classes.rootTable}>
          <PapperBlock
            whiteBg
            icon="ios-folder-outline"
            desc="Create and View all your directories"
            title="List of Directory"
          >
            <CrudTableForm
              dataTable={directoryItems}
              openForm={openForm}
              anchor={anchorTable}
              dataInit={directoryItems}
              title="Directory"
              addNew={addNew}
              closeForm={closeForm}
              submit={onSubmit}
              removeRow={onRemoveRow}
              editRow={editRow}
              branch={branch}
              initValues={initValues}
            >
              {/* Create Your own form, then arrange or custom it as You like */}
              <div>
                <Field
                  name="directoryNumber"
                  component={TextField}
                  placeholder="Directory Number"
                  label="Directory Number"
                  disabled
                  className={classes.field}
                />
              </div>
              <div>
                <Field
                  name="name"
                  component={TextField}
                  placeholder="Directory Name"
                  label="Directory Name"
                  required
                  validate={required}
                  className={classes.field}
                />
              </div>
              <div>
                <Field
                  name="customerNumber"
                  component={TextField}
                  placeholder="Customer"
                  label="Customer"
                  required
                  validate={required}
                  className={classes.field}
                />
              </div>

            </CrudTableForm>
          </PapperBlock>
        </div>
      </div>
    );
  }
}

renderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
};

DirectoryTable.propTypes = {
  directoryItems: PropTypes.object.isRequired,
  openForm: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  addNew: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  initValues: PropTypes.object.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired,
};

const reducer = 'directory';

const mapStateToProps = state => ({
  force: state, // force state from reducer
  directoryItems: state.getIn([reducer, 'dataTable']),
  initValues: state.getIn([branch, 'formValues']),
  dataTable: state.getIn([branch, 'dataTable']),
  openForm: state.getIn([branch, 'showFrm']),
  messageNotif: state.getIn([branch, 'notifMsg']),
});

const mapDispatchToProps = dispatch => ({
  getAll: () => dispatch(directoryActions.getAll()),
  addNew: bindActionCreators(addAction, dispatch),
  closeForm: bindActionCreators(closeAction, dispatch),
  submit: bindActionCreators(submitAction, dispatch),
  onSubmit: (values) => dispatch(directoryActions.createDirectory(values)),
  onRemoveRow: (directoryNumber) => dispatch(directoryActions.deleteDirectory(directoryNumber)),
  removeRow: bindActionCreators(removeAction, dispatch),
  editRow: bindActionCreators(editAction, dispatch),
  closeNotif: bindActionCreators(closeNotifAction, dispatch),
});

const DirectoryTableMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(DirectoryTable);

export default withStyles(styles)(DirectoryTableMapped);
