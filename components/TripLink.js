import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types';

function TripLink({ href, children }){
  const router = useRouter();

  let className = children.props.className || '';
  if (router.pathname === href) {
    className = `${className} selected`
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>
}

TripLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired
};

export default TripLink;
