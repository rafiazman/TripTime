/** @format */

import React from 'react';
import styles from '../../css/landing-preview.module.css';
import scrollStyle from '../../css/snap-scroll.module.css';
import PropTypes from 'prop-types';
import JoinUsForm from './JoinUsForm';

const previewStyles = {
  'TripTime!': styles.logoPreview,
  'Review Timeline': styles.timelinePreview,
  'Plot Destinations': styles.mapPreview,
  Collaborate: styles.chatPreview,
};

class LandingSlide extends React.Component {
  render() {
    const intro = this.props.intro;
    return (
      <div className={scrollStyle['slide']}>
        <div
          className={
            this.props.previewAtLeft
              ? styles.containerLeft
              : styles.containerRight
          }
        >
          <div className={previewStyles[intro.title]}>
            <img src={intro.preview} alt={intro.title} />
          </div>
          <div
            className={
              this.props.previewAtLeft ? styles.introLeft : styles.introRight
            }
          >
            <div>
              <h1 className={styles.title}>{intro.title}</h1>

              <div className={styles.descriptions}>
                {intro.descriptions.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>

              {this.props.invitation && (
                <JoinUsForm invitation={this.props.invitation} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LandingSlide.propTypes = {
  intro: PropTypes.object.isRequired,
  invitation: PropTypes.string.isRequired,
  previewAtLeft: PropTypes.bool.isRequired,
};

export default LandingSlide;
