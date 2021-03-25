import React from 'react';

import Link from '../../Shared/Link';

const Footer = () => (
  <div className="Footer">
    <div>
      <small>
        <span className="Footer-text">Built by</span>
        {' '}
        <Link
          className="Footer-link"
          href="https://www.robinwieruch.de"
        >
          Robin Wieruch
        </Link>
        {' '}
        <span className="Footer-text">with &hearts;</span>
      </small>
    </div>
    <div>
      <small>
        <span className="Footer-text">
          Interested in GraphQL, Apollo and React?
        </span>
        {' '}
        <Link
          newWindow={false}
          className="Footer-link"
          href="https://www.getrevue.co/profile/rwieruch"
          toolTip="Open in same window"
        >
          Get updates
        </Link>
        {' '}
        <span className="Footer-text">
          about upcoming articles, books &
        </span>
        {' '}
        <Link
          newWindow
          className="Footer-link"
          href="https://roadtoreact.com"
          toolTip="Open in new window"
        >
          courses
        </Link>
        <span className="Footer-text">.</span>
      </small>
    </div>
  </div>
);

export default Footer;
