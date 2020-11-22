import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../../constants/routes';

import './style.css';

const Navigation = ({
  location: { pathname },
  organizationName,
  onOrganizationSearch,
}) => (
  <header className="Navigation">
    <div className="Navigation-link">
      <Link to={routes.WRITERS}>Writers</Link>
    </div>
  </header>
);

// class OrganizationSearch extends React.Component {
//   state = {
//     value: this.props.organizationName,
//   };

//   onChange = event => {
//     this.setState({ value: event.target.value });
//   };

//   onSubmit = event => {
//     this.props.onOrganizationSearch(this.state.value);

//     event.preventDefault();
//   };

//   render() {
//     const { value } = this.state;

//     return (
//       <div className="Navigation-search">
//         <form onSubmit={this.onSubmit}>
//           <Input
//             color={'white'}
//             type="text"
//             value={value}
//             onChange={this.onChange}
//           />{' '}
//           <Button color={'white'} type="submit">
//             Search
//           </Button>
//         </form>
//       </div>
//     );
//   }
// }

export default withRouter(Navigation);
