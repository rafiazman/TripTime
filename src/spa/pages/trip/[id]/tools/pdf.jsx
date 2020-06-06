/** @format */

import React from 'react';

import TripDocument from '../../../../components/pdf/TripDocument';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import TripTeamLayout from '../../../../components/layout/TripTeamLayout';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from '../../../../css/pdf.module.css';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox, faDownload } from '@fortawesome/free-solid-svg-icons';
import { TripContext } from '../../../../contexts/TripContext';
import { AuthContext } from '../../../../contexts/AuthContext';

export default function Pdf({ tripID }) {
  return (
    <AuthContext.Consumer>
      {({ currentUser }) => (
        <TripContext.Consumer>
          {({
            trip,
            activities,
            travels,
            travelsLoading,
            activitiesLoading,
            tripLoading,
          }) => (
            <TripTeamLayout
              user={currentUser}
              activeLink={'Tools'}
              tripID={tripID}
            >
              {activitiesLoading || travelsLoading || tripLoading ? (
                <div className={styles.pdfLoading}>
                  <ReactLoading type='spinningBubbles' color='#ff4200' />
                  <p> Generating your trip plan pdf...</p>
                </div>
              ) : (
                <div className={styles.pdfToolContainer}>
                  <div className={styles.optionsContainer}>
                    <span>
                      <Link href={'../tools'}>
                        <a>
                          <FontAwesomeIcon icon={faToolbox} />
                          Back to Tool Box
                        </a>
                      </Link>
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faDownload} />
                      <PDFDownloadLink
                        document={
                          <TripDocument
                            activities={activities}
                            travels={travels}
                            trip={trip}
                          />
                        }
                        fileName={`${trip.name}.pdf`}
                      >
                        {({ loading }) =>
                          loading ? 'Loading document...' : 'Download File'
                        }
                      </PDFDownloadLink>
                    </span>
                  </div>
                  <div>
                    <PDFViewer width={'100%'} height={'100%'}>
                      <TripDocument
                        activities={activities}
                        travels={travels}
                        trip={trip}
                      />
                    </PDFViewer>
                  </div>
                </div>
              )}
            </TripTeamLayout>
          )}
        </TripContext.Consumer>
      )}
    </AuthContext.Consumer>
  );
}
Pdf.getInitialProps = ({ query }) => {
  return { tripID: query.id };
};

Pdf.propTypes = {
  tripID: PropTypes.string,
};
