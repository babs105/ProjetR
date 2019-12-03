import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Ionicon from 'react-ionicons';
import Title from './Title';
import styles from './landingStyle-jss';

let counter = 0;
function createFeatureData(icon, title, desc) {
  counter += 1;
  return {
    id: counter,
    icon,
    title,
    desc
  };
}

class Feature extends React.Component {
  state = {
    featureList: [
      createFeatureData('ios-folder-open', 'Folder Management', 'Folders management takes up most of your time. As a result, the AppAvocat application offers you a folder management module in which all the essential features and information are grouped together on your screen'),
      createFeatureData('md-calendar', 'Appointment Management', 'Scheduling appointments, events and court presence with alarms (+ constraints before to go to court). The lawyer will also have the possibility to inform about the postponements and the changes of dates during the whole procedure.'),
      createFeatureData('ios-briefcase', 'Business Management', 'Manage your business files and all the associated elements: speakers, letters, documents, benefits, invoices, deadlines...')
    ]
  }

  render() {
    const { classes, slideMode } = this.props;
    const { featureList } = this.state;
    return (
      <div className={classNames(classes.feature, slideMode ? classes.mono : classes.color)}>
        <div className={!slideMode ? classes.container : ''}>
          <Title title="Main Feature" align="center" monocolor={slideMode && true} />
          <Grid container className={classes.root} spacing={40}>
            { featureList.map(item => (
              <Grid key={item.id.toString()} item xs={12} md={4}>
                <Typography component="h4" variant="h6">
                  <span className={classes.icon}>
                    <Ionicon icon={item.icon} />
                  </span>
                  {item.title}
                </Typography>
                <Typography className={slideMode ? classes.colorWhite : ''}>
                  {item.desc}
                </Typography>
              </Grid>
            )) }
          </Grid>
        </div>
      </div>
    );
  }
}

Feature.propTypes = {
  classes: PropTypes.object.isRequired,
  slideMode: PropTypes.bool
};

Feature.defaultProps = {
  slideMode: false
};

export default withStyles(styles)(Feature);
