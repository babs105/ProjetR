import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Ionicon from 'react-ionicons';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3,
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  finishMessage: {
    textAlign: 'center',
    maxWidth: 600,
    margin: '0 auto',
    '& h4': {
      color: theme.palette.primary.main,
      '& span': {
        textAlign: 'center',
        display: 'block',
        '& svg': {
          height: 'auto',
          width: 148
        }
      }
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});


class Confirmation extends React.Component {
  render() {
    const { classes, initialValues } = this.props;
    return (
      <Fragment>
        <Typography variant="h6" gutterBottom>
      Confirmation
        </Typography>


        <div className={classes.finishMessage}>
          <Typography variant="h4" gutterBottom>
            <span>
              <Ionicon icon="ios-checkmark-circle-outline" />
            </span>
         Thank you for your registration.
          </Typography>
          <Typography variant="subtitle1">
         Your registration is successful&nbsp;.&nbsp;A email is sending for your confirmation&nbsp;&nbsp;


            <strong>
Company Name:
              {initialValues.get('companyName')}
            </strong>
            <strong>
Company Tel:
              {initialValues.get('telCompany')}
            </strong>
            <strong>
First Name:
              {initialValues.get('firstName')}
            </strong>
            <strong>
Last Name:
              {initialValues.get('lastName')}
            </strong>
            <strong>
Pack Name:
              {initialValues.get('pack')}
            </strong>
            <strong>
Promotion Name:
              {initialValues.get('promotion')}
            </strong>

            <strong>
Email:
              {initialValues.get('email')}
            </strong>

          </Typography>
          <Button variant="contained" color="primary" href="/app/pages/ecommerce" className={classes.button}>
       Verify your address Email
          </Button>
        </div>
      </Fragment>

    );
  }
}
Confirmation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Confirmation);
