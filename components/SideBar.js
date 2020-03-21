/** @format */

import React from 'react';
import TripLink from './TripLink';

function SideBar() {
  return (
    <aside>
      <div>
        <TripLink linkName={'Dashboard'} />
        <TripLink linkName={'Map'} />
        <TripLink linkName={'Calendar'} />
        <TripLink linkName={'Tools'} />
      </div>
    </aside>
  );
}

export default SideBar;
