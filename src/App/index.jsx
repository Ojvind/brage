import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import Navigation from './Navigation';
import Footer from './Footer';

import Writer from '../Writer';
import WriterListItemDetailContainer from '../Writer/WriterListItemDetail';
import BookListItemDetailContainer from '../Book/BookListItemDetail';

const App = () => (
  <Router>
    <div className="app">
      <Navigation />
      {/* 'lg' -> default | 'md' | 'sm' | 'xl' | 'xs' | false */}
      <Container maxWidth="md">
        <div className="app-main">
          <Switch>
            <Route exact path="/writers" component={Writer} />
            <Route path="/writer/:id/:name/:surname" component={WriterListItemDetailContainer} />
            <Route path="/book/:id/:title" component={BookListItemDetailContainer} />
          </Switch>
        </div>
      </Container>
      <Footer />
    </div>
  </Router>
);

export default App;
