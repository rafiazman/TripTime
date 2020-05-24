/** @format */

import React from 'react';
import tagStyles from '../../css/trip-tag.module.css';
import layoutStyles from '../../css/layout.module.css';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faChevronCircleLeft,
} from '@fortawesome/free-solid-svg-icons';

const linkNames = ['Timeline', 'Map', 'Calendar', 'Tools'];

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarPopped: false,
    };
  }

  toggleSideBar() {
    this.setState(state => ({ sideBarPopped: !state.sideBarPopped }));
  }

  render() {
    return (
      <div
        className={
          this.state.sideBarPopped ? layoutStyles.aside : layoutStyles.foldAside
        }
      >
        <div
          className={
            this.state.sideBarPopped
              ? layoutStyles.toggleBarPopped
              : layoutStyles.toggleSideBar
          }
          onClick={() => this.toggleSideBar()}
        >
          {this.state.sideBarPopped ? (
            <FontAwesomeIcon icon={faChevronCircleLeft} />
          ) : (
            <>
              <FontAwesomeIcon icon={faCircle} />
              <FontAwesomeIcon icon={faCircle} />
              <FontAwesomeIcon icon={faCircle} />
            </>
          )}
        </div>
        <div className={layoutStyles.sideBar}>
          <div className={'links-container'}>
            {linkNames.map((linkName, index) => (
              <TripLink
                tripID={this.props.router.query.id}
                linkName={linkName}
                isActive={this.props.activeLink === linkName}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
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
      <Link href={`/trip/${this.props.tripID}/${linkName.toLowerCase()}`}>
        <a style={tripAnchorStyle}>
          <div
            className={isActive ? tagStyles.active : tagStyles.tag}
            style={isActive ? activeBackgroundStyle : backgroundImageStyle}
          >
            <span className={tagStyles.name}>{linkName}</span>
          </div>
        </a>
      </Link>
    );
  }
}

TripLink.propTypes = {
  linkName: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  tripID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

SideBar.propTypes = {
  router: PropTypes.object.isRequired,
  activeLink: PropTypes.string.isRequired,
};
