import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { isWidthDown } from '@material-ui/core/withWidth';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { connect } from 'react-redux';

import {
  AddressForm,
  CompanyInfoForm,
  SubscriptionForm,
  PaymentForm,
  Confirmation,
  SideReview
} from 'dan-components';

import {

  closeNotifAction,
  registrationActions
} from 'dan-actions/RegistrationActions';

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
    paddingRight: theme.spacing.unit * 20,
    paddingLeft: theme.spacing.unit * 20
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

class Registration extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   steps: ['Company Info', 'Subscription', 'Confirmation']
    // };
  }

  render() {
    const {
      width, classes, onSubmit, steps, nextPage, isBasic, isPremium, previousPage, page, register, error, isDemo, goToDemo, goToBasic, goToPremium
    } = this.props;
    console.log('STATE', this.state);
    console.log('Page', page);
    return (
      <Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Fragment>
              <Grid container spacing={24}>
                <Grid item xs={12} md={12}>
                  <Stepper activeStep={page} className={classes.stepper} alternativeLabel={isWidthDown('sm', width)}>
                    {steps.map(label => (
                      <Step key={label}>
                        <StepLabel>
                          {label}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  {error && (<div>{error}</div>)}
                  {page === 0 && (isDemo ? (<CompanyInfoForm classes={classes} isDemo={isDemo} onSubmit={onSubmit} goToDemo={goToDemo} initialValues={register} />) : (<CompanyInfoForm classes={classes} isDemo={isDemo} onSubmit={nextPage} goToDemo={goToDemo} initialValues={register} />))}
                  {page === 1 && (<SubscriptionForm previousPage={previousPage} onSubmit={nextPage} isPremium={isPremium} isBasic={isBasic} goToBasic={goToBasic} goToPremium={goToPremium} initialValues={register} />)}
                  {page === 2 && (<Confirmation previousPage={previousPage} onSubmit={onSubmit} initialValues={register} />)}

                </Grid>
              </Grid>
            </Fragment>
          </Paper>
        </main>
      </Fragment>
    );
  }
}
Registration.propTypes = {
  messageNotif: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired
};

const reducer = 'registration';
const mapStateToProps = state => ({
  force: state, // force state from reducer
  page: state.getIn([reducer, 'page']),
  register: state.getIn([reducer, 'register']),
  error: state.getIn([reducer, 'error']),
  messageNotif: state.getIn([reducer, 'notifMsg']),
  steps: state.getIn([reducer, 'steps']),
  isDemo: state.getIn([reducer, 'isDemo']),
  isBasic: state.getIn([reducer, 'isBasic']),
  isPremium: state.getIn([reducer, 'isPremium'])
});
const constDispatchToProps = (dispatch) => ({
  onSubmit: (values) => { dispatch(registrationActions.submitRegistration(values)); },
  //   nextPage: (values) => {dispatch(registrationActions.goToNextPageTest(values))},
  nextPage: (values) => { dispatch(registrationActions.goToNextPage(values)); },
  // nextPage:(values) =>{(console.log('VALUES',values))},
  previousPage: () => { dispatch(registrationActions.goToPreviousPage()); },
  goToDemo: () => { dispatch(registrationActions.goToDemo()); },
  goToBasic: () => { dispatch(registrationActions.goToBasic()); },
  goToPremium: () => { dispatch(registrationActions.goToPremium()); },
});
const RegistrationMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(Registration);

export default withStyles(styles)(RegistrationMapped);
