import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const WriterListItem = ({ writer, match }) => (
  <div className="writer-list__listrow" key={writer.id}>
    <span className="writer-list__name">
      <Link to={`${match.url}/${writer.id}/${writer.name}/${writer.surname}`}>{writer.name}</Link>
    </span>
    <span className="writer-list__surname">
      <Link to={`${match.url}/${writer.id}/${writer.name}/${writer.surname}`}>{writer.surname}</Link>
    </span>
    <span className="writer-list__homepage">
      <a href={writer.homepage} target="_blank" rel="noopener noreferrer">{writer.homepage}</a>
    </span>
  </div>
);

WriterListItem.propTypes = {
  writer: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    surname: PropTypes.string,
    homepage: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};

export default WriterListItem;
