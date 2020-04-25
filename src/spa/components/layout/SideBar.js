/** @format */

import React from 'react';
import style from '../../css/trip-tag.module.css';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Link from 'next/link';

const linkNames = ['Timeline', 'Map', 'Calendar', 'Tools'];

class SideBar extends React.Component {
  render() {
    const pathTokens = this.props.router.pathname.split('/');
    const currentElement = pathTokens[pathTokens.length - 1];
    return (
      <aside>
        <div>
          {linkNames.map((linkName, index) => (
            <TripLink
              linkName={linkName}
              isActive={currentElement.toLowerCase() === linkName.toLowerCase()}
              key={index}
            />
          ))}
        </div>
      </aside>
    );
  }
}

export default withRouter(SideBar);

const tripAnchorStyle = {
  color: 'inherit',
  textDecoration: 'inherit',
};

class TripLink extends React.Component {
  render() {
    const linkName = this.props.linkName;
    const isActive = this.props.isActive;
    const backgroundImageStyle = {
      backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,0.8)), 
    url('/img/menu-bg/${linkName.toLowerCase()}.jpg')`,
    };

    const activeBackgroundStyle = {
      backgroundImage: `linear-gradient(to right, rgba(255,66,0,0.8), rgba(255,66,0,0.8)), 
    url('/img/menu-bg/${linkName.toLowerCase()}.jpg')`,
    };
    return (
      <Link href={'/' + linkName.toLowerCase()}>
        <a style={tripAnchorStyle}>
          <div
            className={isActive ? style.active : style.tag}
            style={isActive ? activeBackgroundStyle : backgroundImageStyle}
          >
            <span className={style.name}>{linkName}</span>
          </div>
        </a>
      </Link>
    );
  }
}

TripLink.propTypes = {
  linkName: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

SideBar.propTypes = {
  router: PropTypes.object.isRequired,
};
