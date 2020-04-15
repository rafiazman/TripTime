/** @format */

import React from 'react';
import styles from '../../css/landing-preview.module.css';
import scrollStyle from '../../css/snap-scroll.module.css';
import PropTypes from 'prop-types';
import JoinUsForm from './JoinUsForm';

const previewStyles = {
  'TripTime!': styles.logoPreview,
  'Review': styles.timelinePreview,
  'Plot': styles.mapPreview,
  'Collaborate': styles.chatPreview,
};

class LandingSlide extends React.Component {
  render() {
    const image = this.props.image;
    const title = this.props.title;
    const alignLeft = this.props.alignLeft;
    const description = this.props.description;

    return (
      <div className={scrollStyle['slide']}>
        <div className={alignLeft ? styles.containerLeft : styles.containerRight}>

          <div className={previewStyles[title]}>
            <img src={image} alt={title} />
          </div>

          <div className={alignLeft ? styles.introLeft : styles.introRight}>
            <h1 className={styles.title}>{title}</h1>

            <div className={styles.descriptions}>
              {description}
            </div>

            <JoinUsForm invitation />
          </div>

        </div>
      </div>
    );

  }
}

LandingSlide.propTypes = {
  image: PropTypes.string,
  alignLeft: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default LandingSlide;
