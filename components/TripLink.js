/** @format */

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import TripTag from './TripTag';

const tripAnchorStyle = {
  color: 'inherit',
  textDecoration: 'inherit',
};

function TripLink({ linkName }) {
  const router = useRouter();

  const isActive =
    router.pathname === '/' + linkName.toLowerCase() ||
    (router.pathname === '/' && linkName.toLowerCase() === 'dashboard');

  return (
    <Link href={'/' + linkName.toLowerCase()}>
      <a style={tripAnchorStyle}>
        <TripTag tagName={linkName} isActive={isActive} />
      </a>
    </Link>
  );
}

TripLink.propTypes = {
  linkName: PropTypes.string.isRequired,
};

export default TripLink;
