import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import { LoginFormV2 } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import { connect } from 'react-redux';
import {
  loginActions,
} from '../../../actions/LoginFormActions';

class LoginV2 extends React.Component {
  render() {
    const title = brand.name + ' - Login Version 2';
    const description = brand.desc;
    const { classes, onSubmit, errorMessage } = this.props;
    return (
      <div className={classes.rootFull}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.containerSide}>
          <Hidden smDown>
            <div className={classes.opening}>
              <Typography variant="h3" component="h1" className={classes.opening} gutterBottom>
                Welcome to&nbsp;
                {brand.name}
              </Typography>
              <Typography variant="h6" component="p" className={classes.subpening}>Please sign in to continue</Typography>
            </div>
          </Hidden>
          <div className={classes.sideFormWrap}>
            <LoginFormV2 onSubmit={onSubmit} error={errorMessage} />
          </div>
        </div>
      </div>
    );
  }
}

LoginV2.propTypes = {
  classes: PropTypes.object.isRequired,
};

const reducer = 'login';
const mapStateToProps = state => ({
  force: state, // force state from reducer
  deco: state.getIn([reducer, 'decoration']),
  userDetails: state.getIn([reducer, 'userDetails']),
  errorMessage: state.getIn([reducer, 'error']),
});

const constDispatchToProps = dispatch => ({
  onSubmit: (values) => dispatch(loginActions.login(values)),
});


const LoginMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(LoginV2);

export default withStyles(styles)(LoginMapped);
