import React from 'react';
import Input from '../../Input';
import Button from '../../Button';

import { Mutation } from 'react-apollo';
import { CREATE_WRITER } from '../mutations';
import { GET_WRITERS } from '../queries';

import './create-writer.css';

import ErrorMessage from '../../Error';

class CreateWriter extends React.Component {
    state = {
        name: "",
        surname: "",
        homepage: ""
    };

    onNameChange = event => {
        this.setState({ name: event.target.value });
    };

    onSurNameChange = event => {
        this.setState({ surname: event.target.value });
    };

    onHomePageChange = event => {
        this.setState({ homepage: event.target.value });
    };

    render() {
        const { name, surname, homepage } = this.state;
        return (
        <div>
            <div className="create-writer">
              <div className="create-writer__input">
                <Input onChange={this.onNameChange} id="name" inputLabel="Name"/>
              </div>
              <div className="create-writer__input">
                <Input onChange={this.onSurNameChange} id="surname" inputLabel="Surname"/>
              </div>
              <div className="create-writer__input">
                <Input onChange={this.onHomePageChange} id="homepage" inputLabel="Homepage"/>
              </div>
              <Mutation
                  mutation={CREATE_WRITER}
                  variables={{ name, surname, homepage }}
                  refetchQueries={[
                      { query: GET_WRITERS }
                      ]}
                  >
                  {(createWriter, { data, loading, error }) => {
                      const button = (
                          <Button
                              className={'create-writer__button'}
                              onClick={createWriter}
                              color={'black'}>
                            Create Writer för fan
                          </Button>
                      );
                      if (error) {
                          return <div><ErrorMessage error={error} />{ button }</div>;
                      }
                      return <div className="create-writer__button">
                          {button}
                        </div>; 
                  }}
              </Mutation>
            </div>
        </div>
        );
    }
}

export default CreateWriter
