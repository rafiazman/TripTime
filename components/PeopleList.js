/** @format */

import React from 'react';
import Tooltip from './Tooltip';
import PropTypes from 'prop-types';

function PeopleList({ people }) {
  return (
    <div className={'horizontal-list'}>
      {people.map((person, index) => (
        <Tooltip
          key={index}
          text={person.name}
          component={
            <img src={person.avatarPath} alt='' className={'inline-avatar'} />
          }
        />
      ))}
    </div>
  );
}
PeopleList.propTypes = {
  people: PropTypes.array.isRequired,
};

export default PeopleList;
