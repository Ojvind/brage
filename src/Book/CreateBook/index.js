import React from 'react';
import Input from '../../Input';
import Button from '../../Button';

import { Mutation } from 'react-apollo';
import { CREATE_BOOK } from '../mutations';
import { GET_BOOKS } from '../queries';

import './create-book.css';

import ErrorMessage from '../../Error';

class CreateBook extends React.Component {
    state = {
        title: "",
        yearRead: "",
        writerId: this.props.writerId,
        yearPublished: "",
    };

    onTitleChange = event => {
        this.setState({ title: event.target.value });
    };

    onYearPublishedChange = event => {
        this.setState({ yearPublished: event.target.value });
    };

    onReadChange = event => {
        this.setState({ yearRead: event.target.value });
    };

    render() {
        const { title, yearRead, writerId, yearPublished } = this.state;
        return (
        <div>
          <div className="create-book">
            <div className="create-book__input">
              <Input onChange={this.onTitleChange} id="title" inputLabel="Title"/>
            </div>
            <div className="create-book__input">
              <Input onChange={this.onYearPublishedChange} id="yearpublished" inputLabel="YearPublished"/>
            </div>
            <div className="create-book__input">
              <Input onChange={this.onReadChange} id="read" inputLabel="Read"/>
            </div>
            <Mutation
              mutation={CREATE_BOOK}
              variables={{ title, yearRead, writerId, yearPublished }}
              refetchQueries={[
                { 
                  query: GET_BOOKS,
                  variables: { writerId } }
                ]}
              >
              {(createbook, { data, loading, error }) => {
                const button = (
                  <Button
                      className={'create-book__button'}
                      onClick={createbook}
                      color={'black'}>
                    Create Bok och lovla K
                  </Button>
                );
                if (error) {
                  return <div><ErrorMessage error={error} />{ button }</div>;
                }
                return <div className="create-book__button">
                  {button}
                </div>; 
              }}
            </Mutation>
          </div>
        </div>
      );
   }
}

export default CreateBook

