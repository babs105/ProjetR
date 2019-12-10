import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Checkbox, TextField } from 'redux-form-material-ui';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Field, reduxForm } from 'redux-form/immutable';


class CompanyInfoForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      isDemo, goToDemo, initialValues, handleSubmit, pristine, submitting
    } = this.props;
    return (
      <Fragment>

        <Typography variant="h6" gutterBottom>
                Company Info
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container justify="center" spacing={24}>
            <Grid item xs={12} sm={6}>

              <Field
                required
                name="companyName"
                component={TextField}
                value={initialValues ? initialValues.get('companyName') : null}
                label="Company Name"
                fullWidth
              />

            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                required
                name="telCompany"
                value={initialValues ? initialValues.get('telCompany') : null}
                component={TextField}
                label="Tel Company"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                required
                name="firstName"
                value={initialValues ? initialValues.get('firstName') : null}
                label="First Name"
                component={TextField}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                required
                name="lastName"
                value={initialValues ? initialValues.get('lastName') : null}
                component={TextField}
                label="Last Name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Field
                required
                name="email"
                // value={initialValues?initialValues.get('email'):null}
                label="Email address"
                component={TextField}
                fullWidth
                autoComplete="eaddress"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                required
                component={TextField}
                value={initialValues ? initialValues.get('password') : null}
                name="password"
                type="password"
                label="Password"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                required
                name="confirmPassword"
                value={initialValues ? initialValues.get('confirmPassword') : null}
                component={TextField}
                type="password"
                label="Confirm Password"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={(
                  <Field
                    color="secondary"
                    checked={initialValues ? initialValues.get('isDemo') : null}
                    component={Checkbox}
                    onClick={goToDemo}
                    name="demo"
                  />
                )}
                label="Use the demo version and skip the subscription"
              />
            </Grid>
            <Grid item xs={12}>
              {isDemo ? (
                <div>
                  <FormControlLabel
                    control={(
                      <Field
                        name="checkbox"
                        component={Checkbox}
                      />
                    )}
                    label="Agree with"
                  />
                  <a href="#">Terms &amp; Condition</a>
                </div>
              )
                : null}
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={24}>
            {isDemo
              ? (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  disabled={submitting || pristine}
                >
                Submit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                >
                Next
                </Button>
              )}
          </Grid>
        </form>
      </Fragment>
    );
  }
}
CompanyInfoForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};
const CompanyInfoFormReduxed = reduxForm({
  form: 'registrationForm',
  enableReinitialize: true
})(CompanyInfoForm);

export default CompanyInfoFormReduxed;
