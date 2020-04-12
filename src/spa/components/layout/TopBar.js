/** @format */
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const topBarImgStyle = {
  maxWdth: '2.2rem',
  maxHeight: '2.2rem',
  display: 'inline-block',
  margin: '5px',
};
const topBarSpanStyle = {
  padding: '2px 5px',
  fontSize: '1.5rem',
};
const topBarOptionStyle = {
  fontSize: '1rem',
  fontWeight: 'regular',
  position: 'absolute',
  right: '20px',
  padding: '2px 5px',
  display: 'flex',
  width: '10rem',
  justifyContent: 'space-between',
};
const headerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  padding: '0 20px',
  gridArea: 'header',
  fontSize: 'larger',
  lineHeight: '2em',
  fontWeight: 'bolder',
  backgroundColor: 'var(--page-background-color)',
  width: '100vw',
};

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    this.props.setUser(this);
  }

  render() {
    return (
      <header style={headerStyle}>
        <Link href={'/'}>
          <a>
            <img src='/img/logo.svg' alt='' style={topBarImgStyle} />
          </a>
        </Link>
        <span style={topBarSpanStyle}>TripTime!</span>
        {this.state.user ? (
          <span style={topBarOptionStyle}>
            {' '}
            <img
              src={this.state.user.picture}
              className={'inline-avatar'}
              alt={''}
              style={{ margin: '3px' }}
            />
            <Link href={'/profile'}>
              <a>Profile</a>
            </Link>
            <Link href={'api/logout'}>
              <a> Log out </a>
            </Link>
          </span>
        ) : (
          <span style={topBarOptionStyle}>
            <Link href={'api/login'}>
              <a> Log in </a>
            </Link>
          </span>
        )}
      </header>
    );
  }
}

TopBar.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
};
