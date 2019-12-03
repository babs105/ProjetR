import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import data from 'dan-api/apps/timelineData';
import {
  fetchAction,
  postAction,
  toggleLikeAction,
  fetchCommentAction,
  postCommentAction,
  closeNotifAction,
  timeLineActions
} from 'dan-actions/TimeLineActions';
import {
  Timeline,
  WritePost,
  SideSection,
  Notification
} from 'dan-components';

class TimelineSocial extends React.Component {
  componentDidMount() {
    this.props.getAllTimeLine();
  }

  render() {
    const title = brand.name + ' - Social Media';
    const description = brand.desc;
    const {
      dataTimeLine,
      submitPost,
      submitLike,
      submitComment,
      fetchComment,
      commentIndex,
      closeNotif,
      messageNotif
    } = this.props;
    console.log('DATATIMELINE');
    console.log(dataTimeLine);
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <Notification close={() => closeNotif()} message={messageNotif} />
        <Grid
          container
          alignItems="flex-start"
          justify="flex-start"
          direction="row"
          spacing={24}
        >
          <Grid item md={8} xs={12}>
            <div>
              {/* <WritePost submitPost={submitPost} /> */}
              <Timeline
                dataTimeline={dataTimeLine}
                onlike={submitLike}
                submitComment={submitComment}
                fetchComment={fetchComment}
                commentIndex={commentIndex}
              />
            </div>
          </Grid>
          <Grid item md={4} xs={12}>
            <SideSection />
          </Grid>
        </Grid>
      </div>
    );
  }
}

TimelineSocial.propTypes = {
  submitPost: PropTypes.func.isRequired,
  submitLike: PropTypes.func.isRequired,
  submitComment: PropTypes.func.isRequired,
  dataTimeLine: PropTypes.object.isRequired,
  fetchComment: PropTypes.func.isRequired,
  commentIndex: PropTypes.number.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired,
};

const reducer = 'timeLine';
const mapStateToProps = state => ({
  force: state, // force state from reducer
  dataTimeLine: state.getIn([reducer, 'timeLineList']),
  commentIndex: state.getIn([reducer, 'commentIndex']),
  messageNotif: state.getIn([reducer, 'notifMsg']),
});

const constDispatchToProps = dispatch => ({
  getAllTimeLine:() => dispatch(timeLineActions.getAllTimeLine()),
  fetchData: bindActionCreators(fetchAction, dispatch),
  submitPost: bindActionCreators(postAction, dispatch),
  submitComment: bindActionCreators(postCommentAction, dispatch),
  submitLike: bindActionCreators(toggleLikeAction, dispatch),
  fetchComment: bindActionCreators(fetchCommentAction, dispatch),
  closeNotif: () => dispatch(closeNotifAction),
});

const TimelineMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(TimelineSocial);

export default TimelineMapped;
