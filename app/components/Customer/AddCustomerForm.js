import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Type from 'dan-styles/Typography.scss';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField, Select } from 'redux-form-material-ui';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import InputAdornment from '@material-ui/core/InputAdornment';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import Bookmark from '@material-ui/icons/Bookmark';
import LocalPhone from '@material-ui/icons/LocalPhone';
import PermIdentity from '@material-ui/icons/PermIdentity';
import Email from '@material-ui/icons/Email';
import LocationOn from '@material-ui/icons/LocationOn';
import css from 'dan-styles/Form.scss';
import styles from './customer-jss';

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

class AddCustomerForm extends React.Component {
  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };

  render() {
    const {
      classes,
      reset,
      pristine,
      submitting,
      handleSubmit,
      onDrop,
      imgAvatar
    } = this.props;
    const trueBool = true;
    let dropzoneRef;
    const acceptedFiles = ['image/jpeg', 'image/png', 'image/bmp'];
    const fileSizeLimit = 3000000;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <section className={css.bodyForm}>
            <div>
              <Typography variant="button" className={Type.textCenter}>Upload Avatar</Typography>
              <Dropzone
                className={classes.hiddenDropzone}
                accept={acceptedFiles.join(',')}
                acceptClassName="stripes"
                onDrop={onDrop}
                maxSize={fileSizeLimit}
                ref={(node) => { dropzoneRef = node; }}
              />
              <div className={classes.avatarWrap}>
                <Avatar
                  alt="John Doe"
                  className={classes.uploadAvatar}
                  src={imgAvatar}
                />
                <Tooltip id="tooltip-upload" title="Upload Photo">
                  <IconButton
                    className={classes.buttonUpload}
                    component="button"
                    onClick={() => {
                      dropzoneRef.open();
                    }}
                  >
                    <PhotoCamera />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div>
              <Field
                name="name"
                component={TextField}
                placeholder="Name"
                label="Name"
                validate={required}
                required
                ref={this.saveRef}
                className={classes.field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermContactCalendar />
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div>
              <Field
                name="title"
                component={TextField}
                placeholder="Title"
                label="Title"
                className={classes.field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Bookmark />
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div>
              <Field
                name="age"
                component={TextField}
                placeholder="Age"
                label="Age"
                className={classes.field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentity />
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Sex</InputLabel>
                <Field
                  name="sex"
                  component={Select}
                  placeholder="Sex"
                  label="Sex"
                  className={classes.field}
                /*   InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Wc />
                      </InputAdornment>
                    )
                  }} */
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Field>
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Marital Status</InputLabel>
                <Field
                  name="maritalStatus"
                  component={Select}
                  placeholder="Marital Status"
                  label="Marital Status"
                  className={classes.field}
                  /*  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <People />
                      </InputAdornment>
                    )
                  }} */
                >
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Single2">Single</MenuItem>
                  <MenuItem value="Widow">Widow</MenuItem>
                </Field>
              </FormControl>
            </div>
            <div>
              <Field
                name="phone"
                component={TextField}
                placeholder="Phone"
                type="tel"
                label="Phone"
                className={classes.field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPhone />
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div>
              <Field
                name="email"
                component={TextField}
                placeholder="Email"
                type="email"
                validate={email}
                label="Email"
                className={classes.field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div>
              <Field
                name="address"
                component={TextField}
                placeholder="Address"
                label="Address"
                className={classes.field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  )
                }}
              />
            </div>
          </section>
          <div className={css.buttonArea}>
            <Button variant="contained" color="secondary" type="submit" disabled={submitting}>
              Submit
            </Button>
            <Button
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

AddCustomerForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  imgAvatar: PropTypes.string.isRequired,
};

const AddCustomerFormRedux = reduxForm({
  form: 'immutableAddCustomer',
  enableReinitialize: true,
})(AddCustomerForm);

const AddCustomerInit = connect(
  state => ({
    initialValues: state.getIn(['Customer', 'formValues'])
  })
)(AddCustomerFormRedux);

export default withStyles(styles)(AddCustomerInit);
