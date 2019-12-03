import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import withWidth from '@material-ui/core/withWidth';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import Grid from '@material-ui/core/Grid';
import ShowcaseCard from '../CardPaper/ShowcaseCard';
import Title from './Title';
import styles from './landingStyle-jss';

function ParallaxDeco(props) {
  const { classes } = props;
  return (
    <div className={classes.parallaxWrap}>
      <ParallaxProvider>
        <div className={classes.bannerParallaxWrap}>
          <Parallax
            offsetYMax={70}
            offsetYMin={-200}
            slowerScrollRate
            tag="figure"
          >
            <svg
              fill="#fff"
              className={
                classNames(
                  classes.parallaxVertical,
                  classes.parallaxPetal1
                )
              }
            >
              <use xlinkHref="/images/decoration/petal3.svg#Petal-3" />
            </svg>
          </Parallax>
          <Parallax
            offsetYMax={100}
            offsetYMin={-200}
            slowerScrollRate
            tag="figure"
          >
            <svg
              fill="#fff"
              className={
                classNames(
                  classes.parallaxVertical,
                  classes.parallaxPetal2
                )
              }
            >
              <use xlinkHref="/images/decoration/petal4.svg#Petal-4" />
            </svg>
          </Parallax>
        </div>
      </ParallaxProvider>
    </div>
  );
}

ParallaxDeco.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ParallaxDecoStyled = withStyles(styles)(ParallaxDeco);

class Showcase extends React.Component {
  render() {
    const { classes, slideMode, width } = this.props;
    return (
      <section className={classes.showcase}>
        {!slideMode && <ParallaxDecoStyled />}
        <div className={classes.container}>
          <Grid container className={classes.root} spacing={40}>
            <Grid item sm={6} md={4} xs={12}>
              <Title title="Showcase" align={width === 'lg' ? 'left' : 'center'} monocolor={slideMode && true} />
              <ShowcaseCard
                title="Folder"
                desc="Aenean facilisis vitae purus facilisis semper."
                action="See Demo"
                image="/images/screen/dossier.jpg"
              />
              <ShowcaseCard
                title="Appointment"
                desc="Cras convallis lacus orci, tristique tincidunt magna"
                action="See Demo"
                image="/images/screen/appointment.jpg"
              />
            </Grid>
            <Grid item sm={6} md={4} xs={12}>
              <ShowcaseCard
                title="Bill"
                desc="Nulla vehicula leo ut augue tincidunt"
                action="See Demo"
                image="/images/screen/bill.jpg"
              />
              <ShowcaseCard
                title="Business"
                desc="Aenean facilisis vitae purus facilisis semper."
                action="see Demo"
                image="/images/screen/business.jpg"
              />
            </Grid>
            <Grid item sm={6} md={4} xs={12}>
              <div className={classes.lastShowcase}>
                <ShowcaseCard
                  title="Customer"
                  desc="Duis sed augue phasellus ante massa."
                  action="See Demo"
                  image="/images/screen/customer.jpg"
                />
                <ShowcaseCard
                  title="Accounting"
                  desc="Duis sed augue phasellus ante massa."
                  action="See Demo"
                  image="/images/screen/compta.jpg"
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </section>
    );
  }
}


Showcase.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  slideMode: PropTypes.bool
};

Showcase.defaultProps = {
  slideMode: false
};


export default withWidth()(withStyles(styles)(Showcase));
