import React from 'react';
import { Link } from 'react-router-dom';

export default function WriterListItem({ writer, match }) {
  return (
    <div className="writer-list__listrow" key={writer.id}>
      <span className="writer-list__name">
        <Link to={`${match.url}/${writer.id}/${writer.name}/${writer.surname}`}>{writer.name}</Link>
      </span >
      <span className="writer-list__surname">
        <Link to={`${match.url}/${writer.id}/${writer.name}/${writer.surname}`}>{writer.surname}</Link>
      </span>
      <span className="writer-list__homepage">
        <a href={writer.homepage} target="_blank" rel="noopener noreferrer">{writer.homepage}</a>
      </span>
    </div>
  );
}