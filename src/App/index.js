import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home } from './views/Home';
import { About } from './views/About';
import { TopicList } from './views/TopicList';
import { NoMatch } from './views/NoMatch';
import { TopicDetail } from './components/TopicDetail';

import Navigation from './Navigation';
import Footer from './Footer';

import Writer from '../Writer';
import WriterListItemDetailContainer from '../Writer/WriterListItemDetail';
import BookListItemDetail from '../Book/BookListItemDetail';
import './style.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
          <Navigation
            organizationName={"organizationName"}
            onOrganizationSearch={this.onOrganizationSearch}
          />
          <div className="App-main">
            <Switch>
              <Route exact path="/Home" component={Home} />
              <Route exact path="/About" component={About} />
              <Route exact path="/Topics" component={TopicList} />
              <Route path="/Topics/:topicId" component={TopicDetail} />
              <Route exact path="/writers" component={Writer} />
              <Route path="/writers/:id/:name/:surname" component={WriterListItemDetailContainer}/>
              <Route path="/books/:id/:title" component={BookListItemDetail}/>
              <Route component={NoMatch} />
            </Switch>
          </div>            
          <Footer />
        </div>          
      </Router>
    );
  }
}

export default App;