import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from './Navigation';
import Footer from './Footer';

import Writer from '../Writer';
import WriterListItemDetailContainer from '../Writer/WriterListItemDetail';
import BookListItemDetailContainer from '../Book/BookListItemDetail';
import './style.css';

const App = () => (
  <Router>
    <div className="App">
      <Navigation />
      <div className="App-main">
        <Switch>
          <Route exact path="/writers" component={Writer} />
          <Route path="/writer/:id/:name/:surname" component={WriterListItemDetailContainer} />
          <Route path="/book/:id/:title" component={BookListItemDetailContainer} />
        </Switch>
      </div>
      <Footer />
    </div>
  </Router>
);

export default App;
