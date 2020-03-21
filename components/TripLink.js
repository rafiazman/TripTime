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
  const href = linkName.toLowerCase();

  return (
    <Link href={href}>
      <a style={tripAnchorStyle}>
        <TripTag
          tagName={linkName}
          isActive={router.pathname === '/' + href.toLowerCase()}
        />
      </a>
    </Link>
  );
}

TripLink.propTypes = {
  linkName: PropTypes.string.isRequired,
};

export default TripLink;
