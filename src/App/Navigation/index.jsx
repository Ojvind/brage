import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../../constants/routes';

const Navigation = () => (
  <header className="Navigation">
    <div className="Navigation-link">
      <Link to={routes.WRITERS}>Writers</Link>
    </div>
  </header>
);

export default withRouter(Navigation);
