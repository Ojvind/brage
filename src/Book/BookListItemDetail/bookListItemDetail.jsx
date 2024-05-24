import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Link as RouterLink } from 'react-router-dom';

import Input from '../../Shared/Input';
import Label from '../../Shared/Label';
import SaveButton from '../../Shared/Button/SaveButton';
import EditButton from '../../Shared/Button/EditButton';

import { UPDATE_BOOK } from '../mutations';
import { GET_BOOK } from '../queries';
import ErrorMessage from '../../Error';

import Link from '../../Shared/Link';

function BookListItemDetail(props) {
  const { book } = props;

  const [edit, toggleEdit] = useState(false);
  const [title, onTitleChange] = useState(book.title);
  const [url, onUrlChange] = useState(book.url);
  const [yearPublished, onYearPublishedChange] = useState(book.yearPublished);
  const [yearRead, onYearReadChange] = useState(book.yearRead);
  const [description, onDescriptionChange] = useState(book.description);

  return (
    <div>
      <div className="list-item-detail">
        <Label variant="h2">En bild...</Label>
        {
          (!edit)
            ? (
              <div className="full-width">
                <div className="list-item-detail__row">
                  <Label variant="subtitle2">
                    Titolo:
                  </Label>
                  <Link
                    href={url}
                    toolTip="Open offical book site in a new tab"
                  >
                    {title}
                  </Link>
                </div>
                <div className="list-item-detail__row">
                  <Label variant="subtitle2">
                    Autore:
                  </Label>
                  <div className="list-item-detail__row__label">
                    <RouterLink to={`/writer/${book.writer.id}/${book.writer.name}/${book.writer.surname}`}>
                      {`${book.writer.name} ${book.writer.surname}`}
                    </RouterLink>
                  </div>
                </div>
                <div className="list-item-detail__row">
                  <Label variant="subtitle2">
                    Descrizione:
                  </Label>
                  {description}
                </div>
                <div className="list-item-detail__row">
                  <Label variant="h6">
                    {` Questo libro è stato pubblicato nel ${yearPublished} e l'ho letto nel ${yearRead}`}
                  </Label>
                </div>
                <div className="list-item-detail__row list-item-detail__row__button">
                  <EditButton
                    onClick={() => toggleEdit(!edit)}
                  >
                    Edit
                  </EditButton>
                </div>
              </div>
            )
            : (
              <div>
                <div className="list-item-detail__row">
                  <Input onChange={(e) => onTitleChange(e.target.value)} inputLabel="Titolo" value={title} />
                  <Input onChange={(e) => onUrlChange(e.target.value)} inputLabel="URL" value={url} />
                  <Input onChange={(e) => onDescriptionChange(e.target.value)} inputLabel="Descrizione" multiline value={description} />
                  <Input onChange={(e) => onYearPublishedChange(e.target.value)} inputLabel="Anno di pubblicazione" value={yearPublished} />
                  <Input onChange={(e) => onYearReadChange(e.target.value)} inputLabel="Ho letto il libro nel" value={yearRead} />
                </div>
                <Mutation
                  mutation={UPDATE_BOOK}
                  variables={{
                    id: book.id,
                    url,
                    yearPublished,
                    title,
                    yearRead,
                    description,
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
                      <div className="list-item-detail__row list-item-detail__row__button">
                        <SaveButton
                          onClick={() => {
                            updateBook()
                              .then(() => {
                                toggleEdit(!edit);
                              })
                              .catch((e) => {
                                throw e;
                              });
                          }}
                        >
                          Salva
                        </SaveButton>
                      </div>
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
              </div>
            )
        }
      </div>
    </div>
  );
}

BookListItemDetail.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    yearRead: PropTypes.string,
    yearPublished: PropTypes.string,
    description: PropTypes.string,
    writer: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      surname: PropTypes.string,
    }),
  }).isRequired,
};

export default BookListItemDetail;
