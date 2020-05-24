/** @format */

import React from 'react';
import ActivityCard from '../../../components/cards/ActivityCard';
import activities from '../../../app/dummy-data/activities';
import { AuthContext } from '../../../contexts/AuthContext';
import { TripContext } from '../../../contexts/TripContext';

import { render, screen, fireEvent } from '@testing-library/react';

describe('ActivityCard Layouts and Behaviours', function() {
  beforeEach(() => {
    render(
      <AuthContext.Provider value={{ currentUser: { id: 1, name: 'anran' } }}>
        <TripContext.Provider
          value={{
            updateOneActivity: () => {},
          }}
        >
          <ActivityCard
            onDelete={() => {}}
            onMap={false}
            activity={activities[0]}
            messageIfNoEvent={''}
            tripId={'1'}
          />
        </TripContext.Provider>
      </AuthContext.Provider>,
    );
  });

  // eslint-disable-next-line jest/expect-expect
  it('shows the activity name and description', () => {
    screen.getByText(activities[0].name);
    screen.getByText(activities[0].description);
  });

  it('has an icon to toggle note', () => {
    // no note displayed now
    expect(screen.queryByText(activities[0].notes[0].content)).toBeNull();
    // click toggle note
    fireEvent.click(screen.getByText('Show Notes'));
    // now the note is displayed
    screen.getByText(activities[0].notes[0].content);

    // click toggle note again
    fireEvent.click(screen.getByText('Hide Notes'));
    // now the note is hidden.
    expect(screen.queryByText(activities[0].notes[0].content)).toBeNull();
  });
});
