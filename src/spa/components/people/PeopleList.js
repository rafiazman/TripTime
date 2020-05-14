/** @format */

import React from 'react';
import Tooltip from '../Tooltip';
import PropTypes from 'prop-types';

class PeopleList extends React.Component {
  render() {
    return (
      <div className={'horizontal-list'}>
        {this.props.people.map((person, index) => (
          <Tooltip
            key={index}
            text={person.name}
            component={
              <img src={person.avatarPath} alt='' className={'block-avatar'} />
            }
          />
        ))}
        {this.props.addComponent}
      </div>
    );
  }
}
PeopleList.propTypes = {
  people: PropTypes.array.isRequired,
  addComponent: PropTypes.node,
};

export default PeopleList;
