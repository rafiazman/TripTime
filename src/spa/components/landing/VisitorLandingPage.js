/** @format */

import React from 'react';
import LandingSlide from './LandingSlide';
import scrollStyle from '../../css/snap-scroll.module.css';
import SiteInfo from './SiteInfo';

class VisitorLandingPage extends React.Component {
  render() {
    return (
      <div className={scrollStyle.container} dir='ltr'>
        <LandingSlide
          invitation={"Join Today - It's Free!"}
          previewAtLeft={true}
          image={'/img/bw_logo_trans.png'}
          title={'TripTime!'}
          description={'Plan a trip together, live.'}
        />

        <LandingSlide
          invitation={"Join Today - It's Free!"}
          previewAtLeft={false}
          image={'/img/feature-preview/map-plot.jpg'}
          title={'Plot'}
          description={'Pin new destinations on the map and your friends will see them immediately.'}
        />

        <LandingSlide
          invitation={"Join Today - It's Free!"}
          previewAtLeft={true}
          image={'/img/feature-preview/chat-box.jpg'}
          title={'Collaborate'}
          description={'Chat with your friends as you plan your next trip together.'}
        />

        <LandingSlide
          invitation={"Join Today - It's Free!"}
          previewAtLeft={false}
          image={'/img/feature-preview/timeline.jpg'}
          title={'Review'}
          description={'Review where you are planning to go at a glance in a timeline.'}
        />

        <SiteInfo />
      </div>
    );
  }
}

export default VisitorLandingPage;
