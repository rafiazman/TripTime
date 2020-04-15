/** @format */

import React from 'react';
import LandingSlide from './LandingSlide';
import scrollStyle from '../../css/snap-scroll.module.css';
import SiteInfo from './SiteInfo';

const tripTimeIntro = {
  title: 'TripTime!',
  preview: '/img/bw_logo_trans.png',
  descriptions: ['Plan a trip together,', 'LIVE.'],
};

const featureIntros = [
  {
    title: 'Plot Destinations',
    preview: '/img/feature-preview/map-plot.jpg',
    descriptions: [
      'Pin new destinations',
      'on the map,',
      'and your friends will see them immediately.',
    ],
    invitation: 'Join Today - pin your trip!',
  },
  {
    title: 'Collaborate',
    preview: '/img/feature-preview/chat-box.jpg',
    descriptions: ['Chat with your friends', 'while planning'],
    invitation: 'Join Today - start a team!',
  },
  {
    title: 'Review Timeline',
    preview: '/img/feature-preview/timeline.jpg',
    descriptions: [
      'Review where you are going',
      'who is with you',
      'all on one timeline.',
    ],
    invitation: 'Join Today - build a plan!',
  },
];

class VisitorLandingPage extends React.Component {
  render() {
    return (
      <div className={scrollStyle.container} dir='ltr'>
        <LandingSlide
          intro={tripTimeIntro}
          invitation={"Join Today - It's Free!"}
          previewAtLeft={true}
        />
        {featureIntros.map((featureIntro, index) => (
          <LandingSlide
            intro={featureIntro}
            key={index}
            invitation={featureIntro.invitation}
            previewAtLeft={index % 2 === 1}
          />
        ))}
        <SiteInfo />
      </div>
    );
  }
}

export default VisitorLandingPage;
