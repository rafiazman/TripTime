/** @format */

import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import LinkToCopy from './LinkToCopy';
import axios from 'axios';
import styles from '../../css/invite.module.css';

export default function AddPeopleDialog({ onCancel, tripID }) {
  const [uuids, setUuids] = useState([]);
  const [isGetting, setIsGetting] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [getError, setGetError] = useState(undefined);
  const [generateError, setGenerateError] = useState(undefined);

  const hostName = process.env.API_HOSTNAME;
  const appHost = process.env.APP_HOSTNAME;

  useEffect(function() {
    axios
      .get(`${hostName}/api/trip/${tripID}/invites`)
      .then(res => {
        setUuids(res.data.uuids);
      })
      .catch(err =>
        setGetError(
          err.response.data.message || 'failed to get the invitation links',
        ),
      )
      .then(() => setIsGetting(false));
  }, []);

  const onClickGenerate = () => {
    setIsGenerating(true);
    axios
      .post(`${hostName}/api/trip/${tripID}/invite`)
      .then(res => {
        setUuids([...uuids, res.data.uuid]);
      })
      .catch(err =>
        setGenerateError(
          err.response.data.message || 'failed to generate an invitation link',
        ),
      )
      .then(() => setIsGenerating(false));
  };

  return (
    <Dialog open={true} onClose={onCancel} aria-labelledby='todo-dialog-title'>
      <DialogTitle id='todo-dialog-title'>
        Share the link with your friend to invite them, one for each person:)
      </DialogTitle>
      <DialogContent>
        {isGetting ? (
          <GetterLoading />
        ) : getError ? (
          <div className={'failed'}>
            <p>
              Sorry, we failed to get currently active invitation links because:
            </p>
            <p>{getError}</p>
          </div>
        ) : (
          <div className={styles.links}>
            {uuids.length > 0
              ? uuids.map((uuid, index) => (
                  <LinkToCopy link={`${appHost}/join/${uuid}`} key={index} />
                ))
              : 'No active link, click the button bellow to generate a new one'}

            {isGenerating ? (
              <GeneratorLoading />
            ) : generateError ? (
              <div>
                Sorry, failed to generate a link because: {generateError}
              </div>
            ) : (
              <button
                onClick={() => onClickGenerate()}
                className={styles.generateButton}
              >
                Generate new link
              </button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

AddPeopleDialog.propTypes = {
  tripID: PropTypes.number.isRequired,
  tripName: PropTypes.string,
  onCancel: PropTypes.func,
};

function GeneratorLoading() {
  return (
    <div className={styles.generatorLoading}>
      <ReactLoading type='spinningBubbles' color='#ff4200' width='2rem' />{' '}
      <p>Generating new invitation link</p>
    </div>
  );
}

function GetterLoading() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#ff6400',
      }}
    >
      <ReactLoading type='spinningBubbles' color='#ff4200' width='4rem' />
      <p>Loading current invitation links</p>
    </div>
  );
}
