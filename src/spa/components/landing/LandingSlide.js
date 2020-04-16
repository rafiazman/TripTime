/** @format */

import React from 'react';
import styles from '../../css/landing-preview.module.css';
import scrollStyle from '../../css/snap-scroll.module.css';
import PropTypes from 'prop-types';
import JoinUsForm from './JoinUsForm';

class LandingSlide extends React.Component {
  render() {
    const image = this.props.image;
    const title = this.props.title;
    const alignLeft = this.props.alignLeft;
    const description = this.props.description;

    return (
      <div className={scrollStyle['slide']}>
        <div
          className={alignLeft ? styles.containerLeft : styles.containerRight}
        >
          <div
            className={this.props.isTitleSlide ? styles.logo : styles.preview}
          >
            <img src={image} alt={title} />
          </div>
          <div className={alignLeft ? styles.introLeft : styles.introRight}>
            <div>
              <h1>{title}</h1>
              <div>{description}</div>
              <JoinUsForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LandingSlide.propTypes = {
  isTitleSlide: PropTypes.bool,
  image: PropTypes.string,
  alignLeft: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default LandingSlide;
