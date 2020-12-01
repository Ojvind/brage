import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from './Navigation';
import Footer from './Footer';

import Writer from '../Writer';
import WriterListItemDetailContainer from '../Writer/WriterListItemDetail';
import BookListItemDetail from '../Book/BookListItemDetail';
import './style.css';

const App = () => (
  <Router>
    <div className="App">
      <Navigation />
      <div className="App-main">
        <Switch>
          <Route exact path="/writers" component={Writer} />
          <Route path="/writers/:id/:name/:surname" component={WriterListItemDetailContainer} />
          <Route path="/books/:id/:title" component={BookListItemDetail} />
        </Switch>
      </div>
      <Footer />
    </div>
  </Router>
);

export default App;
