import React from 'react';
import { Mutation } from 'react-apollo';
import { UPDATE_WRITER } from '../mutations';
import { GET_WRITER } from '../queries';

import ErrorMessage from '../../Error';

import Button from '../../Button';
import Input from '../../Input';
import Label from '../../Label';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

class WriterListItemDetail extends React.Component {
  state = {
    edit: false,
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

  toggleChange = (updateWriter) => {
    updateWriter();
    this.setState({ edit: !this.state.edit })
  }

  render() {
    const { writer } = this.props;

    const id = writer.id;
    const name = writer.name;
    const surname = writer.surname;
    const homepage = writer.homepage;

    const coffee = <FontAwesomeIcon icon={faCoffee} />
    const edit = <FontAwesomeIcon icon={faEdit} />
    // const coffee = <FontAwesomeIcon icon={faCoffee} />

    return (
      <div>
        <div>
        <Label>{id}</Label>
        {
          (!this.state.edit) ?
            <Label>{name}</Label> :
            <Input type="text" onChange={this.onNameChange} id="name" value={name} />
        }
        {
          (!this.state.edit) ?
            <Label>{surname}</Label> :
            <Input type="text" onChange={this.onSurNameChange} id="surname" value={surname} />
        }
        {
          (!this.state.edit) ?
            <a href={homepage} target="_blank" rel="noopener noreferrer">{homepage}</a> :
            <Input type="text" onChange={this.onHomePageChange} id="homepage" value={homepage} />
        }
        {
            (!this.state.edit) ?
            <button 
              onClick={() => this.toggleChange(()=>{})}>
              {coffee}        
              {edit}  
              <i class="fas fa-edit fa-2x"></i> 
              Hey Hopp min sköna
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
                    Updatera writer för 17
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

