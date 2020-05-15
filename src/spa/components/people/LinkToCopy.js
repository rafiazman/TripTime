/** @format */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/invite.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

export default function LinkToCopy({ link }) {
  const [inBrowser, setInBrowser] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    setInBrowser(true);
  }, []);

  return (
    <div className={styles.linkContainer}>
      <span>{link}</span>
      {inBrowser && (
        <button
          className={linkCopied ? styles.buttonCopied : styles.buttonToCopy}
          onClick={() => {
            navigator.clipboard.writeText(link).then(() => {
              setLinkCopied(true);
            });
          }}
        >
          <FontAwesomeIcon icon={linkCopied ? faCheck : faClipboard} />
          {linkCopied ? 'Link Copied' : 'Copy Link'}
        </button>
      )}
    </div>
  );
}

LinkToCopy.propTypes = {
  link: PropTypes.string.isRequired,
};
