import React from 'react';
import { Mutation } from 'react-apollo';
import { UPDATE_WRITER } from '../mutations';
import { GET_WRITER } from '../queries';

import ErrorMessage from '../../Error';

import Button from '../../Button';
import Input from '../../Input';
import Label from '../../Label';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

class WriterListItemDetail extends React.Component {
  state = {
    edit: false,
    id: this.props.writer.id,
    name: this.props.writer.name,
    surname: this.props.writer.surname,
    homepage: this.props.writer.homepage
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

  toggleChange = (updateWriter) => {
    updateWriter();
    this.setState({ edit: !this.state.edit })
  }

  render() {

    const { id, name, surname, homepage } = this.state;
    const edit = <FontAwesomeIcon icon={faEdit} />

    return (
      <div>
        <div>
        <Label>{id}</Label>
        {
          (!this.state.edit) ?
            <Label>{name}</Label> :
            <Input onChange={this.onNameChange} id="name" inputLabel="Name" value={name} />
        }
        {
          (!this.state.edit) ?
            <Label>{surname}</Label> :
            <Input onChange={this.onSurNameChange} id="surname" inputLabel="Surname" value={surname} />
        }
        {
          (!this.state.edit) ?
            <a href={homepage} target="_blank" rel="noopener noreferrer">{homepage}</a> :
            <Input onChange={this.onHomePageChange} id="homepage" inputLabel="Homepage" value={homepage} />
        }
        {
            (!this.state.edit) ?
            <button 
              onClick={() => this.toggleChange(()=>{})}>
              {edit}  
              <i className="fas fa-edit fa-2x"></i> 
            </button> :
            <Mutation
              mutation={UPDATE_WRITER}
              variables={{ 
                id, 
                name: !this.state.name ? name : this.state.name, 
                surname: !this.state.surname ? surname :  this.state.surname, 
                homepage: !this.state.homepage ? homepage : this.state.homepage }}
                refetchQueries={[
                  { 
                    query: GET_WRITER,
                    variables:{
                      id: id,
                    }
                  }
                ]}
              >
              {(updateWriter, { data, loading, error }) => {
                const button = (
                  <Button
                    className={'create-writer__button'}
                    onClick={() => this.toggleChange(updateWriter)}
                    color={'black'}>
                    Updatera writer för 171111
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
      </div> 
    );      
  }
} 

export default WriterListItemDetail

