/** @format */
import React from 'react';
import infoStyles from '../css/site-info.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faYoutube,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';

class SiteInfo extends React.Component {
  render() {
    return (
      <div className={infoStyles.container}>
        <div className={infoStyles.content}>
          <h1>
            <span className='logo-span'>
              <img
                className={infoStyles.logo}
                src='/img/logo.svg'
                alt='TripTime logo'
              />
              <span>TripTime</span>
            </span>
          </h1>

          <div className={infoStyles.links}>
            <h2 className='not-on-small-screen'>TripTime</h2>
            <p>
              <a>Home</a>
            </p>
            <p>
              <a>Features</a>
            </p>
            <p>
              <a>About Us</a>
            </p>
            <p>
              <a href='https://github.com/tantigers/TripTime'>Code on Github</a>
            </p>
          </div>

          <div className={infoStyles.follow}>
            <h2>Follow Us</h2>
            <div className={infoStyles.icons}>
              <a href='https://github.com/tantigers'>
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a href='https://www.youtube.com/'>
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a href='https://www.facebook.com/'>
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </div>
          </div>
          <p className={infoStyles.copyright}>
            &#169;2020 TripTime All Rights Reserved.
          </p>
        </div>
      </div>
    );
  }
}

export default SiteInfo;
