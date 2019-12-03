import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import classNames from 'classnames';
import Radio from '@material-ui/core/Radio';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PricingAppAvocat  from '../LandingPage/PricingAppAvocat'
import styles from '../CardPaper/cardStyle-jss'



class SubscriptionForm extends React.Component {

  constructor (props){
    super(props)
    }
  render(){
    const {
      classes,
      isPremium,
      isBasic,
      goToPremium,
      goToBasic
    } = this.props;
        const getTier = lv => {
          switch (lv) {
            case 'cheap':
              return classes.cheap;
            case 'expensive':
              return classes.expensive;
            case 'more-expensive':
              return classes.moreExpensive;
            default:
              return classes.free;
          }
        };
  return (
    <Fragment>
    <Grid container justify="left" spacing={24}>
            <Typography variant="h6" gutterBottom>
                Subscription
           </Typography>
      <form onSubmit={()=>{}}>
     <div style={{ marginTop: 20,marginBottom: 70}}>
            <Grid item xs={12} sm={12}>
            <Grid container justify="center" spacing={24}>
            <Grid item xs={12} sm={6}>
                        <Card className={classNames(classes.priceCard,getTier("cheap"))}>
                                <div className={classes.priceHead}>
                                <Typography variant="h5">Basic</Typography>
                                <Typography component="h4" variant="h2">$70</Typography>
                              </div>
                          <CardContent  className={classes.featureList}>
                            <ul> 
                            {['Vel fermentum', 'Aenean facilisis vitae', 'Vestibulum nec', 'Pellentesque ac bibendum', 'Vivamus sit amet'].map((item, index) => (
                                <li key={index.toString()}>{item}</li>
                              ))}
                            </ul>
                          </CardContent>
                            <CardActions className={classes.btnArea}>
                                        <FormControlLabel  color='primary'
                                          value="basic"
                                          control={<Radio className={classes.featureList}
                                          onClick={goToBasic}
                                          checked={isBasic}/>}
                                          label="Active"
                                          labelPlacement="end"
                                        />
                            </CardActions>
                        </Card >   
        
          </Grid>
          <Grid item xs={12} sm={6}>
           <Card className={classNames(classes.priceCard,getTier("expensive"))}>
           <div className={classes.priceHead}>
              <Typography variant="h5">Premium</Typography>
              <Typography component="h4" variant="h2">$200</Typography>
            </div>
        <CardContent  className={classes.featureList}>
        <ul> 
           {['Vel fermentum', 'Aenean facilisis vitae', 'Vestibulum nec', 'Pellentesque ac bibendum', 'Vivamus sit amet'].map((item, index) => (
              <li key={index.toString()}>{item}</li>
            ))}
           </ul>
        </CardContent>
        <CardActions className={classes.btnArea}>
        <FormControlLabel  className={classes.label}
          value="premium"
          control = { <Radio className={classes.featureList}
          onClick={goToPremium}
          checked={ isPremium}/>}
          label="Active"
          labelPlacement="end" className={classes.featureList}
        />
        </CardActions>
      </Card> 
       
       </Grid>
       </Grid>
       </Grid>
       </div>
       <Grid item xs={12} sm={12}>
            <Typography variant="h6" gutterBottom>
              Payment method
            </Typography>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
              <TextField required id="cardName" label="Name on card" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required id="cardNumber" label="Card number" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required id="expDate" label="Expiry date" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    id="cvv"
                    label="CVV"
                    helperText="Last three digits on signature strip"
                    fullWidth
                  />
                </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                  label="Remember credit card details for next time"
                />
              </Grid>
          </Grid>
      </Grid>
      <Grid container justify ="center" spacing={24} >
                <Grid item >   
                  <Button variant="contained"color="primary" size="large">
                            Back
                  </Button>
                </Grid>
                <Grid item>
                   <Button variant="contained"color="primary" size="large" type="submit">
                          Submit
                  </Button> 
               </Grid>
            
            </Grid>
      </form>
      </Grid>
  </Fragment>
  
  );
  }
}

export default withStyles(styles)(SubscriptionForm);
