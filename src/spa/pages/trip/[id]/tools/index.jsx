/** @format */
import React from 'react';
import TripTeamLayout from '../../../../components/layout/TripTeamLayout';
import { AuthContext } from '../../../../contexts/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../../../css/tools.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

export default function Index() {
  const tripID = useRouter().query.id;
  return (
    <AuthContext.Consumer>
      {({ currentUser, setAnchor }) => (
        <TripTeamLayout user={currentUser} tripID={tripID} activeLink={'Tools'}>
          {currentUser && (
            <div className={styles.toolsContainer}>
              <h1>Welcome to your TripTime ToolBox</h1>
              <div className={styles.toolBox}>
                <Link href='./tools/pdf'>
                  <a>
                    <span>
                      <FontAwesomeIcon icon={faFilePdf} />
                      Generate a trip plan PDF
                    </span>
                  </a>
                </Link>
              </div>
              <p>
                TripTime is working hard to make your team trip smoother - More
                tools to come!
              </p>
            </div>
          )}
          {!currentUser && (
            <div className={'fit-center'}>
              <Link href={'/login'}>
                <a onClick={() => setAnchor(`/trip/${tripID}/tools`)}>
                  {' '}
                  Log in{' '}
                </a>
              </Link>
              to access the tools
            </div>
          )}
        </TripTeamLayout>
      )}
    </AuthContext.Consumer>
  );
}
