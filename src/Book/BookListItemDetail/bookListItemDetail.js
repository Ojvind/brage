import React from 'react';
import { GET_BOOK } from '../queries';
import { Mutation } from 'react-apollo';
import { UPDATE_BOOK } from '../mutations';

import Button from '../../Button';
import Input from '../../Input';

import ErrorMessage from '../../Error';

import { Link } from 'react-router-dom';

import Label from '../../Label';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'


class BookListItemDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      title: this.props.book.title,
      yearRead: this.props.book.yearRead,
      yearPublished: this.props.book.yearPublished
    };
  };

  onTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  onYearReadChange = event => {
    this.setState({ yearRead: event.target.value });
  };

  onYearPublishedChange = event => {
    this.setState({ yearPublished: event.target.value });
  };

  toggleChange = (updateBook) => {
    updateBook();
    this.setState({ edit: !this.state.edit })
  }

  render() {

    const { title, yearRead, yearPublished } = this.state;
    const id = this.props.book.id;

    const edit = <FontAwesomeIcon icon={faEdit} />

    return (
      <div className="App-content_small-header">
        <div>
          <h4>Book:</h4>
          <Label>{id}</Label>
          {
          (!this.state.edit) ?
            <Label>{title}</Label> :
            <Input onChange={this.onTitleChange} id="title" value={title} />
          }
          {
            (!this.state.edit) ?
              <Label>{yearRead}</Label> :
              <Input onChange={this.onYearReadChange} id="yearRead" value={yearRead} />
          }
          {
            (!this.state.edit) ?
              <Label>{yearPublished}</Label> :
              <Input onChange={this.onYearPublishedChange} id="yearPublished" value={yearPublished} />
          }
          {
            (!this.state.edit) ?
            <button
              onClick={() => this.toggleChange(()=>{})}>
              {edit}
            </button> :
            <Mutation
              mutation={UPDATE_BOOK}
              variables={{
                id,
                title: this.state.title,
                yearRead: this.state.yearRead,
                yearPublished: this.state.yearPublished
              }}
              refetchQueries={[
                  {
                    query: GET_BOOK,
                    variables:{
                      id,
                    }
                  }
                ]}
              >
              {(updateBook, { data, loading, error }) => {
                const button = (
                  <Button
                      className={'create-book__button'}
                      onClick={() => this.toggleChange(updateBook)}
                      color={'black'}>
                    Updatera book för 17
                  </Button>
                );
                if (error) {
                    return <div><ErrorMessage error={error} />{ button }</div>;
                }
  
                return button;
              }}
            </Mutation>
          }
        </div>
        <h5>
          <Link to="/writers">Back to list of Writers</Link>
        </h5>
      </div>
    );
  }
} 

export default BookListItemDetail

