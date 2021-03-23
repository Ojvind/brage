import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import { GET_BOOK } from '../queries';
import { UPDATE_BOOK } from '../mutations';

import Button from '../../Button';
import Input from '../../Input';
import ErrorMessage from '../../Error';
import Label from '../../Shared/Label';

function toggleChange(updateBook, toggleEdit, edit) {
  updateBook();
  toggleEdit(!edit);
}

function BookListItemDetail(props) {
  const { book } = props;

  const [edit, toggleEdit] = useState(false);
  const [title, onTitleChange] = useState(book.title);
  const [url, onUrlChange] = useState(book.url);
  const [yearPublished, onYearPublishedChange] = useState(book.yearPublished);
  const [yearRead, onYearReadChange] = useState(book.yearRead);

  const editIcon = <FontAwesomeIcon icon={faEdit} />;

  return (
    <div className="App-content_small-header">
      <div>
          <Label variant="h2">Book</Label>
        {
          (!edit)
            ? <Label variant="h4">{title}</Label>
            : <Input onChange={(e) => onTitleChange(e.target.value)} inputLabel="Title" value={title} />
        }
        {
          (!edit)
            ? <Label 
                variant="h4" 
                isLink
              >
                {url}
              </Label>
            : <Input onChange={(e) => onUrlChange(e.target.value)} inputLabel="Url" value={url} />
        }
        {
          (!edit)
            ? <Label variant="h4">{yearPublished}</Label>
            : <Input onChange={(e) => onYearPublishedChange(e.target.value)} inputLabel="Published year" value={yearPublished} />
        }
        {
          (!edit)
            ? <Label variant="h4">{yearRead}</Label>
            : <Input onChange={(e) => onYearReadChange(e.target.value)} inputLabel="Read year" value={yearRead} />
        }
        {
          (!edit)
            ? (
              <button
                type="button"
                onClick={() => toggleChange(() => {}, toggleEdit, edit)}
              >
                {editIcon}
              </button>
            )
            : (
              <Mutation
                mutation={UPDATE_BOOK}
                variables={{
                  id: book.id,
                  title,
                  yearRead,
                  yearPublished,
                }}
                refetchQueries={[
                  {
                    query: GET_BOOK,
                    variables: {
                      id: book.id,
                    },
                  },
                ]}
              >
                {(updateBook, { data, loading, error }) => { // eslint-disable-line no-unused-vars
                  const button = (
                    <Button
                      className="create-book__button"
                      onClick={() => toggleChange(updateBook, toggleEdit, edit)}
                      color="black"
                    >
                      Updatera book för 17
                    </Button>
                  );
                  if (error) {
                    return (
                      <div>
                        <ErrorMessage error={error} />
                        { button }
                      </div>
                    );
                  }

                  return button;
                }}
              </Mutation>
            )
        }
      </div>
      <h5>
        <Link to="/writers">Back to list of Writers</Link>
      </h5>
    </div>
  );
}

BookListItemDetail.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    yearRead: PropTypes.string,
    yearPublished: PropTypes.string,

  }).isRequired,
};

export default BookListItemDetail;
