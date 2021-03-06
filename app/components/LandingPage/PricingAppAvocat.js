import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PricingCard from '../CardPaper/PricingCard';
import Title from './Title';
import styles from './landingStyle-jss';

class PricingAppAvocat extends React.Component {
  render() {
    const { classes, slideMode } = this.props;
    return (
      <div className={classes.pricing}>
        <div className={slideMode ? classes.fullWidth : classes.container}>
          {/* <Title title="Pricing" desc="Cras convallis lacus orci, tristique tincidunt magna consequat in." align="center" monocolor={slideMode && true} /> */}
          <Grid container className={classes.root} spacing={10} alignItems="center" justify="center">
            <Grid item sm={4} xs={6}>
              <PricingCard
                title="Basic"
                price="$24"
                tier="cheap"
                feature={['Vel fermentum', 'Aenean facilisis vitae', 'Vestibulum nec', 'Pellentesque ac bibendum', 'Vivamus sit amet']}
              />
            </Grid>
            <Grid item sm={4} xs={6}>
              <PricingCard
                title="Premium"
                price="$200"
                tier="expensive"
                feature={['Vel fermentum', 'Aenean facilisis vitae', 'Vestibulum nec', 'Pellentesque ac bibendum', 'Vivamus sit amet']}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

PricingAppAvocat.propTypes = {
  classes: PropTypes.object.isRequired,
  slideMode: PropTypes.bool,
};

PricingAppAvocat.defaultProps = {
  slideMode: false
};

export default withStyles(styles)(PricingAppAvocat);
