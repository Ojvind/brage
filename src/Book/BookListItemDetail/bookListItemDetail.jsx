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
              <div>
                <div className="list-item-detail__labelwrapper">
                  <Label variant="subtitle2">
                    Title:
                  </Label>
                  <div className="list-item-detail__labelwrapper__label">
                    <Link
                      href={url}
                      toolTip="Open offical book site in a new tab"
                    >
                      {title}
                    </Link>
                  </div>
                </div>
                <div className="list-item-detail__labelwrapper">
                  <Label variant="subtitle2">
                    Author:
                  </Label>
                  <div className="list-item-detail__labelwrapper__label">
                    <RouterLink to={`/writer/${book.writer.id}/${book.writer.name}/${book.writer.surname}`}>
                      {`${book.writer.name} ${book.writer.surname}`}
                    </RouterLink>
                  </div>
                </div>
                <div className="list-item-detail__labelwrapper">
                  <Label variant="subtitle2">
                    Description:
                  </Label>
                  <div
                    className="list-item-detail__labelwrapper--prewrap list-item-detail__labelwrapper__label"
                  >
                    {description}
                  </div>
                </div>
                <div className="list-item-detail__labelwrapper">
                  <Label variant="caption">
                    {`This book was published ${yearPublished} and I read it ${yearRead}`}
                  </Label>
                </div>
                <div className="list-item-detail__button">
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
                <div>
                  <Input onChange={(e) => onTitleChange(e.target.value)} inputLabel="Title" value={title} />
                  <Input onChange={(e) => onUrlChange(e.target.value)} inputLabel="Url" value={url} />
                  <Input onChange={(e) => onYearPublishedChange(e.target.value)} inputLabel="Published year" value={yearPublished} />
                  <Input onChange={(e) => onYearReadChange(e.target.value)} inputLabel="Read year" value={yearRead} />
                  <Input onChange={(e) => onDescriptionChange(e.target.value)} inputLabel="Description" textarea value={description} />
                </div>
                <Mutation
                  mutation={UPDATE_BOOK}
                  variables={{
                    id: book.id,
                    title,
                    url,
                    yearPublished,
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
                      <div className="list-item-detail__button">
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
                          Save
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
