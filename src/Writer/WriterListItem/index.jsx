import React from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../Button';
import { DELETE_WRITER } from '../mutations';
import { GET_WRITERS } from '../queries';
import ErrorMessage from '../../Error';

const deleteWriterMutation = (writerId) => (
  <Mutation
    mutation={DELETE_WRITER}
    variables={{ id: writerId }}
    refetchQueries={[
      {
        query: GET_WRITERS,
      },
    ]}
  >
  {(deleteWriter, { data, loading, error }) => {
    const button = (
      <Button
        className="delete-book__button"
        onClick={deleteWriter}
      >
        {writerId}
      </Button>
    )

    if (error) {
      return (
        <div>
          <ErrorMessage error={error} />
          { button }
        </div>
      );
    }
    return (
      <div>
        {button}
      </div>
    );

  }}
  </Mutation>
);

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
    <span>
      {deleteWriterMutation(writer.id)}
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
