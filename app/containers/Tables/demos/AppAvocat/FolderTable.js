import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'redux-form/immutable';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  TextField,
  Switch
} from 'redux-form-material-ui';
import { CrudFolderTableForm, Notification, } from 'dan-components';
import { anchorTable } from '../FolderData';
const branch = 'folder';

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

class FolderTable extends Component {
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
      folderItems,
      openForm,
      initValues,
      closeNotif,
      messageNotif,
    } = this.props;

    return (
      <div>
        <Notification close={() => closeNotif(branch)} message={messageNotif} />
        <div className={classes.rootTable}>
          <CrudFolderTableForm
            dataTable={folderItems}
            openForm={openForm}
            anchor={anchorTable}
            dataInit={folderItems}
            title="Folders"
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
                name="folderNumber"
                component={TextField}
                placeholder="Folder Number"
                label="Folder Number"
                disabled
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="directoryNumber"
                component={TextField}
                placeholder="Directory Number"
                label="Directory Number"
                required
                validate={required}
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="lawyerNumber"
                component={TextField}
                placeholder="Lawyer Number"
                label="Lawyer Number"
                required
                validate={required}
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="name"
                component={TextField}
                placeholder="Name"
                label="Name"
                required
                validate={required}
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="mode"
                component={TextField}
                placeholder="Mode"
                label="Mode"
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="workingStart"
                component={TextField}
                placeholder="working Start"
                label="working Start"
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="workingEnd"
                component={TextField}
                placeholder="working End"
                label="working End"
                className={classes.field}
              />
            </div>
            <div className={classes.fieldBasic}>
              <FormLabel component="label">Important Favorite</FormLabel>
              <div className={classes.inlineWrap}>
                <FormControlLabel control={<Field name="important" component={Switch} />} label="Important" />
                <FormControlLabel control={<Field name="favorites" component={Switch} />} label="Favorite" />
              </div>
            </div>

          </CrudFolderTableForm>
        </div>
      </div>
    );
  }
}

renderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
};

FolderTable.propTypes = {
  folderItems: PropTypes.object.isRequired,
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

export default withStyles(styles)(FolderTable);
