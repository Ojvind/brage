import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { GET_BOOK } from '../queries';
import { UPDATE_BOOK } from '../mutations';

import Button from '../../Button';
import Input from '../../Input';

import ErrorMessage from '../../Error';

import Label from '../../Label';

function toggleChange(updateBook, toggleEdit, edit) {
  updateBook();
  toggleEdit(!edit);
}

function BookListItemDetail(props) {
  const [edit, toggleEdit] = useState(false);
  const [title, onTitleChange] = useState(props.book.title);
  const [yearRead, onYearReadChange] = useState(props.book.yearRead);
  const [yearPublished, onYearPublishedChange] = useState(props.book.yearPublished);

  const editIcon = <FontAwesomeIcon icon={faEdit} />;

  console.log(props.book.id);

  return (
    <div className="App-content_small-header">
      <div>
        <h4>Book:</h4>
        <Label>{props.book.id}</Label>
        {
        (!edit)
          ? <Label>{title}</Label>
          : <Input onChange={(e) => onTitleChange(e.target.value)} inputLabel="title" value={title} />
        }
        {
          (!edit)
            ? <Label>{yearRead}</Label>
            : <Input onChange={(e) => onYearReadChange(e.target.value)} inputLabel="yearRead" value={yearRead} />
        }
        {
          (!edit)
            ? <Label>{yearPublished}</Label>
            : <Input onChange={(e) => onYearPublishedChange(e.target.value)} inputLabel="yearPublished" value={yearPublished} />
        }
        {
          (!edit)
            ? (
              <button
                onClick={() => toggleChange(() => {}, toggleEdit, edit)}
              >
                {editIcon}
              </button>
            )
            : (
              <Mutation
                mutation={UPDATE_BOOK}
                variables={{
                  id: props.book.id,
                  title,
                  yearRead,
                  yearPublished,
                }}
                refetchQueries={[
                  {
                    query: GET_BOOK,
                    variables: {
                      id: props.book.id,
                    },
                  },
                ]}
              >
                {(updateBook, { data, loading, error }) => {
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

export default BookListItemDetail;
