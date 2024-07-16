import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';

import Navigation from './Navigation';
import Footer from './Footer';

import Writer from '../Writer';
import Books from '../Book/AllBooks';
import WriterListItemDetailContainer from '../Writer/WriterListItemDetail';
import BookListItemDetailContainer from '../Book/BookListItemDetail';

const App = () => (
  <Router>
    <div className="app">
      <Navigation />
      {/* 'lg' -> default | 'md' | 'sm' | 'xl' | 'xs' | false */}
      <Container maxWidth="lg">
        <div>
          <Routes>
            <Route exact path="/writers" element={<Writer />} />
            <Route exact path="/libri" element={<Books />} />
            <Route path="/writer/:id/:name/:surname" element={<WriterListItemDetailContainer />} />
            <Route path="/book/:bookId/:title" element={<BookListItemDetailContainer />} />
          </Routes>
        </div>
      </Container>
      <Footer />
    </div>
  </Router>
);

export default App;
