import React from 'react';
import { Query } from 'react-apollo';
import { GET_BOOK } from '../queries';

import Loading from '../../Loading';
import ErrorMessage from '../../Error';
import BookListItemDetail from './bookListItemDetail';

class BookListItemDetailContainter extends React.Component {
  // state = {
  //   edit: false,
  //   title: "",
  //   yearRead: "",
  //   yearPublished: ""
  // };

  // updateState = (book) => {
  //   this.setState({
  //     title: book.title,
  //     yearRead: book.yearRead,
  //     yearPublished: book.yearPublished,
  //   });
  // };

  // onTitleChange = event => {
  //     this.setState({ title: event.target.value });
  // };

  // onYearReadChange = event => {
  //     this.setState({ yearRead: event.target.value });
  // };

  // onYearPublishedChange = event => {
  //     this.setState({ yearPublished: event.target.value });
  // };

  // toggleChange = (updateBook) => {
  //   updateBook();
  //   this.setState({ edit: !this.state.edit })
  // }

  render() {
    const { match } = this.props;
    return (
      <div>
        <Query
          query={GET_BOOK}
          notifyOnNetworkStatusChange
          variables={{
            id: match.params.id,
          }}
        >
          {({
            data, loading, error, fetchMore,
          }) => {
            if (error) {
              return <ErrorMessage error={error} />;
            }

            const { viewer } = data;

            if (loading && !viewer) {
              return <Loading />;
            }
            return (
              <BookListItemDetail
                book={data.book}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

export default BookListItemDetailContainter;
