import React from 'react';
import { Query } from 'react-apollo';
import { GET_BOOK } from '../queries';
import { Mutation } from 'react-apollo';
import { UPDATE_BOOK } from '../mutations';

import Button from '../../Button';
import Input from '../../Input';

import Loading from '../../Loading';
import ErrorMessage from '../../Error';

import { Link } from 'react-router-dom';

import Label from '../../Label';


class BookListItemDetail extends React.Component {
  state = {
    edit: false,
    title: "",
    yearRead: "",
    yearPublished: ""
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
    const { match } = this.props;
    console.log('Well, WTF', match.params.id);
    return  (
      <div>
        <Query
           query={GET_BOOK}
           notifyOnNetworkStatusChange={true}
           variables={{
             id: match.params.id,
           }}
         >
           {({ data, loading, error, fetchMore }) => {
              if (error) {
                return <ErrorMessage error={error} />;
              }

              const { viewer } = data;

              if (loading && !viewer) {
                return <Loading />;
              }

            const id = data.book.id;
            const title = data.book.title;
            const yearRead = data.book.yearRead;
            const yearPublished = data.book.yearPublished;

            return (
              <div>
                <div className="App-content_small-header">
                  <div>
                    <h4>Book:</h4>
                      <Label>{id}</Label>
                      {
                      (!this.state.edit) ?
                        <Label>{title}</Label> :
                        <Input color={'black'} type="text" onChange={this.onTitleChange} id="title" value={title} />
                    }
                    {
                      (!this.state.edit) ?
                        <Label>{yearRead}</Label> :
                        <Input color={'black'} type="text" onChange={this.onYearReadChange} id="yearRead" value={yearRead} />
                    }
                    {
                      (!this.state.edit) ?
                        <Label>{yearPublished}</Label> :
                        <Input color={'black'} type="text" onChange={this.onYearPublishedChange} id="yearPublished" value={yearPublished} />
                    }
                      {
                        (!this.state.edit) ?
                        <button
                          onClick={() => this.toggleChange(()=>{})}>
                          Edit
                        </button> :
                        <Mutation
                          mutation={UPDATE_BOOK}
                          variables={{
                            id,
                            title: !this.state.title ? title : this.state.title,
                            yearRead: !this.state.yearRead ? yearRead :  this.state.yearRead,
                            yearPublished: !this.state.yearPublished ? yearPublished : this.state.yearPublished }}
                          refetchQueries={[
                              {
                                query: GET_BOOK,
                                variables:{
                                  id: match.params.id,
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
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default BookListItemDetail;
